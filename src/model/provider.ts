import { User } from "./user";

export interface Provider {
    id: string;
    user: User;
}