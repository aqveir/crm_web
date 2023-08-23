import { ILookup } from './lookup.interface';

export interface IConfiguration {
    key: string;
    display_value: string;
    filter: null;
    last_updated_at: Date;
    pivot: any;
    type: ILookup;
    schema?: any;
}