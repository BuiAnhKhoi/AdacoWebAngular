import { Injectable } from '@angular/core';
import { HttpClient, HttpRequest, HttpHandler, HttpInterceptor, HttpEvent } from '@angular/common/http'
import { Observable } from 'rxjs'
import { CookieService} from 'ngx-cookie-service'

// Import environment
import { environment } from '../../environments/environments'

@Injectable({
  providedIn: 'root'
})
export class AuthUserService implements HttpInterceptor {
  // array endpoint must login to view, not login or  not get token from cookie, redirect to  login page
  private protectedEndpoints = [
    'api/v1/cart/',
    'api/v1/account/',
    'api/v1/order/get-orders-by-status',
    'api/v1/order/make-order-from-cart',
    'api/v1/order/search-order-by-code',
    'api/v1/order/get-orders-history'
  ]
  private requiresAuthentication(url:string):boolean{
    return this.protectedEndpoints.some(endpoint => url.includes(endpoint))
  }

  private defaultApiUrl:string = environment.defaultApiUrl;
  private loggedIn = false;

  constructor(
    private cookieService: CookieService,
    private http: HttpClient,
  ) { }

  isLoggedIn():boolean{
    return this.loggedIn
  }

  login():void {
    this.loggedIn = true
  }

  logout():void{
    this.loggedIn = false
    this.cookieService.delete('token')
    this.cookieService.delete('idUser')
  }

  loginUser(dataLogin:any):Observable<any>{
    const urlTemp = `${this.defaultApiUrl}/user/user-login`
    return this.http.post<any>(urlTemp, dataLogin)
  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const requiresAuth = this.requiresAuthentication(req.url)
    const get_token = this.cookieService.get('token')
    
    if(get_token && requiresAuth) {
      req = req.clone({
        setHeaders : {
          Authorization :  `Bearer ${get_token}`
        }
      })
    }

    return next.handle(req)
  }
}
