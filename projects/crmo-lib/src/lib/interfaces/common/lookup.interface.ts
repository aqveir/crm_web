export interface ILookup {
    key: string;
    display_value: string;
    is_editable?: boolean;
    is_active?: boolean;
    values?: ILookupValue[];
}

export interface ILookupValue {
    id: number;
    key: string;
    display_value: string;
    is_editable?: boolean;
    is_active?: boolean;
}