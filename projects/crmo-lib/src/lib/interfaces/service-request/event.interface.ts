import { ILookupValue } from '../common/lookup.interface'
import { IContactMinimal } from '../contact/contact.interface'
import { IUserMinimal } from '../user/user.interface'
import { IServiceRequestMinimal } from './service-request.interface'

export interface IEventMinimal {
    id: number;
    subject: string;
    location: string;
    start_at: Date;
    end_at: Date;
    last_updated_at: Date;
    type: ILookupValue;
    subtype: ILookupValue;
    servicerequest: IServiceRequestMinimal;
    owner: IUserMinimal;
    participants: IParticipant[];
}

export interface IEvent {
    id: number;
    subject: string;
    description: string;
    location: string;
    start_at: Date;
    end_at: Date;
    last_updated_at: Date;
    type: ILookupValue;
    subtype: ILookupValue;
    servicerequest: IServiceRequestMinimal;
    owner: IUserMinimal;
    participants: IParticipant[];
}

export interface IParticipant {
    type: ILookupValue;
    participant: IUserMinimal|IContactMinimal;
}

export interface IEventRequest {
    sr_hash: string;
    subject: string;
    description: string;
    location: string;
    start_at: Date;
    end_at: Date;
    subtype_key: string;
    participants: IParticipantRequest[];
}
export interface IParticipantRequest {
    participant_type_key: string;
    participant_hash: string;
}