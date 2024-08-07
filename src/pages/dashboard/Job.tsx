
import { CustomerApi } from '../../api/Customer.api';
import { ProviderApi } from '../../api/Provider.api';
import DialogJob from '../../components/DialogJob';
import { ActionForm } from '../../util/ActionForm';
import { useEffect, useMemo, useState } from 'react';
import { LocalStorage } from '../../util/LocalStorage';
import { UserType } from '../../model/user';
import TableJob from '../../components/TableJob';
import { createJob } from '../../util/FormDataUtil';
import { JobApi } from '../../api/Job.api';
import { Job as JobModel } from '../../model/job';
import { SweetAlert } from '../../util/SweetAlert';
import { STATUS_CONFLIT } from '../../util/environment';
import { JobInit } from '../../util/JobInit';

export default function Job() {
    const [open, setOpen] = useState(false);
    const [title, setTitle] = useState<string>("Adicionar");
    const [jobs, setJobs] = useState<JobModel[]>([]);

    const [model, setModel] = useState(JobInit.getJob);

    const jobApi = useMemo(() => new JobApi(), []);
    const customerApi = useMemo(() => new CustomerApi(), []);
    const providerApi = useMemo(() => new ProviderApi(), []);

    const handleClickOpen = () => {
        setOpen(true);
        setTitle(ActionForm.CREATE);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const onSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const parameters = createJob(event);
        setOpen(false);

        if (title == ActionForm.CREATE) {
            await jobApi.save(parameters).then(({ data }) => {
                setJobs([data, ...jobs]);
            }).catch((error) => {
                if (error.response?.status == STATUS_CONFLIT) {
                    SweetAlert.error("Conflito nas informações", error.response.data.message, "Entendido");
                    return;
                }
            })
        } else if (title == ActionForm.UPDATE) {
            await jobApi.update(model.id, parameters).then(({ data }) => {
                setJobs([data, ...jobs.filter((i) => i.id != model.id)]);
            }).catch((error) => {
                if (error.response?.status == STATUS_CONFLIT) {
                    SweetAlert.error("Conflito nas informações", error.response.data.message, "Entendido");
                    return;
                }
            })
        } else if (title == ActionForm.DELETE) {
            await jobApi.remove(model.id).then((_) => {
                setJobs([...jobs.filter((i) => i.id != model.id)]);
            }).catch((_) => {
                SweetAlert.error("Falha no processo de eliminação", "Não foi possível eliminar o cliente, verifica se o cliente já tem transações realizadas");
            })
        }
    }

    const changeValues = (row: any) => {
        setModel(row);
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

    const onContract  = (row: any) => {
        SweetAlert.confirmDialog("Contratação de serviço?", "O preço do serviço será retirado do saldo em carteira",
            async () => {
                const customer = await LocalStorage.getItemUserType();
                await jobApi.hiring({ job: row.id, customer: customer.id }).then((_) => {
                    SweetAlert.success("Contratação realizada","O serviço foi contratado com sucesso")
                }).catch((_)=>{
                    SweetAlert.success("Falha na contratação","Não foi possível a contratação deste serviço")
                })
            }
        )
    }

    const findUserType = async () => {
        const person = LocalStorage.getItemPerson();
        const fecthPromise = person.type == UserType.CUSTOMER
            ? customerApi.findByUser(person.id)
            : providerApi.findByUser(person.id);

        await fecthPromise.then(({ data }) => {
            LocalStorage.setItemUserType(data);
        })
    }

    const findAll = async () => {
        await jobApi.findAll().then(({ data }) => { setJobs(data); })
    }

    useEffect(() => {
        findAll();
        findUserType();
    }, []);

    const person = LocalStorage.getItemPerson();
    const isProvider = person.type == UserType.PROVIDER;

    return (
        <div>
            {isProvider && (
                <DialogJob person={model} isOpen={open} onSubmit={onSubmit} titleForm={title} onOpen={handleClickOpen} onClosed={handleClose} />
            )}
            <div className="mt-4">
                <TableJob rows={jobs} onUpdate={onUpdate} onDelete={onDelete} onContract={onContract} />
            </div>
        </div>
    )
}