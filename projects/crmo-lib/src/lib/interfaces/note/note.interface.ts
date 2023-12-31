import { ILookupValue } from '../common/lookup.interface';
import { IUser } from '../user/user.interface';

export interface INote {
    note: string;

    id?: number;
    entity_type?: string;
    reference_id?: number;
    last_updated_at?: Date;

    type?: ILookupValue;
    owner?: IUser;
}