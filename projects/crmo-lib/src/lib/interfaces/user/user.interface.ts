import { IOrganizationMinimal } from '../organization/organization.interface';

export interface IUser {
    hash: string;
    username: string;
    name_initials: string;
    full_name: string;

    last_login_at: Date;
    verified_at: Date,
    last_updated_at: Date;
    
    country: string;
    timezone: string;
    organization: IOrganizationMinimal
}

export interface IUserMinimal {
    hash: string;
    name_initials: string;
    full_name: string;
}