import { IOrganizationMinimal } from '../organization/organization.interface';
import { IPrivilege } from '../common/privilege.interface';

export { IPrivilege } from '../common/privilege.interface';
export { IOrganizationMinimal } from '../organization/organization.interface';

export interface IRequestUserLogin {
    username: string;  
    password: string
    device_id: string;
    remember_me: boolean;
}
export interface IResponseUserLogin {
    token_type: string;  
    token: string
    created_on: number;
    expires_in: number;

    hash: string;
    username: string;
    full_name: string;
    name_initials: string;
    last_login_at: Date;
    last_updated_at: Date;
    country: any;
    timezone: any;
    organization: IOrganizationMinimal;

    privileges: IPrivilege[];
    reportees: [];
}


export interface IRequestUserLogout {
}
export interface IResponseUserLogout {
	first_name: string;
	last_name: string;
    email: string;
    phone: string;
    password: string;
	phone_idd: string;
}


export interface IRequestUserValidate {
    email: string;
    phone: string;
}
export interface IResponseUserValidate {
}


export interface IRequestUserRegister {
	first_name: string;
	last_name: string;
    email: string;
    phone: string;
    password: string;
	phone_idd: string;
}
export interface IResponseUserRegister {
	first_name: string;
	last_name: string;
    email: string;
    phone: string;
    password: string;
	phone_idd: string;
}


export interface IRequestUserChangePassword {
    old_password: string;
    new_password: string;
	new_password_confirmation: string;
}
export interface IResponseUserChangePassword {
}


export interface IRequestUserForgotPassword {
    email: string;
}
export interface IResponseUserForgotPassword {
}

export interface IRequestUserResetPassword {
    token: string;
    email: string;
    password: string;
    password_confirmation: string;
}