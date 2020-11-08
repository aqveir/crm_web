import { IUser } from '../user/user.interface';
import { IConfiguration } from '../common/configuration.interface';

export interface IOrganization {
    hash: string;
    name: string;
    logo?: string;    
    sub_domain?: string;
    website?: string;
    search_tag?: string,

    contact_person_name?: string,
    contact_phone?: string,
    contact_email?: string,

    users?: IUser[],
    configurations?:IConfiguration[];

    users_count: number;
    last_updated_at: Date;
}

export interface IOrganizationMinimal {
    hash: string;
    name: string;
}
