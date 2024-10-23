import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

// Import service
import {HashPasswordService} from '../../services/hash-password.service'
import {CallApiService} from '../../services/call-api.service'

@Component({
  selector: 'app-register-account',
  templateUrl: './register-account.component.html',
  styleUrl: './register-account.component.scss'
})
export class REGISTERACCOUNTComponent implements OnInit {
  /*
    !IMPORTANT

    - update code to check password and password again are the same
  */
  registerForm!: FormGroup;
  errorListRegister: Array<string> = [];
  notificationSuccessRegister:boolean = false
  usernameRegisterSuccessful:string = ""

  constructor(
    private formBuilder: FormBuilder,
    private hashPasswordService: HashPasswordService,
    private callApiService: CallApiService,
  ){}

  ngOnInit(): void {
    this.registerForm = this.formBuilder.group({
      usernameRegister: [
        '',
        [
          Validators.required,
          Validators.maxLength(22),
          Validators.minLength(1),
        ],
      ],
      passwordRegister: [
        '',
        [
          Validators.required,
          Validators.maxLength(22),
          Validators.minLength(1),
        ],
      ],
      confirmPasswordRegister: [
        '',
        [
          Validators.required,
          Validators.minLength(1),
          Validators.maxLength(22),
        ],
      ],
      firstNameRegister: [
        '',
        [
          Validators.required,
          Validators.maxLength(22),
          Validators.minLength(1),
        ],
      ],
      lastNameRegister: [
        '',
        [
          Validators.required,
          Validators.maxLength(22),
          Validators.minLength(1),
        ],
      ],
      gmailRegister: [
        '',
        [
          Validators.required,
          Validators.maxLength(200),
          Validators.minLength(1),
        ],
      ],
      telRegister: [
        '',
        [
          Validators.required,
          Validators.maxLength(12),
          Validators.minLength(10),
        ],
      ],
      dobRegister: ['', Validators.required],
      agreeTermService: [false, Validators.required],
    });
  }

  onRegisterSubmit(){
    this.errorListRegister = []
    // TODO : update code in the future, to check validator input value

    if(this.registerForm.valid === true){
      let getPasswordRegister = this.registerForm.get('passwordRegister')!.value
      let getUsernameRegister = this.registerForm.get('usernameRegister')!.value;
      let getTelRegister = this.registerForm.get('telRegister')!.value;
      let getGmailRegister = this.registerForm.get('gmailRegister')!.value;
      let getFirstNameRegister = this.registerForm.get('firstNameRegister')!.value;
      let getLastNameRegister = this.registerForm.get('lastNameRegister')!.value;
      let getDOBRegister = this.registerForm.get('dobRegister')!.value;

      let hashPasswordRegister = this.hashPasswordService.hashPassword(getPasswordRegister);

      this.callApiService.checkDataExistsRegister({
        'get_username': getUsernameRegister,
        'get_tel':getTelRegister,
        'get_gmail': getGmailRegister
      }).subscribe({
        next: (data)=> {
          if(data['error']  === true){
            // TODO: update code in the future
          }else {
            for(let eachCheckData in data['result']){
              if(data['result'][eachCheckData] === 'Invalid'){
                this.errorListRegister.push(`${eachCheckData} : Invalid`)
                // TODO : update code in the future to check error list register
              }
            }
          }
        },error: (error)=>{
          // TODO : update code in the future
        }
      })
      console.log(this.errorListRegister)
      if(this.errorListRegister.length === 0){
        this.callApiService.addNewUser({
          get_username: getUsernameRegister,
          get_password:hashPasswordRegister ,
          get_tel: getTelRegister,
          get_gmail: getGmailRegister,
          get_firstname:getFirstNameRegister ,
          get_lastname:getLastNameRegister ,
          get_avatar: "",
          get_dob: getDOBRegister,
        }).subscribe({
          next:(data)=>{
            /*
            data : {error:false, result:true, username:...}
            */
            if(data['error'] === true){
              // TODO: update code in the future
            }else {
              this.notificationSuccessRegister = true
              this.usernameRegisterSuccessful = data['username']
            }
          }, error: (error)=>{
            // TODO : update code in the future
          }
        })
      }else {
        // TODO : update code in the future
      }
    }else {
      // TODo : update code in the future
      
    }
  }
}
