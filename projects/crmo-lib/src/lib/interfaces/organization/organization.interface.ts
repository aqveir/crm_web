import { IUser } from '../user/user.interface';
import { IConfiguration } from '../common/configuration.interface';
import { ILookupValue } from '../common/lookup.interface';
import { ICountry } from '../common/country.interface';


export interface IOrganization {
    hash: string;
    name: string;
    logo?: string;    
    subdomain?: string;
    website?: string;
    search_tag?: string;

    contact_person_name?: string;
    phone?: string;
    phone_idd?: string;
    email?: string;

    address?: string;
    locality?: string;
    city?: string;
    state_id?: number;
    country?: ICountry[];
    zipcode?: string;
    google_place_id?: string;
    longitude?: number;
    latitude?: number;

    timezone?: any;
    industry?: ILookupValue;
    configurations?:IConfiguration[];

    users_count: number;
    last_updated_at: Date;
}

export interface IOrganizationMinimal {
    hash: string;
    name: string;
    subdomain: string;
    logo: string;
    users_count: number;
    last_updated_at: Date;
}

export interface IOrganizationRequest {
    name: string;
    logo?: any;    
    subdomain?: string;
    website?: string;
    search_tag?: string;

    first_name?: string;
    last_name?: string;
    contact_person_name: string;
    phone?: string;
    phone_idd?: string;
    email: string;

    industry_key: string;
    timezone_id?: number;

    address?: string;
    locality?: string;
    city?: string;
    state_id?: number;
    country_id?: number;
    zipcode?: string;
    google_place_id?: string;
    longitude?: number;
    latitude?: number;

    is_active?: boolean;
}
