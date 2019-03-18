import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ErrorService {

constructor() { }

  
  private _error = new Subject<string>();
  public get error() : Subject<string> {
    return this._error;
  }

  public Error(msg: string) {
    this._error.next(msg);
  }
}
