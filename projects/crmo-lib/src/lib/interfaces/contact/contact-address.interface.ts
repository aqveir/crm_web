import { ICountry } from '../common/country.interface';

export interface IContactAddress {
    id: number;
    name: string;
    address1: string;
    address2: string;
    locality: string;
    apartment: string;
    society: string;    
    city: string;
    zipcode: string;
    level: any;
    notes: [];
    longitude: number;
    latitude: number;
    is_default: boolean; 
    is_verified: boolean;
    is_active: boolean;
    country: ICountry;
}