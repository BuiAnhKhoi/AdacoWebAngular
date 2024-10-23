import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { Observable } from 'rxjs'

// Import environment
import { environment } from '../../environments/environments'

@Injectable({
  providedIn: 'root'
})
export class CallApiService {
  private defaultApiUrl:string = environment.defaultApiUrl
  constructor(
    private http:HttpClient
  ) { }

  // Get all product from database, include filter and pagination
  getProduct(filterStr:string, currentPageInt: number):Observable<any>{
    const urlTemp = `${this.defaultApiUrl}/product/get-product?filter=${filterStr}&current_page=${currentPageInt}`
    return this.http.get<any>(urlTemp)
  }

    // Add support. Page contact
  addSupport(dataSupport:any):Observable<any>{
    const urlTemp = `${this.defaultApiUrl}/contact/add-support`
    return this.http.post<any>(urlTemp, dataSupport)
  }

  getDetailProductByID(idProduct:number):Observable<any>{
    const urlTemp = `${this.defaultApiUrl}/product/get-detail-product-by-id?id_product=${idProduct}`
    return this.http.get<any>(urlTemp)
  }

  checkDataExistsRegister(dataInput:any):Observable<any>{
    // Check username, gmail and tel already exists
    const urlTemp = `${this.defaultApiUrl}/user/check-data-user-exists`
    return this.http.post<any>(urlTemp, dataInput)
  }

  addNewUser(dataNewUser:any):Observable<any>{
    const urlTemp = `${this.defaultApiUrl}/user/add-user`
    return this.http.post<any>(urlTemp, dataNewUser)
  }

  getDetailProductByIDWithoutImage(idProduct:number):Observable<any>{
    const urlTemp = `${this.defaultApiUrl}/product/detail-product-by-id-without-image?id_product=${idProduct}`
    return this.http.get<any>(urlTemp)
  }

  getQuantityInCartByIdUser(idUser:any):Observable<any>{
    const urlTemp = `${this.defaultApiUrl}/cart/get-quantity-in-cart`
    return this.http.post<any>(urlTemp, idUser)
  }

  addMoreQuantityProductInCart(dataInfo:any):Observable<any>{
    const urlTemp = `${this.defaultApiUrl}/cart/add-more-quantity-product-in-cart`
    return this.http.post<any>(urlTemp, dataInfo)
  }

  getAllProvince():Observable<any>{
    const urlTemp = `${this.defaultApiUrl}/division/all-province`
    return this.http.get<any>(urlTemp)
  }

  getAllDistrict(strProvincePara:string):Observable<any>{
    const urlTemp = `${this.defaultApiUrl}/division/all-district-by-province?province=${strProvincePara}`
    return this.http.get<any>(urlTemp)
  }

  getAllWard(strProvincePara:string, strDistrictPara: string):Observable<any>{
    const urlTemp = `${this.defaultApiUrl}/division/all-ward-by-district-province?province=${strProvincePara}&district=${strDistrictPara}`
    return this.http.get<any>(urlTemp)
  }

  getInformationUserByID(idUser:number):Observable<any>{
    const urlTemp =`${this.defaultApiUrl}/user/get-information-user-by-id?id_user=${idUser}`
    return this.http.get<any>(urlTemp)
  }

  searchOrderByCode(codeOrder:string):Observable<any>{
    const urlTemp = `${this.defaultApiUrl}/order/search-order-by-code?code_order=${codeOrder}`
    return this.http.get<any>(urlTemp)
  }

  getOrderHistory(strFilter:string, currentPage:number):Observable<any>{
    const urlTemp = `${this.defaultApiUrl}/order/get-orders-history?str_filter=${strFilter}&current_page=${currentPage}`
    return this.http.get<any>(urlTemp)
  }

  getOrderStatus(strStatus:string, currentPage: number):Observable<any>{
    const urlTemp = `${this.defaultApiUrl}/order/get-orders-by-status?str_status=${strStatus}&current_page=${currentPage}`
    return this.http.get<any>(urlTemp)
  }

  // uploadNewAvatar(fileImage : any):Observable<any>{
  //   const urlTemp = `${this.defaultApiUrl}/account/update-new-avatar`
  //   return this.http.post<any>(urlTemp, fileImage)
  // }

  getAllProductInCart(idUser : number):Observable<any>{
    const urlTemp = `${this.defaultApiUrl}/cart/get-all-product-in-cart?id_user=${idUser}`
    return this.http.get<any>(urlTemp)
  }

  minusQuantityProductInCart(dataInfo:any):Observable<any>{
    const urlTemp = `${this.defaultApiUrl}/cart/minus-quantity-product-in-cart`
    return this.http.post<any>(urlTemp, dataInfo)
  }

  inputQuantityProductInCart(dataInfo:any):Observable<any>{
    const urlTemp = `${this.defaultApiUrl}/cart/input-quantity-product-in-cart`
    return this.http.post<any>(urlTemp, dataInfo)
  }

  addQuantityProductInCart(dataInfo:any):Observable<any>{
    const urlTemp = `${this.defaultApiUrl}/cart/add-quantity-product-in-cart`
    return this.http.post<any>(urlTemp, dataInfo)
  }

  deleteProductInCart(dataInfo:any):Observable<any>{
    const urlTemp = `${this.defaultApiUrl}/cart/delete-product-in-cart`
    return this.http.post<any>(urlTemp, dataInfo)
  }

  makeOrderFromCart(dataInfo:any):Observable<any>{
    const urlTemp = `${this.defaultApiUrl}/order/make-order-from-cart`
    return this.http.post<any>(urlTemp, dataInfo)
  }

  addOneProductInCartByIDUser(dataInfo : any):Observable<any>{
    const urlTemp = `${this.defaultApiUrl}/cart/add-one-product-to-cart`
    return this.http.post<any>(urlTemp, dataInfo)
  }
  
  makeOrderBuyNow(dataInfo:any):Observable<any>{
    const urlTemp = `${this.defaultApiUrl}/order/create-order-buy-now`
    return this.http.post<any>(urlTemp, dataInfo)
  }
}
