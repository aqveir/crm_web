import { ILookupValue } from '../common/lookup.interface'
import { IUserMinimal } from '../user/user.interface';
import { IServiceRequestMinimal } from './service-request.interface';


export interface ITaskMinimal {
    id: number;
    subject: string;
    description: string;
    start_at: Date;
    end_at: Date;
    completed_at: Date|null;
    last_updated_at: Date;
    type: ILookupValue;
    subtype: ILookupValue;
    servicerequest: IServiceRequestMinimal;
    priority: ILookupValue;
    status: ILookupValue;
    owner: IUserMinimal;
    assignee: ITaskAssignee;
}


export interface ITask {
    id: number;
    subject: string;
    description: string;
    start_at: Date;
    end_at: Date;
    completed_at: Date|null;
    last_updated_at: Date;
    type: ILookupValue;
    subtype: ILookupValue;
    servicerequest: IServiceRequestMinimal;
    priority: ILookupValue;
    status: ILookupValue;
    owner: IUserMinimal;
    assignee: ITaskAssignee;
}


export interface ITaskAssignee {
    completed_at: Date|null;
    type: ILookupValue;
    participant: IUserMinimal;
}



export interface ITaskRequest {
    sr_hash: string;
    subject: string;
    description: string;
    start_at: Date|string;
    end_at: Date|null|string;
    subtype_key: string;
    priority_key: string;
    status_key: string;
    assignee: ITaskAssigneeRequest[]; 
}
export interface ITaskAssigneeRequest {
    participant_type_key: string;
    participant_hash: string;
}