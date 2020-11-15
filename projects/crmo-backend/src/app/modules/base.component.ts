import { OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl, FormArray, ValidationErrors } from '@angular/forms';


export abstract class BaseComponent {

  private errors: ValidationErrors[];

  //Default Constructor
  constructor(
  ) { }


  /**
   * Raise Errors as Appropriate
   * 
   * @param formGroup 
   */
  public fnRaiseErrors(_formGroup : FormGroup) {
    Object.keys(_formGroup.controls).forEach(field => {
      const control = _formGroup.get(field);

      if (control instanceof FormControl) {
        control.markAsDirty({ onlySelf: true });
      } else if (control instanceof FormGroup) {
        this.fnRaiseErrors(control);
      } //End if
    });
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