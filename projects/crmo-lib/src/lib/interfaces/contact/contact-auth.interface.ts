import { IResponse } from '../common/response.interface';

export interface IRequestContactLogin {
    username: string;  
    password: string
    phone_idd: string;
    device_id: string;
    remember_me: boolean;
}
export interface IResponseContactLogin {
    token_type: string;  
    token: string
    created_on: number;
    expires_in: number;
    
    hash: string;
    full_name: string;
    name_initials: string;
    last_updated_at: Date;
}


export interface IRequestContactLogout {
}
export interface IResponseContactLogout {
	first_name: string;
	last_name: string;
    email: string;
    phone: string;
    password: string;
	phone_idd: string;
}


export interface IRequestContactValidate {
    email: string;
    phone: string;
}
export interface IResponseContactValidate {
}


export interface IRequestContactRegister {
	first_name: string;
	last_name: string;
    email: string;
    phone: string;
    password: string;
	phone_idd: string;
}
export interface IResponseContactRegister {
	first_name: string;
	last_name: string;
    email: string;
    phone: string;
    password: string;
	phone_idd: string;
}


export interface IRequestContactChangePassword {
    old_password: string;
    new_password: string;
	new_password_confirmation: string;
}
export interface IResponseContactChangePassword {
}


export interface IRequestContactForgotPassword {
    email: string;
}
export interface IResponseContactForgotPassword {
}