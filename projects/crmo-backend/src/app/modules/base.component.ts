import { OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl, FormArray, ValidationErrors } from '@angular/forms';

//Third Party components and libraries
import moment from 'moment';

export abstract class BaseComponent {

  private errors: ValidationErrors[];

  //Default Constructor
  constructor(
  ) { }


  /**
   * Convert JsDate to NgbFormatDateTime
   * 
   * @param dtInput
   */
  public fnConvertJsDateToNgbFormatDateTime(dtInput: Date): any {
    try {
      let dtInputDate: Date = new Date(dtInput);
      if (dtInputDate==null) { dtInputDate = new Date(); }

      return {
        date: {day:dtInputDate.getDate(), month:(dtInputDate.getMonth()+1), year: dtInputDate.getFullYear()},
        time: {hour: dtInputDate.getHours(), minute: dtInputDate.getMinutes(), second: 0}
      };
    } catch(error) {
      throw error;
    } //Try-Catch ends
  } //Function ends

  
  /**
   * Convert Moment to NgbFormatDateTime
   * 
   * @param dtInput
   */
  public fnConvertMomentToNgbFormatDateTime(dtInput: moment.Moment): any {
    try {
      let dtInputDate: moment.Moment = dtInput;
      if (!dtInputDate.isValid()) { dtInputDate = moment(); }

      return {
        date: {day:dtInputDate.get('date'), month: (dtInputDate.get('month')+1), year: dtInputDate.get('year')},
        time: {hour: dtInputDate.get('hour'), minute: dtInputDate.get('minute'), second: 0}
      };
    } catch(error) {
      throw error;
    } //Try-Catch ends
  } //Function ends


  /**
   * Filter Data from the given collection using search string
   * 
   * @param collection 
   * @param strSearch 
   */
  public fnFilterData(collection: any, strSearch: string): any {
    try {
      if (strSearch && strSearch.length > 0) {
        return collection.filter((data: any) => JSON.stringify(data).toLowerCase().includes(strSearch.toLowerCase()));
      } else {
        return collection;
      } //End if
    } catch(error) {
      throw error;
    } //Try-Catch ends
  } //Function ends


  /**
   * Transform Reactive Form Group into HttpFormData
   * 
   * @param dataForm FormGroup
   */
  public fnTransformReactiveFormGroup2FormData(dataForm: FormGroup): any {
    let formData: FormData = new FormData();

    Object.keys(dataForm.controls).forEach((name: string) => {
      let value: any = dataForm.controls[name].value;
      formData.append(name, value); 
    });
    return formData;
  } //Function ends


  /**
   * Raise Errors as Appropriate
   * 
   * @param formGroup 
   */
  public fnRaiseErrors(_formGroup : FormGroup): string {
    let strReturnValue: string = '';
    try {
      Object.keys(_formGroup.controls).forEach(field => {
        const control = _formGroup.get(field);

        //Set all controls dirty to trigger validation
        if (control instanceof FormControl) {
          control.markAsDirty({ onlySelf: true });

          if (control.invalid) {
            strReturnValue += field + ': ' + JSON.stringify(control.errors);
          } //End if
        } else if (control instanceof FormGroup) {
          strReturnValue += this.fnRaiseErrors(control);
        } //End if
      });
      
      return strReturnValue;
    } catch(error) {
      throw error;
    } //Try-catch ends
  } //Function ends


  /**
   * Check Placeholder Validations
   * 
   * @param formGroup 
   * @param key 
   */
  public fnValidatePlaceholder(_formGroup : FormGroup, _key: string) {
    let ctrl: any = _formGroup.controls[_key];
    return (ctrl.value);
  } //Function ends

  
  /**
   * Set invalid input box to red
   * 
   * @param _formGroup 
   * @param _key 
   */
  public fnRedInputBoxValidate(_formGroup : FormGroup, _key: string){
    let ctrl: any = _formGroup.controls[_key];  
    return (!ctrl.pristine && !ctrl.valid);
  } //Function ends


  /**
   * Return the overall validation errors in a 
   * FormGroup or FormArray
   * 
   * @param formGroup
   */
  public fnGetFormValidationErrors(_formGroup : FormGroup | FormArray): ValidationErrors[] {
    Object.keys(_formGroup.controls).forEach(field => {
      let control = _formGroup.get(field);

      if (control instanceof FormGroup || control instanceof FormArray) {
        if(this.errors == null) { this.errors = []; }
        this.errors = this.errors.concat(this.fnGetFormValidationErrors(control));
        return;
      } //End if

      if(control.invalid) {
        let controlErrors: ValidationErrors = control.errors;
        if (controlErrors !== null) {
          if(this.errors == null) { this.errors = []; }

          Object.keys(controlErrors).forEach(keyError => {
            this.errors.push({
              controlName: field,
              errorName: keyError,
              errorValue: controlErrors[keyError]
            });
          });
        } //End if
      } //End if
    });

    if(_formGroup.errors) {
      if(this.errors == null) { this.errors = []; }
      Object.keys(_formGroup.errors).forEach(error_key => {
        this.errors.push({
          controlName: error_key,
          errorName: error_key,
          errorValue: _formGroup.errors[error_key]
        });
      });
    } //End if
    

    // This removes duplicates
    this.errors = this.errors.filter((error, index, self) => self.findIndex(t => {
      return t.controlName === error.controlName;
    }) === index);

    return this.errors;
  } //Function ends
  public fnResetFormValidationErrors(): void {
    this.errors=null;
  } //Function ends

} //Class ends