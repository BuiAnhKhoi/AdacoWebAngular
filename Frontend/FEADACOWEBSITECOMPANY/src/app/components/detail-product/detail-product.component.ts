import { Component, OnInit,ViewChild, ElementRef } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service'

import { CallApiService } from '../../services/call-api.service'
import { GlobalStateService } from '../../services/global-state.service'

interface dataInterfaceProduct{
  date_add: string;
  depth: number;
  depth_unit : string; 
  description : string;
  height : number;
  height_unit : string;
  id: number;
  img_main: string;
  images: any[];
  name: string;
  price: number;
  types: string;
  width: number;
  width_unit : string;
}

@Component({
  selector: 'app-detail-product',
  templateUrl: './detail-product.component.html',
  styleUrl: './detail-product.component.scss'
})
export class DetailProductComponent implements OnInit {
  @ViewChild('inputQuantity', {static : false}) inputQuantity!: ElementRef

  idProduct:number = 0
  arrInfoProduct:dataInterfaceProduct[] = []
  titleDetailProduct:string = ''
  currentQuantity: number = 1

  constructor(
    private route : ActivatedRoute,
    private router: Router,
    private cookieService: CookieService,
    private callApiService: CallApiService,
    private globalStateService : GlobalStateService
  ){  }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.idProduct = params['id_product']
    })

    this.getDetail()
  }

  getDetail(){
    this.callApiService.getDetailProductByID(this.idProduct).subscribe(
      {
        next: (data)=>{
          if(data['error'] === true){
            // TODO : update code in the future
          }else {
            this.arrInfoProduct = data['result']
            this.titleDetailProduct = `Product : ${data['result'][0]['name']}`
          }
        },error : (error)=>{
          // TODO : update code in the future
        }
      }
    )
  }

  changeQuantityProduct(event : Event){
    const inputQuantityTag = (event.target as HTMLInputElement).value
    
    if(parseInt(inputQuantityTag) <= 1 || inputQuantityTag === ""){
      // TODO : update code in the future
      this.currentQuantity = 1
      this.inputQuantity.nativeElement.value = 1
    }else {
      this.currentQuantity = Number(inputQuantityTag)
    }
  }

  minusQuantity(){
    if(this.currentQuantity <= 1){
      alert('Bạn không thể trừ thêm nữa vì tối thiểu là 1 sản phẩm')
      // TODO : update code in the future
    }else {
      this.currentQuantity = this.currentQuantity - 1
      this.inputQuantity.nativeElement.value = this.currentQuantity
    }
  }

  plusQuantity(){
    // TODO : update code in the future, to check available quantity product in inventory, if quantity product in inventory is enough => customer can buy, if not enough => throw notification and reset to 1

    // In this case, make sure you can set any quantity you want, update in the future
    this.currentQuantity = this.currentQuantity + 1
    this.inputQuantity.nativeElement.value = this.currentQuantity
  }

  buyNow(idProduct:number, quantityBuy: number){
    this.router.navigate(['/buy-now', idProduct, quantityBuy])
  }

  addProductToCart(){
    // TODO : check  iduser may be wrong in the future
    let idUserTemp = this.cookieService.get('idUser')
    this.callApiService.addMoreQuantityProductInCart({
      id_user:idUserTemp,
      id_product:this.idProduct,
      price_per_product: this.arrInfoProduct[0].price,
      quantity_add: this.currentQuantity
    }).subscribe({
      next:(data) => {
        if(data['error'] === false){
          if(data['result'] === true){
            this.callApiService.getQuantityInCartByIdUser({id_user:idUserTemp}).subscribe((subData) => {
              this.globalStateService.updateQuantityProductInCart(subData['result'])
            })
          }
        }else {
          // TODO : update code in the future
        }
      }, error: (error) => {
        // TODO : update code in the future
      }
    })
    
  }
}
