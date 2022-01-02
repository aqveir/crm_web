import { ILookupValue } from '../common/lookup.interface';
import { IContactAddress, IContactAddressRequest } from './contact-address.interface';
import { IContactDetail, IContactDetailRequest } from './contact-detail.interface';
import { INote } from '../note/note.interface';
import { IDocument } from '../document/document.interface';
import { IServiceRequestMinimal } from '../service-request/service-request.interface';
//import { IOrder } from '../order/order.interface';

// Export interfaces used into other services
export * from './contact-detail.interface';
export * from './contact-address.interface';

export interface IContact {
    id: number;
    avatar: string;
    hash: string;
    name_initials: string;
    full_name: string;

    first_name: string;
    middle_name: string;
    last_name: string;
    date_of_birth_at: Date;

    type: ILookupValue;
    gender: ILookupValue;
    group: ILookupValue;
    status: ILookupValue;

    is_verified: boolean;
    is_active: boolean;
    last_updated_at: Date;

    details: IContactDetail[];
    addresses: IContactAddress[];
    notes: INote[];
    documents: IDocument[];
    service_requests: IServiceRequestMinimal[];

    notes_count: number;
    documents_count: number;
    service_requests_count: number;
}

export interface IContactMinimal {
    avatar: string;
    hash: string;
    name_initials: string;
    full_name: string;
    type: ILookupValue;
    last_updated_at: Date;
}

export interface IContactRequest {
    avatar: any;

    first_name: string;
    middle_name: string;
    last_name: string;
    date_of_birth_at: Date;

    type_key: string;
    gender_key: string;
    group_key: string;
    status_key: string;

    is_active: boolean;

    details: IContactDetailRequest[];
    addresses: IContactAddressRequest[];
}