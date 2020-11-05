import { IContactAddress } from './contact-address.interface';
import { IContactDetail } from './contact-detail.interface';
//import { IOrder } from '../order/order.interface';
import { INote } from '../note/note.interface';
import { IDocument } from '../document/document.interface';

export interface IContact {
    hash: string;
    name_initials: string;
    full_name: string;
}