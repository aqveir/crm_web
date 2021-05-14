import { IUser } from '../user/user.interface';
import { IOrganization } from '../organization/organization.interface';
import { ILookupValue } from '../common/lookup.interface';
import { ICountry } from '../common/country.interface';

export interface IAccount {
    id?: number;
    
    //Added by Geeta
    //hash: string; TODO: No decision has been made on having hash field, hence commented. 
    
    name: string;
    org: IOrganization;
    owner:IUser;
    is_default:boolean;
    type:ILookupValue;
    website:string;
    email:string;
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
}

export interface IAccountMinimal {
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