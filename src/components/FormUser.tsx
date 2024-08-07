import { FormControl, InputLabel, MenuItem, Select, TextField } from "@mui/material";
import { useState } from "react";

export enum TypeUser {
    CUSTOMER = 'CUSTOMER',
    PROVIDER = 'PROVIDER',
}

export enum TypeUserPage {
    CUSTOMER = 'CUSTOMER',
    PROVIDER = 'PROVIDER',
    REGISTER = 'REGISTER'
}

interface FormUserPros {
    isDisabled: boolean,
    isShowPassword: boolean,
    person: any
}

export default function FormUser({
    isDisabled,
    isShowPassword,
    person
}: FormUserPros) {

    const [confirm, setConfirm] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [nif, setNif] = useState<string>(person.nif ?? '');
    const [email, setEmail] = useState<string>(person.email ?? '');
    const [userType, setUserType] = useState<string>(person.type ?? '');
    const [balance, setBalance] = useState<string>(person.balance ?? '');
    const [fullName, setFullName] = useState<string>(person.fullName ?? '');

    return (
        <div className="flex flex-col gap-5">
            <FormControl fullWidth>
                <InputLabel id="demo-simple-select-label">Tipo usuário</InputLabel>
                <Select labelId="demo-simple-select-label" id="userType" name="userType" label="Tipo usuário" value={userType} onChange={(e) => setUserType(e.target.value)} disabled={isDisabled}>
                    <MenuItem value={TypeUser.CUSTOMER}>Cliente</MenuItem>
                    <MenuItem value={TypeUser.PROVIDER}>Provedor</MenuItem>
                </Select>
            </FormControl>
            <TextField id="outlined-fullname" name="fullName" label="Digita o seu nome completo:" value={fullName} onChange={(e) => setFullName(e.target.value)} required disabled={isDisabled} />
            <TextField id="outlined-email" name="email" label="Digita o seu nome email:" type="email" value={email} onChange={(e) => setEmail(e.target.value)} required disabled={isDisabled} />
            <TextField id="outlined-nif" name="nif" label="Digita o bilhete de identidade:" value={nif} onChange={(e) => setNif(e.target.value)} required disabled={isDisabled} />
            {TypeUser.CUSTOMER == userType && (
                <TextField id="outlined-balance" name="balance" label="Digita o saldo:" type="number" value={balance} onChange={(e) => setBalance(e.target.value)} disabled={isDisabled} />
            )}
            {isShowPassword && (
                <>
                    <TextField id="outlined-password" name="password" label="Digita a sua senha" type="password" value={password} onChange={(e) => setPassword(e.target.value)} autoComplete="current-password" />
                    <TextField id="outlined-confirm" name="confirm" label="Confirma a senha" type="password" value={confirm} onChange={(e) => setConfirm(e.target.value)} autoComplete="current-confirm" />
                </>
            )}
        </div>
    )
}