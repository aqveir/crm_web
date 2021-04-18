import { IPrivilege } from './privilege.interface';

export interface IRole {
    key: string;
    display_value: string;
    description?: string;
    is_active?: boolean;
    last_updated_at?: Date;
    privileges?: IPrivilege[];
}