import { ILookupValue } from '../common/lookup.interface';
import { IContactMinimal } from '../contact/contact.interface';
import { IUserMinimal } from '../user/user.interface';


export interface IServiceRequestMinimal {
    hash: string;
    contact: IContactMinimal;
    account: any;
    owner: IUserMinimal
    category: ILookupValue;
    type: ILookupValue;
    status: ILookupValue;
    stage: ILookupValue;
    sources: [];
    star_rating: number;
    tasks_count: number;
    events_count: number;
    notes_count: number;
    last_updated_at: Date;
}


export interface IServiceRequest {
    hash: string;
    contact: IContactMinimal;
    account: any;
    owner: IUserMinimal
    category: ILookupValue;
    type: ILookupValue;
    status: ILookupValue;
    stage: ILookupValue;
    sources: [];
    star_rating: number;
    tasks_count: number;
    events_count: number;
    notes_count: number;
    last_updated_at: Date;
}
