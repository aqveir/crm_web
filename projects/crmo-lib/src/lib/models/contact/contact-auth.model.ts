import { 
    IResponseContactLogin, IRequestContactLogin, 
    IRequestContactValidate, IResponseContactValidate,
    IRequestContactRegister, IResponseContactRegister, 
    IRequestContactForgotPassword, IResponseContactForgotPassword, 
    IRequestContactChangePassword, IResponseContactChangePassword,
} from '../../interfaces/contact/contact-auth.interface';

export class RequestContactLogin implements IRequestContactLogin {
    username: string;
    password: string;
    country_idd: string = '91';
    device_id: string = null;
    remember_me: boolean = false;
}
export class ResponseContactLogin implements IResponseContactLogin {
    token_type: string;
    token: string;
    created_on: number;
    expires_in: number;

    hash: string;
    full_name: string;
    name_initials: string;
    last_updated_at: Date;

    cart: [];
}


export class RequestContactValidate implements IRequestContactValidate {
    email: string;
    phone: string;
}
export class ResponseContactValidate implements IResponseContactValidate {
}


export class RequestContactRegister implements IRequestContactRegister {
    first_name: string;
    last_name: string;
    email: string;
    phone: string;
    password: string;
    country_idd: string;
}
export class ResponseContactRegister implements IResponseContactRegister {
    first_name: string;
    last_name: string;
    email: string;
    phone: string;
    password: string;
    country_idd: string;
}


export class RequestContactForgotPassword implements IRequestContactForgotPassword {
    email: string;
}
export class ResponseContactForgotPassword implements IResponseContactForgotPassword {
}


export class RequestContactChangePassword implements IRequestContactChangePassword {
    old_password: string;
    new_password: string;
    new_password_confirmation: string;
}
export class ResponseContactChangePassword implements IResponseContactChangePassword {
    data: any;
    execution_time: string;
    status: string;
}
