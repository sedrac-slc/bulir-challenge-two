import { Customer } from "./Customer";
import { Job } from "./job";
import { Provider } from "./provider";

export interface Transaction{
    id: string;
    job: Job;
    provider: Provider;
    customer: Customer;
    valueInitial: number;
    valueFinal: number;
    priceJob: number;
}