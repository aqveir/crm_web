import { ILookup } from './lookup.interface';

export interface IConfiguration {
    key: string;
    display_value: string;
    filter: null;
    schema?: any;
    last_updated_at: Date;
    pivot: any;
    type: ILookup
}