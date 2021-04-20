import { IUser } from '../user/user.interface';
import { IConfiguration } from '../common/configuration.interface';
import { ILookupValue } from '../common/lookup.interface';

export interface IOrganization {
    hash: string;
    name: string;
    logo?: string;    
    subdomain?: string;
    website?: string;
    search_tag?: string,

    contact_person_name?: string,
    phone?: string,
    email?: string,

    industry?: ILookupValue,
    users?: IUser[],
    configurations?:IConfiguration[];

    users_count: number;
    last_updated_at: Date;
}

export interface IOrganizationMinimal {
    hash: string;
    name: string;
}
