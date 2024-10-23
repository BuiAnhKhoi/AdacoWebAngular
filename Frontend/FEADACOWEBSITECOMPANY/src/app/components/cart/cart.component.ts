import { Component, OnInit, ElementRef} from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

// Import service
import { CallApiService } from '../../services/call-api.service'

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.scss'
})
export class CartComponent implements OnInit {
  cartForm!: FormGroup;
  arrProductInCart: Array<any> = [];
  lengthArrProductInCart: number = 0;
  totalCostProductInCart: number = 0;
  lstProvince: Array<any> = [];
  lstDistrict: Array<any> = [];
  lstWard: Array<any> = [];
  selectProvince: string = '';
  selectDistrict: string = '';
  selectWard: string = '';
  fullNameBuyer: string = '';
  telBuyer: string = '';
  noteBuyer: string = '';
  shippingFee: number = 30000;
  codeOrder: string = '';

  constructor(
    private callApiService: CallApiService,
    private formBuilder: FormBuilder,
    private cookieService: CookieService,
    private el: ElementRef
  ){}

  ngOnInit(): void {
    // TODO: update code in the future, to check idUser get successful or not
    let idUser = parseInt(this.cookieService.get('idUser'));
    this.getAllProduct(idUser)

    this.cartForm = this.formBuilder.group({
      fullNameBuyer: [
        '',
        [
          Validators.required,
          Validators.maxLength(22),
          Validators.minLength(1),
        ],
      ],
      telBuyer: [
        '',
        [
          Validators.required,
          Validators.maxLength(12),
          Validators.minLength(10),
        ],
      ],
      noteBuyer: ['', [Validators.required]],
    });

    this.loadProvince()
  }

  getAllProduct(id_user:number){
    this.callApiService.getAllProductInCart(id_user).subscribe({
      next:(data)=>{
        if(data['error'] === false){
          this.arrProductInCart = data['result']
          console.log(data['result'])
          this.lengthArrProductInCart = this.arrProductInCart.length

          let totalCostTemp = 0
          for ( let index in this.arrProductInCart){
            totalCostTemp = totalCostTemp + (parseInt(this.arrProductInCart[index]['price']) * this.arrProductInCart[index]['quantity'])
          }

          this.totalCostProductInCart = totalCostTemp
        }else {
          // TODO: update code  in the future
        }
      },error:(error)=>{
        // TODO : update code in the future
      }
    })
  }

  loadProvince(){
    this.callApiService.getAllProvince().subscribe({
      next:(data)=>{
        if(data['hasError'] === false){
          // Key : division_province
          this.lstProvince = data['result']
        }else{
          // TODO : update code in the future
        }
      },error:(error)=>{
        // TODO: update code in the future
      }
    })
  }

  loadDistrict(event : Event){
    this.selectProvince = (event.target as HTMLSelectElement).value 
    this.callApiService.getAllDistrict(this.selectProvince).subscribe({
      next:(data)=>{
        if(data['hasError'] === true){
          // TODO :update code in the future, change key return from hasError => error, change in backend
        }else {
          this.lstDistrict = data['result']
        }
      },error : (error) => {
        // TODO : update code in the future
      }
    })
  }

  loadWard(event:Event){
    this.selectDistrict = (event.target as HTMLSelectElement).value
    this.callApiService.getAllWard(this.selectProvince, this.selectDistrict).subscribe({
      next:(data)=>{
        if(data['hasError'] === true){
          // TODO  : update code in the future, change key return from hasError => error, change in backend
        }else {
          this.lstWard = data['result']
        }
      }, error: (error) =>{
        // TODO : update code in the future
      }
    })
  }

  chooseWard(event :Event){
    this.selectWard =(event.target as HTMLSelectElement).value
  }

  addQuantity(idProduct :number){
    // TODO : update code in the future, check idUser in cookie not exists
    let idUserTemp = this.cookieService.get('idUser')
    this.callApiService.addQuantityProductInCart({
      id_user : idUserTemp,
      id_product :idProduct
    }).subscribe({
      next:(data)=>{
        if(data['error'] === false){
          if(data['result'] === true){
            this.getAllProduct(parseInt(idUserTemp))
          }else {
            // TODO : update code in the future
          }
        }else{
          // TODO: update code in the future
        }
      },error:(error) => {
        // TODO : update code in the future
      }
    })
  }

