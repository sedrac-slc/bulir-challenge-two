import axios from "axios";
import AbstractApi from "./abstract.api";
import { Provider } from "../model/provider";

export class ProviderApi extends AbstractApi{
    endpoint: string = "providers";
    
    async findAll() {
        return await axios.get<Provider[]>(`${this.BASE_URL}/${this.endpoint}`, this.getHeaders());
    }

    async findByUser(id: string) {
        return await axios.get<Provider>(`${this.BASE_URL}/${this.endpoint}/user/${id}`, this.getHeaders());
    }

    async save(parm: any) {
        return await axios.post<Provider>(`${this.BASE_URL}/${this.endpoint}`, parm , this.getHeaders());
    }

    async update(id: string, parm: any) {
        return await axios.put<Provider>(`${this.BASE_URL}/${this.endpoint}/${id}`, parm , this.getHeaders());
    }    

    async remove(id: string) {
        return await axios.delete(`${this.BASE_URL}/${this.endpoint}/${id}`,this.getHeaders());
    } 

}