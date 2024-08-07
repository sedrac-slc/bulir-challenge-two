import { UserType } from "../model/user";
import { LocalStorage } from "./LocalStorage";

export class UserInit {

    
    static getPerson = {
        id: '',
        fullName: '',
        nif: '',
        email: '',
        type: '',
    }

    static getCustomer = {
        id: '',
        fullName: '',
        nif: '',
        email: '',
        type: UserType.CUSTOMER,
    }

    static getProvider = {
        id: '',
        fullName: '',
        nif: '',
        email: '',
        type: UserType.PROVIDER,
    }

    static isCustomer(){
        const person = LocalStorage.getItemPerson();
        return person.type == UserType.CUSTOMER;
    }

}