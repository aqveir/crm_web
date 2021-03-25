import { ErrorHandler, Injectable, NgZone, Injector } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';

//Framework library
import { NotificationService, LoggerService, LoaderService, TranslateService } from 'ellaisys-lib';

//Application files
import { Globals } from '../app.global';
import { environment } from '@env-backend/environment';

export class ErrorModel {
    code : string;
    name : string;
    message : string;
    error : any;
    toLogin : boolean=false;
    action: string=null;
}

@Injectable({
    providedIn: 'root',
})
export class GlobalErrorHandler implements ErrorHandler {
    private objError : ErrorModel|null;


    /**
     * Default constructor
     */
    constructor(
        private _zone: NgZone,
        private _router: Router,
        private _loggerService: LoggerService,
        private _translateService: TranslateService,
        private _notificationService: NotificationService,
        
    ) {
    } //Function ends


    public getError() : any {
        return this.objError;
    } //Function ends


    /**
     * Error Handler
     * 
     * @param _error 
     */
    public handleError(_error: any): void {
        //Process Error
        this.processError(_error);

        //throw _error;
    } //Function ends


    /**
     * Process the error and initiate action
     * 
     * @param _error 
     */
    private processError(_error: HttpErrorResponse|any): void {       
        //Create Error Model
        this.objError=new ErrorModel();
        this.objError.error=_error;

        try {
            if (_error instanceof HttpErrorResponse) {
                if (_error.status!=null) {
                    switch (_error.status) {
                        case 0: {
                            this.objError.name='ERROR.CODE.0';
                            this.objError.message='No Internet or Connectivity';
                            this.objError.action=null;
                            break;
                        }
                        case 401: {
                            this.objError.name='ERROR.CODE.401';
                            this.objError.message='User session expired.';
                            this.objError.toLogin=true;
                            break;
                        }
                        case 403: {
                            this.objError.name='ERROR.CODE.403';
                            this.objError.message='Forbidden. Unauthorized User.';
                            break;
                        }
                        case 404: {
                            this.objError.name='ERROR.CODE.404';
                            this.objError.message='Resource not found';
                            this.objError.action=_error.status.toString();
                            break;
                        }
                        case 422: {
                            this.objError.name='ERROR.CODE.422';
                            this.objError.message='The input data format is incorrect.';
                            break;
                        }
                        case 500: {
                            this.objError.name='ERROR.CODE.500';
                            this.objError.message='Some error has occured. Please try again.';
                            this.objError.action=_error.status.toString();

                            //Get Error Msg
                            let errMsg:string = (_error)?_error.error.error.message:'';

                            if(errMsg.indexOf('Unauthenticated')>=0) {
                                this.objError.toLogin=true;
                            } //End if

                            if(errMsg.indexOf('Duplicate')>=0){
                                this.objError.name='_DUPLICATE';
                                this.objError.message='Duplicate information.';                            
                            }
                            break;
                        }
                    } //Switch ends

                    // Raise notification
                    if (this._notificationService && (this.objError.action==null)) {
                        this._translateService.get(this.objError.name).subscribe((errorMsg: string) => {
                            this._notificationService.error('Error', errorMsg, Globals.NotificationDefaultOptions);
                        });
                    } //End if

                    //Log the error
                    if (this._loggerService) {
                        this._loggerService.error(JSON.stringify(this.objError));
                    } //End if
                    
                    //Route in case of action
                    if (this._router) {
                        if ((!this.objError.toLogin) && (this.objError.action!=null)) {
                            this._zone.run(() => this._router.navigate(['/error', this.objError.action]));
                        } else if (this.objError.toLogin) {
                            this._zone.run(() => this._router.navigate(['/']));
                        } else {
                            //Do nothing
                        } //End if
                        
                    } //End if
                } else {
                    this.objError.code='';
                    this.objError.message='';
                } //End if
            } //End if

            // ----------------------------------------------------
            //TODO: Delete after development
            if (environment && environment.production==false) {
                //Output to console
                console.error('GlobalErrorHandler-->');
                console.error(_error);
                console.error(this.objError);
            } //End if
            // ----------------------------------------------------     

        } catch(Exception) {
            console.error(Exception);
        } //Try-catch ends
    } //Function ends
    
} //Class ends
