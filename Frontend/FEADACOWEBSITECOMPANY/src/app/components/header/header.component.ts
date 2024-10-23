import { Component, OnInit, ElementRef } from '@angular/core';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';

// Import service
import { CallApiService } from '../../services/call-api.service'
import { AuthUserService } from '../../services/auth-user.service'
import { GlobalStateService } from '../../services/global-state.service'

import { Subscription } from 'rxjs';
import { TranslateService } from '@ngx-translate/core'

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HEADERComponent implements OnInit {
  isLogin:boolean = false
  quantityProductInCart:number = 0 
  private stateSubscription: Subscription;
  checkToggleTheme:boolean = this.elementRef.nativeElement.ownerDocument.documentElement.className === 'dark' ? true : false
  checkToggleLanguage:boolean = this.translate.getDefaultLang() === 'vi' ? true: false

  // TODO : update code in the future to check if cookie token empty or not
  idUser:string = this.cookieService.get('idUser')

  constructor(
    private router: Router,
    private cookieService: CookieService,
    private callApiService: CallApiService,
    private authService: AuthUserService,
    private globalStateService: GlobalStateService,
    private translate : TranslateService,
    private elementRef: ElementRef
  ){
    this.stateSubscription = this.globalStateService.quantityProductInCart$.subscribe((newState) =>{
      this.quantityProductInCart = newState
    })
  }

  redirectToLoginPage():void{
    this.router.navigate(['/login'])
  }

  redirectToRegisterAccountPage():void{
    this.router.navigate(['/register-account'])
  }

  ngOnInit(): void {
    if (this.idUser === ""){

    }else if (this.idUser !== ""){
      this.callApiService.getQuantityInCartByIdUser({id_user : this.idUser}).subscribe({
        next:(result)=>{
          this.isLogin = true
          this.quantityProductInCart = result['result']
        },error:(error)=>{
          // TODO : update code in the future
          this.isLogin = false
        }
      })
    }
  }

  logoutAccount(){
    this.authService.logout()
    this.isLogin = false
    this.router.navigateByUrl('') 
  }

  redirectToCartPage(){
    this.router.navigateByUrl('/cart')
  }

  changeTheme(event : Event):void {
    // false : light, true : dark
    const inputTheme = event.target as HTMLInputElement
    if ( inputTheme.checked === false){
      
      this.elementRef.nativeElement.ownerDocument.documentElement.className = 'light'
      
    }else {
      
      this.elementRef.nativeElement.ownerDocument.documentElement.className = 'dark'
      
    }
  }

  changeLanguage(event : Event):void {
    // false : EN, true : VN
    const inputLanguage = event.target as HTMLInputElement
    if(inputLanguage.checked === false){
      this.translate.setDefaultLang('en')
    }else {
      this.translate.setDefaultLang('vi')
    }
  }
}
