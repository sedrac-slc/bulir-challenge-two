import { Button } from "@mui/material";
import FormAppLayout, { TypeForm } from "../layout/FormAppLayout";
import FormUser from "../components/FormUser";
import { Link, useNavigate } from "react-router-dom";
import { useMemo } from "react";
import { LocalStorage } from "../util/LocalStorage";
import { STATUS_UNAUTHORIZED } from "../util/environment";
import { SweetAlert } from "../util/SweetAlert";
import { RegisterApi } from "../api/Register.api";
import { UserInit } from "../util/UserInit";

export default function Register() {

    const navigate = useNavigate();

    const registerRequest = useMemo(()=>new RegisterApi(),[]);
  
    const submit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
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
        })
    }

    return (
        <form onSubmit={submit} id="fom">
            <FormAppLayout title="Faça o cadastramento" typeForm={TypeForm.REGISTER}>
                <div className="flex flex-col gap-7">
                    <FormUser isDisabled={false} isShowPassword={true} person={UserInit.getPerson}/>
                </div>
                <Link to="/login">Já tenho uma conta!</Link>
                <Button variant="contained" className="block" type="submit">
                    Criar conta
                </Button>
            </FormAppLayout>
        </form>
    )
}