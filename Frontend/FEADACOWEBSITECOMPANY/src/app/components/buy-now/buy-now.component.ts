import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup} from '@angular/forms'

// Import call api
import { CallApiService } from '../../services/call-api.service'

@Component({
  selector: 'app-buy-now',
  templateUrl: './buy-now.component.html',
  styleUrl: './buy-now.component.scss'
})
export class BuyNowComponent implements OnInit {
  /*
  codeNewOrder
: 
"d9b9c406-a6fb-445f-a265-84ca7d12a63d"
error
: 
false
result
: 
true
  */
  buyNowForm!:FormGroup

  idProduct:number = 0
  quantityProduct: number = 0
  priceProduct:number = 0
  nameProduct:string = ""
  imgLinkProduct:string = ""
  arrProvince:Array<any> = []
  arrDistrict:Array<any> = []
  arrWard:Array<any> = []
  selectedProvince:string = ""
  selectedDistrict:string = ""
  selectedWard:string = ""
  orderBuyNowStatus:boolean = false
  codeOrderBuyNow:string = ""

  // Shipping fee will update in the future, update feature calculation shipping fee
  shippingFee:number = 30000

  constructor(
    private route: ActivatedRoute,
    private callApiService: CallApiService,
    private formBuilder : FormBuilder
  ){}

  ngOnInit(): void {
    // TODO : update code in the future, check can't get query
    this.route.params.subscribe(params => {
      this.idProduct = params['id_product']
      this.quantityProduct = params['quantity']
    })

    this.getInformationProductByID()
    this.getAllProvince()

    // In the future, update code, add validator to check input value
    this.buyNowForm = this.formBuilder.group({
      fullNameBuyer: [''],
      telBuyer: [''],
      noteBuyer: ['']
    })
  }

  getInformationProductByID(){
    this.callApiService.getDetailProductByIDWithoutImage(this.idProduct).subscribe({
      next:(data) => {
        if(data['error'] === true){
          // TODO : update code in the future
        }else {
          this.priceProduct = data['result']['price']
          this.nameProduct = data['result']['name']
          this.imgLinkProduct = data['result']['img_main']
        }
      },
      error: (error) => {
        // TODO : update code in the future
      }
    })
  }

  getAllProvince(){
    this.callApiService.getAllProvince().subscribe({
      next:(data) => {
        if(data['hasError'] === true){
          // TODO : update code in the future, change key return from hasError => error, change in backend
        }else {
          this.arrProvince = data['result']
        }
      },
      error:(error) => {
        // TODO : update code in the future
      }
    })
  }

  loadDistrict(event:Event){
    this.selectedProvince = (event.target as HTMLSelectElement).value
    this.callApiService.getAllDistrict(this.selectedProvince).subscribe({
      next:(data) => {
        if(data['hasError'] === true){
           // TODO : update code in the future, change key return from hasError => error, change in backend
        }else {
          this.arrDistrict = data['result']
        }
      },error: (error) => {
        // TODO : update code in the future
      }
    })
  }

  loadWard(event:Event){
    this.selectedDistrict = (event.target as HTMLSelectElement).value
    this.callApiService.getAllWard(this.selectedProvince, this.selectedDistrict).subscribe({
      next:(data)=>{
        if(data['hasError'] === true){
          // TODO : update code in the future, change key return from hasError => error, change in backend
        }else {
          this.arrWard = data['result']
        }
      },error: (error) => {
        // TODO: update code in the future
      }
    })
  }

  chooseWard(event: Event){
    this.selectedWard = (event.target as HTMLSelectElement).value 
  }

  onSubmitBuyNow(){
    const inputFullNameBuyer = this.buyNowForm.get('fullNameBuyer')!.value
    const inputTelBuyer = this.buyNowForm.get('telBuyer')!.value
    const inputNoteBuyer = this.buyNowForm.get('noteBuyer')!.value

    // TODO : update code in the future, check if select province, district or ward wrong, check validator input, ...
    
    this.callApiService.makeOrderBuyNow({
      totalCost : ((this.quantityProduct * this.priceProduct) + this.shippingFee),
      shippingFee: this.shippingFee,
      priceProduct: this.priceProduct,
      note: inputNoteBuyer,
      province: this.selectedProvince,
      district: this.selectedDistrict,
      ward: this.selectedWard,
      fullNameBuyer: inputFullNameBuyer,
      telBuyer: inputTelBuyer,
      quantityOrder: this.quantityProduct,
      idProduct: this.idProduct,
    }).subscribe({
      next:(data) => {
        if(data['error'] === true){
          // TODO : update code in the future
        }else {
          this.codeOrderBuyNow = data['codeNewOrder']
          this.orderBuyNowStatus = true
        }
      },
      error: (error) => {
        
        // TODO : update code in the future
      }
    })
  }
}
