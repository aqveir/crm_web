
export interface IPaymentMethod {
    id: string;
    customer: string;
    type: string;
    billing_details: IBillingDetails;
    card?: ICard;
    metadata: [];
    is_default: boolean;
}

export interface IBillingDetails {
    name: string;
    phone: string;
    email: string;
    address: IBillingDetailsAddress;
}

interface IBillingDetailsAddress {
    city: string;
    country: string;
    line1: string;
    line2: string;
    postal_code: string;
    state: string;
}

export interface ICard {
    brand: string;
    country: string;
    exp_month: number;
    exp_year: number;
    fingerprint: string;
    funding: string;
    last4: string;
}



