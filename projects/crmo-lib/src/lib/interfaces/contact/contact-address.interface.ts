import { ICountry } from '../common/country.interface';
import { INote } from '../note/note.interface';

export interface IContactAddress {
    id: number;
    name: string;
    address1: string;
    address2: string;
    locality: string;
    city: string;
    zipcode: string;
    level: any;
    notes: INote[];
    longitude: number;
    latitude: number;
    is_default: boolean; 
    is_verified: boolean;
    is_active: boolean;
    country: ICountry;

    //Used in Order Management Module
    apartment: string;
    society: string;     
}