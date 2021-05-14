import { Injectable } from '@angular/core';

@Injectable()
export class BaseService {

  constructor() { }



  /**
   * Check if the property exists in an object
   * 
   * @param _object 
   * @param _property 
   */
  protected hasProperty(_object: Object, _property: string): boolean {
    return Object.prototype.hasOwnProperty.call(_object, _property);
  } //Function ends
  
} //Class ends
