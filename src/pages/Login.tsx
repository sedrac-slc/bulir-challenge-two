import { Button, Checkbox, FormControlLabel, TextField } from "@mui/material";
import FormAppLayout, { TypeForm } from "../layout/FormAppLayout";
import { Link, useNavigate } from "react-router-dom";
import { useMemo, useState } from "react";
import { LoginApi } from "../api/Login.api";
import { LocalStorage } from "../util/LocalStorage";
import { STATUS_UNAUTHORIZED } from "../util/environment";
import { SweetAlert } from "../util/SweetAlert";

export default function Login() {

    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');    

    const navigate = useNavigate();
    const loginApi = useMemo(() => new LoginApi(),[]);

    const login = () => {
        loginApi.sign(email, password).then(function ({ data }) {
          LocalStorage.setItemToken(data.access_token);
          LocalStorage.setItemPerson(data.user);
          navigate("/dashboard");
        }).catch(function (error) {
          if (error.response?.status == STATUS_UNAUTHORIZED) {
            SweetAlert.error("Falha no login", "Não foi possível fazer o login com as credências fornecidas, tenta novamente!", "Entendido");
            return;
          }
        });
    }

    return (
        <FormAppLayout title="Faça autenticação" typeForm={TypeForm.LOGIN}>
            <div className="flex flex-col gap-7">
                <TextField id="outlined-required" type="email" label="Digita o seu email" value={email} onChange={(e) => setEmail(e.target.value)} required />
                <TextField id="outlined-password-input" label="Digita a sua senha" type="password" value={password} onChange={(e) => setPassword(e.target.value)} autoComplete="current-password" required />
            </div>
            <div className="flex justify-between items-center">
                <FormControlLabel control={<Checkbox defaultChecked />} label="Lembra-se de mí" />
                <Link to="/register">Não tenho uma conta!</Link>
            </div>
            <Button variant="contained" className="block" onClick={login}>
                Login para a conta
            </Button>
        </FormAppLayout>
    )
}