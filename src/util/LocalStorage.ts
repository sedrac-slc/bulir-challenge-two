export class LocalStorage {

    static KEY_TOKEN: string = 'access_token';
    static KEY_PERSON: string = 'person_token';
    static KEY_PERSON_TYPE: string = 'person_type';

    static setItemToken(value: any) {
        localStorage.setItem(this.KEY_TOKEN, value.toString());
    }

    static getItemToken() {
        return localStorage.getItem(this.KEY_TOKEN);
    }

    static getItemUserType() {
        const person: any = localStorage.getItem(this.KEY_PERSON_TYPE)
        return JSON.parse(person);
    }

    static setItemPerson(value: any) {
        localStorage.setItem(this.KEY_PERSON, JSON.stringify(value));
    }

    static setItemUserType(value: any) {
        localStorage.setItem(this.KEY_PERSON_TYPE, JSON.stringify(value));
    }

    static getItemPerson() {
        const person: any = localStorage.getItem(this.KEY_PERSON);
        return JSON.parse(person);
    }

}