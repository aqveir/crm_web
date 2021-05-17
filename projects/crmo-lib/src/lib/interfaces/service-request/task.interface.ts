import { ILookupValue } from '../common/lookup.interface'
import { IUserMinimal } from '../user/user.interface';
import { IServiceRequestMinimal } from './service-request.interface';


export interface ITaskMinimal {
    id: number;
    subject: string;
    scheduled_at: Date;
    completed_at: Date|null;
    last_updated_at: Date;
    is_scheduled: boolean;
    is_completed: boolean;
    type: ILookupValue;
    subtype: ILookupValue;
    servicerequest: IServiceRequestMinimal;
    assignee: IUserMinimal;
    owner: IUserMinimal;
    priority: ILookupValue;
}


export interface ITask {
    id: number;
    subject: string;
    description: string;
    scheduled_at: Date;
    completed_at: Date|null;
    last_updated_at: Date;
    is_scheduled: boolean;
    is_completed: boolean;
    type: ILookupValue;
    subtype: ILookupValue;
    servicerequest: IServiceRequestMinimal;
    assignee: IUserMinimal;
    owner: IUserMinimal;
    priority: ILookupValue;
}

export interface ITaskRequest {
    id?: number;
    sr_hash: string;
    subject: string;
    description: string;
    scheduled_at: Date;
    completed_at?: Date|null;
    last_updated_at: Date;
    is_scheduled: boolean;
    is_completed: boolean;
    subtype_key: string;
    assignee_hash: string;
    priority_key: string;
}