import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';

import { CallApiService } from '../../services/call-api.service'

@Component({
  selector: 'app-account-order-history',
  templateUrl: './account-order-history.component.html',
  styleUrl: './account-order-history.component.scss'
})
export class AccountOrderHistoryComponent implements OnInit{
  isLogin:boolean = false
  arrOrderHistory:Array<any> = []
  strFilter:string = 'default'
  currentPage:number = 1
  numPage:number = 0
  listNumPagination:Array<any> = []
  lstFilter:Array<any> = [
    {
      'key' : 'default',
      'value' : 'Default'
    },
    {
      'key' : 'tchtl',
      'value' : 'Total cost high to low'
    },
    {
      'key' : 'tclth',
      'value' : 'Total cost low to high'
    },
    {
      'key' : 'newest',
      'value' : 'Newest ( date create )'
    },
    {
      'key' : 'oldest',
      'value' : 'Oldest ( date create )'
    }
  ]


  constructor(
    private callApiService: CallApiService
  ){}

  ngOnInit(): void {
    this.getOrder()
  }

  getStrFilterByKeyFilter(strKey:string):string | undefined {
    let foundItem = this.lstFilter.find(item => item.key === strKey)
    return foundItem ? foundItem.value : undefined;
  }

  getOrder(){
    this.callApiService.getOrderHistory(this.strFilter, this.currentPage).subscribe({
      next: (data) => {
        if(data['error'] === false){
          this.numPage = data['result']['num_page']
          this.arrOrderHistory = data['result']['lst_order']
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

            if(startPage <=0) {
              startPage = 1
              endPage = maxPageShow
            }

            if( endPage > data['result']['num_page']){
              endPage = data['result']['num_page']
              startPage = data['result']['num_page'] - maxPageShow + 1
            }

            for(let index = startPage; index < endPage; index++){
              this.listNumPagination.push(index)
            }

            // End code pagination
          }
        }else {
          // TODO : update code in  the future
        }
      }, error: (error)=>{
        // TODO : update code in the future
        this.isLogin = false
      }
    })
  }

  changePagination(chooseNumPagination:number){
    this.currentPage = chooseNumPagination
    this.getOrder()
  }

  changeStrFilter(event : Event){
    this.strFilter = (event.target  as HTMLSelectElement).value
    this.currentPage = 1
    this.getOrder()
  }
}
