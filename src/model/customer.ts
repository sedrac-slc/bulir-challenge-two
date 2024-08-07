import { User } from "./user";

export interface Customer {
    id: string;
    user: User; 
    balance: number;
}