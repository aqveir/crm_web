import { IUser } from '../../interfaces/user/user.interface';
//import { IOrder } from '../../interfaces/order/order.interface';
import { INote } from '../../interfaces/note/note.interface';
import { IDocument } from '../../interfaces/document/document.interface';

export class RequestUser {
}
export class ResponseUser implements IUser {
    hash: string;
    name_initials: string;
    full_name: string;
    last_updated_at: Date;
}
