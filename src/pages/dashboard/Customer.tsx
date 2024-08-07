import { useEffect, useMemo, useState } from "react";
import DialogUser from "../../components/DialogUser";
import TableUser from "../../components/TableUser";
import { Customer as CustomerModel } from "../../model/Customer";
import { CustomerApi } from "../../api/Customer.api";
import { UserType } from "../../model/user";
import { createUser } from "../../util/FormDataUtil";
import { SweetAlert } from "../../util/SweetAlert";
import { STATUS_CONFLIT } from "../../util/environment";
import { ActionForm } from "../../util/ActionForm";
import { UserInit } from "../../util/UserInit";

export default function Customer() {
    const [open, setOpen] = useState(false);
    const [title, setTitle] = useState<string>('Adicionar');
    const [person, setPerson] = useState(UserInit.getCustomer);
    const [customers, setCustomers] = useState<CustomerModel[]>([]);

    const customerApi = useMemo(() => new CustomerApi(), []);

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

            await customerApi.save(parameters).then(({ data }) => {
                setCustomers([data, ...customers]);
            }).catch((error) => {
                if (error.response?.status == STATUS_CONFLIT) {
                    SweetAlert.error("Conflito nas informações", error.response.data.message, "Entendido");
                    return;
                }
            })

        }else if(title == ActionForm.UPDATE){

            await customerApi.update(person.id, parameters).then(({ data }) => {
                setCustomers([data, ...customers.filter( (i) => i.id != person.id ) ]);
            }).catch((error) => {
                if (error.response?.status == STATUS_CONFLIT) {
                    SweetAlert.error("Conflito nas informações", error.response.data.message, "Entendido");
                    return;
                }
            })

        }else if(title == ActionForm.DELETE){

            await customerApi.remove(person.id).then((_) => {
                setCustomers([ ...customers.filter( (i) => i.id != person.id ) ]);
            }).catch((_) => {
                SweetAlert.error("Falha no processo de eliminação", "Não foi possível eliminar o cliente, verifica se o cliente já tem transações realizadas");
            })

        }

    }

    const changeValues = (row: any) => {
        const user = row.user
        user.balance = row.balance;
        user.type = UserType.CUSTOMER;
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
        await customerApi.findAll().then(({ data }) => { setCustomers(data); })
    }

    useEffect(() => { findAll(); }, []);

    return (
        <div>
            <DialogUser title={title} person={person} onSubmit={onSubmit} userType={UserType.CUSTOMER}
                isOpen={open} onOpen={handleClickOpen} onClosed={handleClose} isShowPassword={title == ActionForm.CREATE}
            />
            <div className="mt-4">
                <TableUser rows={customers} onUpdate={onUpdate} onDelete={onDelete} userType={UserType.CUSTOMER}/>
            </div>
        </div>
    )
}