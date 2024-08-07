import axios from "axios";
import AbstractApi from "./abstract.api";
import { Job } from "../model/job";

export class JobApi extends AbstractApi{
    endpoint: string = "jobs";
    
    async findAll() {
        return await axios.get<Job[]>(`${this.BASE_URL}/${this.endpoint}`, this.getHeaders());
    }

    async save(parm: any) {
        return await axios.post<Job>(`${this.BASE_URL}/${this.endpoint}`, parm , this.getHeaders());
    }

    async update(id: string, parm: any) {
        return await axios.put<Job>(`${this.BASE_URL}/${this.endpoint}/${id}`, parm , this.getHeaders());
    }    

    async remove(id: string) {
        return await axios.delete(`${this.BASE_URL}/${this.endpoint}/${id}`,this.getHeaders());
    } 

    async hiring(parm: any) {
        return await axios.post<Job>(`${this.BASE_URL}/${this.endpoint}/hiring`, parm , this.getHeaders());
    }    
}