  minusQuantity(idProduct: number, quantityProduct: number){
    // TODO : update code in the future, check idUser in cookie not exists
    let idUserTemp = this.cookieService.get('idUser')

    if(quantityProduct === 1){
      let confirmDeleteProduct = confirm('Are you sure delete product')
      if(confirmDeleteProduct){
        this.checkConfirmDeleteProduct(idProduct, true)
      }else {

      }
    }else {
      this.callApiService.minusQuantityProductInCart({
        id_user: idUserTemp,
        id_product: idProduct
      }).subscribe({
        next:(data) =>{
          if(data['error'] === false){
            if(data['result']===true){
              this.getAllProduct(parseInt(idUserTemp))
            }else{
              // TODO : update code in the future
            }
          }else {
            // TODO : update code in the future
          }
        },error:(error) => {
          // TODO : update code in the future
        }
      })
    }

    
  }

  inputQuantity(idProduct: number){
    // TODO : update code in the future, check idUser in cookie not exists
    let idUserTemp  = this.cookieService.get('idUser')
    const inputTag = this.el.nativeElement.querySelector(
      `#input__quantity__${idProduct}`
    );

    this.callApiService.inputQuantityProductInCart({
      id_user: idUserTemp,
      id_product: idProduct,
      input_quantity : parseInt(inputTag.value)
    }).subscribe({
      next:(data) => {
        if(data['error'] === false){
          if(data['result'] === true){
            this.getAllProduct(parseInt(idUserTemp))
          }else {
            // TODO : update code in the future
          }
        }else {
          // TODO  :update code in the future
        }
      }, error: (error)=> {
        // TODO : update code in the future

      }
    })
  }

  checkConfirmDeleteProduct(idProduct:number, fromMinusFunctionStatus:boolean = false){
    if(fromMinusFunctionStatus === false){
      let confirmDeleteProduct = confirm('Are you sure delete product')
      if(confirmDeleteProduct){
        this.deleteProduct(idProduct)
      }
    }else{
      this.deleteProduct(idProduct)
    }
  }

  deleteProduct(idProduct: number){
    // TODO : update code in the future, check idUser in cookie not exists
    let idUserTemp = this.cookieService.get('idUser');
    this.callApiService.deleteProductInCart({
      id_user:idUserTemp,
      id_product:idProduct
    }).subscribe({
      next:(data)=>{
        if(data['error'] === false){
          if(data['result'] === true){
            this.getAllProduct(parseInt(idUserTemp))
          }else {
            // TODO : update code in the future
          }
        }else {
          // TODO : update code in the future
        }
      },error:(error)=>{
        // TODO: update code in the future
      }
    })
  }

  inputFullName(){
    this.fullNameBuyer = this.cartForm.get('fullNameBuyer')!.value
  }

  inputTel(){
    this.telBuyer = this.cartForm.get('telBuyer')!.value
  }
  
  inputNote(){
    this.noteBuyer = this.cartForm.get('noteBuyer')!.value
  }
  
  onSubmitCart(){
    // Update code in the future to check if can't get idUser from cookie
    let idUserTemp = this.cookieService.get('idUser');

    this.callApiService.makeOrderFromCart({
      id_user : idUserTemp,
      name_buyer : this.fullNameBuyer,
      tel_buyer : this.telBuyer,
      province_buyer: this.selectProvince,
      district_buyer: this.selectDistrict,
      ward_buyer: this.selectWard,
      shipping_fee: this.shippingFee,
      note_buyer : this.noteBuyer
    }).subscribe({
      next:(data)=>{
        // data : codeOrder : "", error: false,result:true
        if(data['error'] === false){
          if(data['result'] === true){
            // TODO : update ui here
            alert(`Order successful. Code order is ${data['codeOrder']}`)
            window.location.reload()
          }
        }else{
          // TODO : update code in the future
        }
      }, error : (error) => {
        // TODO : update code in the future
      }
    })
  }
}
