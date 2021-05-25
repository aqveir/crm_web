import { ILookupValue } from './lookup.interface';
import { IPrivilege } from './privilege.interface';

export interface IAddress {
    key: string;
    hash:string;
    address: string;
    locality: string;
    city: ILookupValue;
    state:ILookupValue;
    country:ILookupValue;
    zipcode:string;
    google_place_id:string;
    lat:string;
    long:string;
    last_updated_at?: Date;
    privileges?: IPrivilege[];
}