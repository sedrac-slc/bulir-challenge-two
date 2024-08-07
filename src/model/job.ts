import { Provider } from "./provider";

export interface Job{
    id: string;
    price: number;
    title: string;
    description: string;
    provider: Provider;
}