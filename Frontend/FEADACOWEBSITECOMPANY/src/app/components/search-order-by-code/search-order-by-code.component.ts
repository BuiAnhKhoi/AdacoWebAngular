import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms'

// Import service
import { CallApiService } from '../../services/call-api.service'

@Component({
  selector: 'app-search-order-by-code',
  templateUrl: './search-order-by-code.component.html',
  styleUrl: './search-order-by-code.component.scss'
})
export class SearchOrderByCodeComponent implements OnInit {
  searchForm!:FormGroup
  arrInformationOrder:Array<any> = []
  errSearchStr: string = ""
  notFoundOrderSearchStr: string = ""

  constructor(
    private callApiService: CallApiService,
    private formBuilder : FormBuilder
  ){}

  ngOnInit(): void {
    // TODO : add validator and update code here in the future
    this.searchForm = this.formBuilder.group({
      codeOrder : ''
    })
  }

  onSubmitFormSearch(){
    this.arrInformationOrder = []
    this.errSearchStr = ''
    this.notFoundOrderSearchStr = ""

    // TODO : update code in the future, to check code order input valid or not
    this.callApiService.searchOrderByCode(this.searchForm.get('codeOrder')!.value).subscribe({
      next : (data)=>{
        console.log(data)
        if(data['error'] === false){
          if(data['result'] === 'not-found'){
            // TODO : delete this.notFoundOrderSearchString in the future, because hard code in html
            this.notFoundOrderSearchStr = `Not found any order with code ${this.searchForm.get('codeOrder')!.value}`
          }else {
            this.arrInformationOrder = [data['result']]
          }
        }else {
          // TODO : update code in the future
        }
      }, error: (error)=> {
        // TODO : update code in the future
        // TODO : delete it in the future, because hard code in html file
        this.errSearchStr = 'yes'
      }
    })
  }
}
