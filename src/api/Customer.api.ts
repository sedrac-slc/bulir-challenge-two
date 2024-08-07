import axios from "axios";
import { Customer } from "../model/Customer";
import AbstractApi from "./abstract.api";

export class CustomerApi extends AbstractApi{
    endpoint: string = "customers";
    
    async findAll() {
        return await axios.get<Customer[]>(`${this.BASE_URL}/${this.endpoint}`, this.getHeaders());
    }

    async findByUser(id: string) {
        return await axios.get<Customer>(`${this.BASE_URL}/${this.endpoint}/user/${id}`, this.getHeaders());
    }  

    async save(parm: any) {
        return await axios.post<Customer>(`${this.BASE_URL}/${this.endpoint}`, parm , this.getHeaders());
    }

    async update(id: string, parm: any) {
        return await axios.put<Customer>(`${this.BASE_URL}/${this.endpoint}/${id}`, parm , this.getHeaders());
    }    

    async remove(id: string) {
        return await axios.delete(`${this.BASE_URL}/${this.endpoint}/${id}`,this.getHeaders());
    } 

}