import React from "react";
import { LocalStorage } from "./LocalStorage";

export function createUser(event: React.FormEvent<HTMLFormElement>){
    const formData = new FormData(event.currentTarget);
    return {
        fullName: formData.get("fullName"),
        password: formData.get("password"),
        balance: formData.get("balance"),
        confirm: formData.get("confirm"),
        type: formData.get("userType"),
        email: formData.get("email"),
        nif: formData.get("nif"),
    }
}

export function createJob(event: React.FormEvent<HTMLFormElement>){
    const formData = new FormData(event.currentTarget);
    const person: any = LocalStorage.getItemUserType();
    return {
        title: formData.get("title"),
        description: formData.get("description"),
        price: formData.get("price"),
        provider: person.id,
    }
}