import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { CallApiService } from '../../services/call-api.service'
import { CookieService } from 'ngx-cookie-service'
import { GlobalStateService } from '../../services/global-state.service'

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrl: './products.component.scss'
})
export class PRODUCTSComponent implements OnInit {
  titleFilterProduct:string = 'default'
  currentPageInt:number = 1
  totalProductPerPage:number = 0
  numPageProduct:number = 0
  showAllProducts:Array<any> =  []
  listNumPagination:Array<number> = []
  minimumPriceRange:number = 0
  maximumPriceRange:number = 10000000
  valuePriceRange:number = 10000000

  constructor(
    private callApiService:CallApiService,
    private route: ActivatedRoute,
    private router: Router,
    private cookieService: CookieService,
    private globalStateService : GlobalStateService
  ){

  }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.currentPageInt = params['current_page']
      this.titleFilterProduct = params['filter']
    })
    this.getProductList()
  }

  getProductList(){
    this.callApiService.getProduct(this.titleFilterProduct, this.currentPageInt).subscribe({
      next:(data)=> {
        if(data['hasError'] === false){
          
          this.numPageProduct= data['num_page']
          this.showAllProducts = data['products']
          this.totalProductPerPage = data['products'].length

          const maxPageShow = 5;
          const halfMaxPageShow = Math.floor(maxPageShow/2)

          // Code pagination
          this.listNumPagination = []
          if(data['num_page'] <= maxPageShow){
            for(let indexTemp = 1; indexTemp <=data['num_page']; indexTemp++){
              this.listNumPagination.push(indexTemp)
            }
          }else {
          let startPage = this.currentPageInt - halfMaxPageShow 
          let endPage = this.currentPageInt + halfMaxPageShow

          if(startPage <=0){
            startPage = 1;
            endPage =maxPageShow
          }

          if(endPage > data['num_page']){
            endPage = data['num_pages']
            startPage = data['num_pages'] - maxPageShow+ 1  
          }

          for (let index = startPage; index< endPage;index++){
            this.listNumPagination.push(index)
          }
          // End code pagination

        }}
        else {
          // TODO: update code in the future
        }
      },
      error: (error) => {
        //TODO : update code in the future
      }
    })
  }

  changeNumPagination(numberPagination : number){
    this.currentPageInt = numberPagination
    this.getProductList()
  }

  changeFilterString(filterStr: string){
    this.titleFilterProduct = filterStr
    this.currentPageInt = 1
    this.getProductList()
  }

  changeRangePrice(event : Event):void{
    const inputElement = event.target as HTMLInputElement
    this.valuePriceRange = Number(inputElement.value)
  }

  buyNow(idProduct: string, quantityBuy: number){
    this.router.navigate(['/buy-now', idProduct, quantityBuy])
  }

  addOneProductToCart(idProduct:number, priceProduct:number){
    // TODO : update code  here in the future to check, get idUser  null or undefined
    let idUserTemp = this.cookieService.get('idUser')

    this.callApiService.addOneProductInCartByIDUser({
      id_user : idUserTemp,
      id_product : idProduct,
      price_per_product : priceProduct
    }).subscribe({
      next: (data) => {
        if(data['error'] === false){
          if(data['result'] === 'update' || data['result'] === 'new'){
            this.callApiService.getQuantityInCartByIdUser({id_user: idUserTemp}).subscribe((data) =>{
              if(data['error'] === false){
                this.globalStateService.updateQuantityProductInCart(data['result'])
              }else {
                // TODO : update code in the future
              }
            })
          }else{
            // TODO : update code in the future
          }
        }else {
          // TODO : update code in the future
        }
      },error :(error) => {
        // TODO : update code in the future
      }
    })
  }
}
