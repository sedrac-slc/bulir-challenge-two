export enum UserType {
    CUSTOMER = 'CUSTOMER',
    PROVIDER = 'PROVIDER',
}

export interface User{
    id: string;
    fullName: string;
    nif: string;
    email: string;
    password: string;
    balance: number;
    type: UserType;
    createdAt: Date;
    updatedAt: Date;
}