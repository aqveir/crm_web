import { IContactMinimal } from '../contact/contact.interface';
import { IAccountMinimal } from '../account/account.interface';
import { IUserMinimal } from '../user/user.interface';
import { ILookupValue } from '../common/lookup.interface';


export interface IServiceRequestMinimal {
    hash: string;
    contact: IContactMinimal;
    account: IAccountMinimal;
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
    account: IAccountMinimal;
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
