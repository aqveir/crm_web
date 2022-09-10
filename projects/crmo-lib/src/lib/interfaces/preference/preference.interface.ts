import { ILookupValue } from '../common/lookup.interface';


export interface IPreference {
    id: number;
    name: string;
    display_value: string;
    column_name: string;
    is_minimum: boolean;
    is_maximum: boolean;
    is_multiple: boolean;
    external_url: string;
    keywords: string;
    order: number;
    is_active: true;
    last_updated_at: Date;
    type: ILookupValue;
    data: IPreferenceData|null;
}
export interface IPreferenceData {
    id: number;
    name: string;
    display_value: string;
    description: string;
    values: IPreferenceDataValues[];
}
export interface IPreferenceDataValues {
    id: number;
    value: string;
    display_value: string;
    description: string;
    is_active: boolean;
}


export interface IPreferenceMinimal {
    id: number;
    name: string;
    display_value: string;
    order: number;
    is_active: true;
    last_updated_at: Date;
    type: ILookupValue;
}


export interface IPreferenceRequest {
    name: string;
    display_value: string;
    type_key: string;

    column_name?: string;
    is_minimum?: boolean;
    is_maximum?: boolean;
    is_multiple?: boolean;
    keywords?: string;
    order?: number;
    is_active?: true;
    last_updated_at?: Date;
}