import { ILookupValue } from '../common/lookup.interface';
import { IUser } from '../user/user.interface';

export interface IDocument {
    hash: string;
    title: string;
    description: string;
    file_name: string;
    file_extn: string;
    file_size_in_kb: number;
    last_updated_at: Date;

    type?: ILookupValue;
    owner?: IUser;
}

export interface IDocumentMinimal {
    hash: string;
    title: string;
    file_name: string;
    file_extn: string;
    file_size_in_kb: number;
    last_updated_at: Date;
}

export interface IDocumentRequest {
    entity_type: string;
    reference_id: number;
    title: string;
    description?: string;
}