import { useEffect, useMemo, useState } from "react";
import DialogUser from "../../components/DialogUser";
import TableUser from "../../components/TableUser";
import { UserType } from "../../model/user";
import { createUser } from "../../util/FormDataUtil";
import { SweetAlert } from "../../util/SweetAlert";
import { STATUS_CONFLIT } from "../../util/environment";
import { ActionForm } from "../../util/ActionForm";
import { Provider as ProviderModel } from "../../model/provider";
import { ProviderApi } from "../../api/Provider.api";
import { UserInit } from "../../util/UserInit";

export default function Provider() {
    const [open, setOpen] = useState(false);
    const [title, setTitle] = useState<string>(ActionForm.CREATE);
    const [person, setPerson] = useState(UserInit.getProvider);
    const [providers, setProviders] = useState<ProviderModel[]>([]);

    const providerApi = useMemo(() => new ProviderApi(), []);

    const handleClickOpen = () => {
        setOpen(true);
        setTitle(ActionForm.CREATE);
    }

    const handleClose = () => setOpen(false);

    /** START CRUD **/
    const onSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const parameters = createUser(event);
        setOpen(false);

        if (title == ActionForm.CREATE) {

            await providerApi.save(parameters).then(({ data }) => {
                setProviders([data, ...providers]);
            }).catch((error) => {
                if (error.response?.status == STATUS_CONFLIT) {
                    SweetAlert.error("Conflito nas informações", error.response.data.message, "Entendido");
                    return;
                }
            })

        }else if(title == ActionForm.UPDATE){

            await providerApi.update(person.id, parameters).then(({ data }) => {
                setProviders([data, ...providers.filter( (i) => i.id != person.id )]);
            }).catch((error) => {
                if (error.response?.status == STATUS_CONFLIT) {
                    SweetAlert.error("Conflito nas informações", error.response.data.message, "Entendido");
                    return;
                }
            })

        }else if(title == ActionForm.DELETE){

            await providerApi.remove(person.id).then((_) => {
                setProviders([ ...providers.filter( (i) => i.id != person.id ) ]);
            }).catch((_) => {
                SweetAlert.error("Falha no processo de eliminação", "Não foi possível eliminar o cliente, verifica se o cliente já tem transações realizadas");
            })

        }

    }

    const changeValues = (row: any) => {
        const user = row.user
        user.type = UserType.PROVIDER;
        user.id = row.id;
        setPerson(user);
        setOpen(true);
    }

    const onUpdate = (row: any) => {
        changeValues(row);
        setTitle(ActionForm.UPDATE);
    }

    const onDelete = (row: any) => {
        changeValues(row);
        setTitle(ActionForm.DELETE);
    }
    /** END CRUD **/

    const findAll = async () => {
        await providerApi.findAll().then(({ data }) => { setProviders(data); })
    }

    useEffect(() => { findAll(); }, []);

    return (
        <div>
            <DialogUser title={title} person={person} onSubmit={onSubmit} userType={UserType.PROVIDER}
                isOpen={open} onOpen={handleClickOpen} onClosed={handleClose} isShowPassword={title == ActionForm.CREATE}
            />
            <div className="mt-4">
                <TableUser rows={providers} onUpdate={onUpdate} onDelete={onDelete} userType={UserType.PROVIDER}/>
            </div>
        </div>
    );
}