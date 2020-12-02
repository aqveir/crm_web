import { IOrganizationMinimal } from '../organization/organization.interface';

export interface IUser {
    hash: string;
    username: string;
    name_initials: string;
    full_name: string;
    avatar: string;

    last_login_at: Date;
    verified_at: Date,
    last_updated_at: Date;
    is_active: boolean;

    email: string;
    phone: string;
    
    country: any;
    timezone: any;
    organization: IOrganizationMinimal
}

export interface IUserMinimal {
    hash: string;
    name_initials: string;
    full_name: string;
}