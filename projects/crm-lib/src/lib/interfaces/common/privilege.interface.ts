export interface IPrivilege {
    key: string;
    display_value: string;
    description?: string;
    is_active?: boolean;
    is_secure?: boolean;
    last_updated_at?: Date;
}