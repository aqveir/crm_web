import { ICountry } from '../common/country.interface';
import { ILookup } from '../common/lookup.interface';

export interface IContactDetail {
    id: number;
    proxy: string;
    identifier_masked: string;
    type: ILookup;
    subtype: ILookup;
    country: ICountry;
    is_primary: boolean;
    is_verified: boolean;
}