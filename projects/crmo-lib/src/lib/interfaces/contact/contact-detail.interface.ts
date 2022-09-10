import { ICountry } from '../common/country.interface';
import { ILookup } from '../common/lookup.interface';

export interface IContactDetail {
    id: number;
    proxy: string;
    identifier: string;
    type: ILookup;
    subtype: ILookup;
    country: ICountry;
    is_primary: boolean;
    is_verified: boolean;
}

export interface IContactDetailRequest {
    id: number;
    proxy: string;
    identifier: string;
    type_key: string;
    subtype_key: string;
    country_idd: string;
    is_primary: boolean;
    is_verified: boolean;
}