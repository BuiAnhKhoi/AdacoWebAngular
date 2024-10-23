import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router'

// Import service
import { CallApiService } from '../../services/call-api.service'

// Import environment 
import { environment } from '../../../environments/environments'

@Component({
  selector: 'app-profile-user',
  templateUrl: './profile-user.component.html',
  styleUrl: './profile-user.component.scss'
})
export class ProfileUserComponent implements OnInit{
  idUser!:number
  arrInformationUser:Array<any> = []
  defaultUrlMedia:string = environment.defaultUrlMedia

  constructor(
    private callApiService: CallApiService,
    private route: ActivatedRoute,
  ){}

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.idUser = params['idUser']
    })

    this.getUserInformation()
  }

  getUserInformation(){
    // TODO : update code in the future, check idUser null or not
    if(this.idUser === null){

    }

    this.callApiService.getInformationUserByID(this.idUser).subscribe({
      next:(data)=>{
        if(data['error'] === false){
          console.log(data['result'])
          this.arrInformationUser = [data['result']]
        }else {
          // TODO : update code in the future
        }
      },
      error:(error)=> {
        // TODO : update code in the future
      }
    })
  }
}
