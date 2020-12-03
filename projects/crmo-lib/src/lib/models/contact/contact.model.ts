import { IContact } from '../../interfaces/contact/contact.interface';
import { IContactAddress } from '../../interfaces/contact/contact-address.interface';
import { IContactDetail } from '../../interfaces/contact/contact-detail.interface';
//import { IOrder } from '../../interfaces/order/order.interface';
import { INote } from '../../interfaces/note/note.interface';
import { IDocument } from '../../interfaces/document/document.interface';

export class RequestContact {
}
export class ResponseContact implements IContact {
    hash: string;
    name_initials: string;
    full_name: string;
    last_updated_at: Date;
    addresses: IContactAddress[];
    details: IContactDetail[];
    //orders: IOrder[];
    notes: INote[];
    documents: IDocument[];
}
