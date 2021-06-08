import { IConfiguration } from '../common/configuration.interface';
import { ILookupValue } from '../common/lookup.interface';
import { ICountry } from '../common/country.interface';


export interface IOrganization {
    logo: string;

    hash: string;
    name: string;
    subdomain: string;
    custom_domain: string;
    website: string;

    address: string;
    locality: string;
    city: string;
    zipcode: string;
    google_place_id: string;
    longitude: number;
    latitude: number;

    contact_person_name: string;
    email: string;
    phone: string;
    phone_idd: string;
    search_tag: string;
    last_updated_at: Date;
    is_active: boolean;
    
    users_count: number;
    industry: ILookupValue;
    state_id: number;
    country: ICountry[];
    timezone: any;
    configurations?:IConfiguration[];
}

export interface IOrganizationMinimal {
    hash: string;
    name: string;
    subdomain: string;
    users_count: number;
    last_updated_at: Date;
    is_active: boolean;
    logo: string;
}

export interface IOrganizationRequest {
    logo: string;

    name: string;
    subdomain: string;
    custom_domain: string;
    website: string;

    address: string;
    locality: string;
    city: string;
    zipcode: string;
    google_place_id: string;
    longitude: number;
    latitude: number;

    contact_person_name: string;
    email: string;
    phone: string;
    phone_idd: string;
    search_tag: string;
    last_updated_at: Date;
    is_active: boolean;

    first_name: string;
    last_name: string;

    industry_key: string;
    timezone_code: string;

    state_id: number;
    country_code: string;
}