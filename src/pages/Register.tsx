import { Button, CircularProgress } from "@mui/material";
import FormAppLayout, { TypeForm } from "../layout/FormAppLayout";
import FormUser from "../components/FormUser";
import { Link, useNavigate } from "react-router-dom";
import { useMemo, useState } from "react";
import { LocalStorage } from "../util/LocalStorage";
import { STATUS_UNAUTHORIZED } from "../util/environment";
import { SweetAlert } from "../util/SweetAlert";
import { RegisterApi } from "../api/Register.api";
import { UserInit } from "../util/UserInit";

export default function Register() {

    const navigate = useNavigate();
    const [loading, setLoading] = useState<boolean>(false);
    const registerRequest = useMemo(()=>new RegisterApi(),[]);
  
    const submit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        setLoading(true);
        const formData = new FormData(event.currentTarget);
        const person = {
            fullName: formData.get("fullName"),
            password: formData.get("password"),
            type: formData.get("userType"),
            email: formData.get("email"),
            nif: formData.get("nif")
        }

        await registerRequest.register(person).then(({ data }) => {
            LocalStorage.setItemToken(data.access_token);
            LocalStorage.setItemPerson(data.user);
            navigate('/dashboard');
        }).catch((error)=>{
            if (error.response?.status == STATUS_UNAUTHORIZED) {
                SweetAlert.error("Falha na criação da conta", "Não foi possível criar a conta, tenta novamente!", "Entendido");
                return;
            }
        }).finally(() => {
            setLoading(false);
        });
    }

    return (
        <form onSubmit={submit} id="fom">
            <FormAppLayout title="Faça o cadastramento" typeForm={TypeForm.REGISTER}>
                <div className="flex flex-col gap-7">
                    <FormUser isDisabled={false} isShowPassword={true} person={UserInit.getPerson}/>
                </div>
                <Link to="/login">Já tenho uma conta!</Link>
                <Button variant="outlined" className="block" type="submit">
                    {loading ? <CircularProgress size={24} /> : "Criar conta"}
                </Button>
            </FormAppLayout>
        </form>
    )
}