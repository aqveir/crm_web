import { ILookupValue } from '../common/lookup.interface';

export interface IUserStatusResponse {
    user: string;  
    status: ILookupValue;
    last_updated_at: Date;
}

export interface IUserStatusRequest {
    user: string;  
    status: ILookupValue;
    last_updated_at: Date;
}