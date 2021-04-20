import { IContactAddress } from './contact-address.interface';
import { IContactDetail } from './contact-detail.interface';
//import { IOrder } from '../order/order.interface';
import { INote } from '../note/note.interface';
import { IDocument } from '../document/document.interface';

// Export interfaces used into other services
export * from './contact-detail.interface';
export * from './contact-address.interface';

export interface IContact {
    id?: number;

    avatar: string;
    hash: string;
    name_initials: string;
    full_name: string;
    last_updated_at: Date;
    details: IContactDetail[];
    addresses: IContactAddress[];
    notes: INote[];
    documents: IDocument[];
}

export interface IContactMinimal {
    avatar: string;
    hash: string;
    name_initials: string;
    full_name: string;
    last_updated_at: Date;
}