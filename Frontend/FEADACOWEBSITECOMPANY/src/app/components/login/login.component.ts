import { Component, OnInit } from '@angular/core';
import { CookieService } from 'ngx-cookie-service'
import { FormBuilder, FormGroup, Validators } from '@angular/forms'
import { Router } from '@angular/router' 

// Import service
import { HashPasswordService } from '../../services/hash-password.service'
import { AuthUserService } from '../../services/auth-user.service'

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LOGINComponent implements OnInit{
  loginForm!: FormGroup;
  errorListLogin:Array<string> = []

  constructor(
    private formBuilder: FormBuilder,
    private hashedPasswordService : HashPasswordService,
    private cookieService: CookieService,
    private authService : AuthUserService,
    private router: Router,
  ){}

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      usernameLogin: ['', [Validators.required, Validators.maxLength(22), Validators.minLength(1)]],
      passwordLogin: ['', [Validators.required, Validators.maxLength(22), Validators.minLength(1)]],
      agreeTermService: [false, Validators.required]
    })
  }

  onSubmitLogin(){
    let loginFormValue = this.loginForm.value
    let passwordLoginValue = loginFormValue['passwordLogin']
    let usernameLoginValue = loginFormValue['usernameLogin']
    // let agreeTermCondition = loginFormValue['agreeTermService']

    if(this.loginForm.valid ===true){
      let hashPasswordLoginValue = this.hashedPasswordService.hashPassword(passwordLoginValue) 
      this.authService.loginUser({
        username: usernameLoginValue,
        password: hashPasswordLoginValue
      }).subscribe({
        next:(data) => {
          if(data['error'] === false){
            if(data['result'] === 'exists'){
              console.log(data)
              this.errorListLogin = []
              this.loginForm.get('usernameLogin')!.setValue('')
              this.loginForm.get('passwordLogin')!.setValue('')

              this.cookieService.set('token', data['token'], { expires : 1})
              this.cookieService.set('idUser', data['idUser'], { expires : 1})
              this.authService.login()
              this.router.navigate([''])
            }else if(data['result'] === 'not-found') {
              this.errorListLogin.push("Wrong password or username. Please check again or contact admin for more information")
            }else {
              // TODO : update code in the future
            }
          }else {
            // TODO : update code in the future
          }
        },error:(error) =>{
          // TODO : update code in the future
        }
      })
    }else {
      // TODO : update code  in the future
    }
  }
}
