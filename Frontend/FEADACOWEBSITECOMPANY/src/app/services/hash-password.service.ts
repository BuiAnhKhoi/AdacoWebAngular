import { Injectable } from '@angular/core';
import {sha256} from 'js-sha256'

@Injectable({
  providedIn: 'root'
})
export class HashPasswordService {

  constructor() { }

  hashPassword(password:string):string{
    return sha256(password)
  }

  comparePassword(password:string, hashedPassword: string){

  }
}
