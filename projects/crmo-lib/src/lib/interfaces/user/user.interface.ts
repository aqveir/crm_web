import { ICountry } from '../common/country.interface';
import { IOrganizationMinimal } from '../organization/organization.interface';
import { IUserStatusResponse } from './user-status.interface';

export interface IUser {
    hash?: string;
    username: string;
    first_name?: string;
    last_name?: string;
    full_name?: string;
    name_initials?: string;
    avatar?: string;

    last_login_at?: Date;
    last_updated_at?: Date;

    is_active?: boolean;
    is_verified?: boolean;
    is_remote_access_only?: boolean;

    email: string;
    phone?: string;
    virtual_phone_number?: string;
    
    country?: ICountry;
    timezone?: any;
    organization?: IOrganizationMinimal;
    availability?: IUserStatusResponse;
}

export interface IUserMinimal {
    hash: string;
    name_initials: string;
    full_name: string;
}