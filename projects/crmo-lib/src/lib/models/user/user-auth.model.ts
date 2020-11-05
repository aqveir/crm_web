import { 
    IResponseUserLogin, IRequestUserLogin, 
    IRequestUserValidate, IResponseUserValidate,
    IRequestUserRegister, IResponseUserRegister, 
    IRequestUserForgotPassword, IResponseUserForgotPassword, 
    IRequestUserChangePassword, IResponseUserChangePassword,
} from '../../interfaces/user/user-auth.interface';

import { IOrganizationMinimal } from '../../interfaces/organization/organization.interface';
import { IPrivilege } from '../../interfaces/common/privilege.interface';

export class RequestUserLogin implements IRequestUserLogin {
    username: string;
    password: string;
    device_id: string = null;
    remember_me?: boolean = false;
}
export class ResponseUserLogin implements IResponseUserLogin {
    token_type: string;
    token: string;
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


export class RequestUserValidate implements IRequestUserValidate {
    email: string;
    phone: string;
}
export class ResponseUserValidate implements IResponseUserValidate {
}


export class RequestUserRegister implements IRequestUserRegister {
    first_name: string;
    last_name: string;
    email: string;
    phone: string;
    password: string;
    country_idd: string;
}
export class ResponseUserRegister implements IResponseUserRegister {
    first_name: string;
    last_name: string;
    email: string;
    phone: string;
    password: string;
    country_idd: string;
}


export class RequestUserForgotPassword implements IRequestUserForgotPassword {
    email: string;
}
export class ResponseUserForgotPassword implements IResponseUserForgotPassword {
}


export class RequestUserChangePassword implements IRequestUserChangePassword {
    old_password: string;
    new_password: string;
    new_password_confirmation: string;
}
export class ResponseUserChangePassword implements IResponseUserChangePassword {
    data: any;
    execution_time: string;
    status: string;
}
