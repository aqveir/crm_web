import { Injectable, Inject } from '@angular/core';


@Injectable({
  providedIn: 'root'
})
export class InitService {

  //Default constructor
  constructor(
    @Inject('environment') private _environment: any
  ) { }

} //Class ends
