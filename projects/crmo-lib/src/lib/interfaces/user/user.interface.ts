import { ICountry } from '../common/country.interface';
import { IPrivilege } from '../common/privilege.interface';
import { IRole, IRoleRequest } from '../common/role.interface';
import { IOrganizationMinimal } from '../organization/organization.interface';
import { IUserStatusResponse } from './user-status.interface';

export interface IUser {
    hash: string;
    username: string;
    avatar: string;
    first_name: string;
    last_name: string;
    full_name: string;
    name_initials: string;

    email: string;
    phone?: string;
    phone_idd: string;  

    last_login_at: Date;
    last_updated_at: Date;

    is_active: boolean;
    is_verified?: boolean;
    is_remote_access_only?: boolean;

    virtual_phone_number: string;   //CTI Property

    is_pool: boolean;   //Pool user for auto generated leads
    is_default: boolean;
    
    country: ICountry;
    timezone: any;
    organization: IOrganizationMinimal;
    availability?: IUserStatusResponse;
    roles: IRole[];
    privileges: IPrivilege[];

    language: string;
}

export interface IUserMinimal {
    hash: string;
    name_initials: string;
    avatar?: string;
    full_name: string;
    
    country: ICountry;

    is_active: boolean;
    is_verified: boolean;

    last_login_at: Date;
    last_updated_at: Date;

    availability?: IUserStatusResponse;
}

export interface IUserRequest {
    username?: string;
    password?:string;
    avatar?: string;
    first_name: string;
    last_name?: string;
    
    is_active?: boolean;

    email: string;
    phone?: string;

    virtual_phone_number?: string;
    is_pool?: boolean;

    phone_idd?: string;
    timezone_id?: number;
    roles: IRoleRequest[];
    privileges?: [];

    language?: string;
}