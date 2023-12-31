import { IUser } from '../user/user.interface';
import { IOrganization } from '../organization/organization.interface';
import { ILookupValue } from '../common/lookup.interface';
import { ICountry } from '../common/country.interface';
import { IOrganizationMinimal } from '../organization/organization.interface';

export interface IAccount {
    id?: number;    
    hash: string;    
    name: string;
    description:string;
    org: IOrganizationMinimal;
    owner:IUser;
    is_default:boolean;
    type:ILookupValue;
    website:string;
    email:string;
    phone:string;
    address?: string;
    locality?: string;
    city?: string;
    state_id?: ILookupValue;
    country?: ICountry[];
    zipcode?: string;
    google_place_id?: string;
    longitude?: number;
    latitude?: number;
    timezone?: any;
}

export interface IAccountMinimal {
    id?:number;
    hash: string;
    name: string;
    owner:IUser;
    type:ILookupValue;
    website:string;
    email:string;
    city?: string;
    is_default:boolean;
    last_updated_at: Date;
}

export interface IAccountRequest {
        
    hash: string;    
    name: string;
    description:string;    
    owner:string;
    is_default:boolean;
    type_id:number;
    website:string;
    email:string;
    phone:string;
    address?: string;
    locality?: string;
    city?: string;
    state_id: string;
    country_alpha2_code: number;
    zipcode?: string;
    google_place_id?: string;
    longitude?: number;
    latitude?: number;
    timezone?: any;
}