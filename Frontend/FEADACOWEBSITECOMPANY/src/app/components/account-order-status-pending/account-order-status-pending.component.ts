import { Component, OnInit } from '@angular/core';

// Import service
import { CallApiService } from '../../services/call-api.service'

@Component({
  selector: 'app-account-order-status-pending',
  templateUrl: './account-order-status-pending.component.html',
  styleUrl: './account-order-status-pending.component.scss'
})
export class AccountOrderStatusPendingComponent implements OnInit{
  isLogin:boolean = false
  arrOrderStatus:Array<any> = []
  numPageOrder:number = 0
  currentPage:number = 1;
  listNumPagination:Array<number> = []

  constructor(
    private callApiService : CallApiService
  ){}

  ngOnInit(): void {
    this.getOrder()
  }

  getOrder(){
    this.callApiService.getOrderStatus('PENDING', this.currentPage).subscribe({
      next:(data)=>{
        console.log(data)
        if(data['error'] === true){
          // TODO: update code in the future
        }else {
          this.numPageOrder = data['result']['num_page']
          this.arrOrderStatus = data['result']['lst_order']
          this.isLogin = true

          // Code pagination
          const maxPageShow = 6;
          const halfMaxPageShow = Math.floor(maxPageShow/2)

          this.listNumPagination = []
          if(data['result']['num_page'] <= maxPageShow){
            for(let indexTemp = 1; indexTemp <= data['result']['num_page']; indexTemp++){
              this.listNumPagination.push(indexTemp)
            }
          }else {
            let startPage = this.currentPage - halfMaxPageShow 
          let endPage = this.currentPage + halfMaxPageShow

          if(startPage <=0){
            startPage = 1;
            endPage = maxPageShow
          }

          if(endPage > data['result']['num_page']){
            endPage = data['result']['num_page']
            startPage = data['result']['num_page'] - maxPageShow + 1
          }

          for(let index = startPage; index < endPage;index++){
            this.listNumPagination.push(index)
          }
          // End code pagination
          
          }
        }
      },error:(error)=>{
        // TODO update  code in the future, check user login or not, if login ok render order,  not login render notification not login
        this.isLogin = false
      }
    })
  }

  changePagination(chooseNumPagination : number){
    this.currentPage = chooseNumPagination
    this.getOrder()
  }
}
