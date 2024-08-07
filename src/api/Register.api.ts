
import axios from "axios";
import AbstractApi from "./abstract.api";

export class RegisterApi extends AbstractApi{

    async register(person: any){
        return await axios.post(`${this.BASE_URL}/register`,person);
    }

}