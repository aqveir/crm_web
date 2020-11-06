import { ErrorHandler, Injectable, Injector, NgZone } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';

//Framework library
import { NotificationService, LoggerService } from 'ellaisys-lib';

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


    //Default Constructor
    constructor(
        private _zone: NgZone,
        private _injector: Injector,
        private _notification: NotificationService
    ) {
    } //Function ends


    public getError() : any {
        return this.objError;
    } //Function ends


    public handleError(_error: any): void {
        //Process Error
        this.processError(_error);

        //throw _error;
    } //Function ends


    private processError(_error: HttpErrorResponse|any): void {
        const notification = this._injector.get(NotificationService);
        const logger = this._injector.get(LoggerService);
        const router = this._injector.get(Router);
        //const route = this.injector.get(ActivatedRoute);
        
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
                            this.objError.action=_error.status.toString();
                            break;
                        }
                        case 401: {
                            this.objError.name='ERROR.CODE.401';
                            this.objError.message='Unauthorized User';
                            break;
                        }
                        case 403: {
                            this.objError.name='ERROR.CODE.403';
                            this.objError.message='User session expired.';
                            this.objError.toLogin=true;
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
                    if (notification && (this.objError.action==null)) {
                        notification.error('Some Error', this.objError.name); // , Globals.NotificationDefaultOptions);
                    } //End if

                    //Log the error
                    if (logger) {
                        logger.error(JSON.stringify(this.objError));
                    } //End if

                    if (router && (this.objError.action!=null)) {
                        this._zone.run(() => router.navigate(['/error', this.objError.action]));
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
            } //End if
            // ----------------------------------------------------     

        } catch(Exception) {
            console.error(Exception);
        } //Try-catch ends
    } //Function ends
    
} //Class ends
