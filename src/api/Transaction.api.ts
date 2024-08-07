import axios from "axios";
import AbstractApi from "./abstract.api";
import { Transaction } from "../model/transation";

export class TransactionApi extends AbstractApi{
    endpoint: string = "transaction-history";

    async customer(id: string){
        return await axios.get<Transaction[]>(`${this.BASE_URL}/${this.endpoint}/${id}/customer`, this.getHeaders());
    }

    async provider(id: string){
        return await axios.get<Transaction[]>(`${this.BASE_URL}/${this.endpoint}/${id}/provider`, this.getHeaders());
    }    

}