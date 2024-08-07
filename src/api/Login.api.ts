import axios from "axios";
import AbstractApi from "./abstract.api";
import { LocalStorage } from "../util/LocalStorage";

export class LoginApi extends AbstractApi{

    sign(email: string, password: string) {
        return axios.post(`${this.BASE_URL}/auth`, { email: email, password: password });
    }

    verifyToken(){
        const token = LocalStorage.getItemToken();
        return axios.post(`${this.BASE_URL}/auth/verify-token`, {
            token: token
        });
    }

}