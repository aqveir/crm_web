import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

//Third Party components and libraries
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { StripeCardElementOptions, StripeElementsOptions, SetupIntent, Stripe, loadStripe, SetupIntentResult, StripeElements, StripeCardElement } from '@stripe/stripe-js';

//Application Libraries
import { PaymentMethodService } from 'crmo-lib';
import { environment } from '@env-backend/environment';

//Application Files
import { Globals } from 'projects/crmo-backend/src/app/app.global';
import { BaseComponent } from '../../../base.component';

@Component({
  selector: 'crmo-backend-modal-add-paymentmethod',
  templateUrl: './modal-add-paymentmethod.component.html',
  styleUrls: ['./modal-add-paymentmethod.component.scss']
})
export class ModalAddPaymentmethodComponent extends BaseComponent implements OnInit {
  @ViewChild('cardElement') cardElementRef: ElementRef;
  
  //Common attributes
  public boolLoading: boolean = false;
  public hasError: boolean = false;

  public oHash: string = null;
  public cardForm!: FormGroup;
  public cardElements: StripeElements;
  public cardElement: StripeCardElement;
  public cardErrors: any;
  
  private stripeSetupIntent: SetupIntent = null;
  private stripe: Stripe = null;

  public cardOptions: StripeCardElementOptions = {
    style: {
      base: {
        iconColor: '#666EE8',
        color: '#3F4254',
        fontWeight: '400',
        fontFamily: 'Poppins, Roboto, "Helvetica Neue", Helvetica, sans-serif',
        fontSize: '14px',
        '::placeholder': {
          color: '#CFD7E0',
        },
      },
    },
  };

  public elementsOptions: StripeElementsOptions = {
    locale: 'en',
  };


  /**
   * Default constructor
   */
  constructor(
    private _globals: Globals,
    private _formBuilder: FormBuilder,
    private _modalActive: NgbActiveModal,
    private _paymentmethodService: PaymentMethodService
  ) {
    super();
  }


  /**
   * Lifecycle Hook's
   */
  ngOnInit(): void {

    //Initilaize component
    this.fnInitialize();
  } //Function ends


  /**
   * Initialize
   */
  private fnInitialize(): void {
    //Get Stripe Instance
    loadStripe(environment.stripe.publishable_key)
      .then((response: Stripe) => { 
        this.stripe = response;
        this.cardElements = this.stripe.elements(this.elementsOptions);
        this.cardElement = this.cardElements.create('card', this.cardOptions);
        this.cardElement.mount(this.cardElementRef.nativeElement);
        this.cardElement.on('change', ({ error }) => {
          this.cardErrors = error && error.message;
        });
      })
      .catch((error: any) => { throw error; });

    //Get Stripe Setup Intent
    this.fnLoadPaymentMethodsSetupIntent();

    //Initialize form
    this.fnInitializeForm();
  } //Function ends


  /**
   * Get Setup Intent for the Payment Method
   */
   private fnLoadPaymentMethodsSetupIntent(): boolean {
    try {
      //Build the params for passing
      let params: Object = {'key': this.oHash};

      this._paymentmethodService.getSetupIntent(params)
        .subscribe((response: SetupIntent) => {
          this.stripeSetupIntent = response;
        },(error) => {
          throw error;
        });

        return true;
    } catch (error) {
      //Stop loader
      this.boolLoading = false;

      throw error;
    } //Try-catch ends
  } //Function ends


  /**
   * Save the card data
   */
  public fnSaveAction(): boolean {
    try {
      //Check form validity
      this.cardForm.updateValueAndValidity();
      if (this.cardForm.invalid) { 
        this.fnRaiseErrors(this.cardForm); 

        return false; 
      } //End if

      //Transform form data into object
      let objFormData: any = this.cardForm.value;

      //Validate the card with stripe
      this.boolLoading = true;
      this.stripe.confirmCardSetup(this.stripeSetupIntent.client_secret, {
          payment_method: {
            card: this.cardElement,
            billing_details: { name: objFormData.card_owner }
          }
      })
      .then((response: SetupIntentResult) => {
        this.boolLoading = false;

        //Show error
        if (response.error) {
          this._globals.showError(response.error?.message, false);
        } else {
          this.fnAddcardAsPaymentMethod(response);
        } //End if
      })
      .catch((error: any) => { 
        this.boolLoading = false; 
        throw error.message; 
      });

      return true;
    } catch (error) {
      //Stop loader
      this.boolLoading = false;
      throw error;
    } //Try-catch ends
  } //Function ends


  /**
   * Save the Card as Payment Method
   * 
   * @param event
   * @param type
   */
   private fnAddcardAsPaymentMethod(payload: SetupIntentResult): void {
    try {
      //Build the params for passing
      let params: Object = {'key': this.oHash};

      this.boolLoading = true;
      this._paymentmethodService.create(payload?.setupIntent, params)
        .subscribe((response: any) => {
          this.boolLoading = false;
          this._modalActive.close({confirm: true, refresh: true});
        },(error) => {
          this.boolLoading = false;
          throw error;
        });

    } catch (error) {
      //Stop loader
      this.boolLoading = false;

      throw error;
    } //Try-catch ends
  } //Function ends 
  

  /**
   * Close Modal window
   * 
   * @param isDismissed 
   */
  public fnCloseModal(isDismissed: boolean=false): void {
    if (isDismissed) {
      this._modalActive.dismiss({confirm: false, refresh: false});
    } else {
      this._modalActive.close({confirm: false, refresh: false});
    } //End if    
  } //Function ends


  /**
   * Initialize Reactive Form
   */
  private fnInitializeForm() {
    this.cardForm = this._formBuilder.group({
      card_owner: ['', Validators.required]
    });
  } //Function ends

} //Class ends