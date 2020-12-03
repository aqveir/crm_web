export interface IOrganization {
    hash: string;
    name: string;
    users_count: number;
    last_updated_at: Date;
}

export interface IOrganizationMinimal {
    hash: string;
    name: string;
    users_count: number;
    last_updated_at: Date;
}
