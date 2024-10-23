import { Injectable, OnInit } from '@angular/core';
import { BehaviorSubject } from 'rxjs'

@Injectable({
  providedIn: 'root'
})
export class GlobalStateService implements OnInit {
  private stateSubject = new BehaviorSubject<any>(null)
  quantityProductInCart$ = this.stateSubject.asObservable()

  constructor() { }

  ngOnInit(): void {
    
  }

  updateQuantityProductInCart(newState :any){
    this.stateSubject.next(newState)
  }
}
