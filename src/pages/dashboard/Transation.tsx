import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { useEffect, useMemo, useState } from "react";
import { UserType } from "../../model/user";
import { LocalStorage } from "../../util/LocalStorage";
import { TransactionApi } from "../../api/Transaction.api";
import { Transaction } from '../../model/transation';

export default function Transation() {

    const person = LocalStorage.getItemPerson();
    const isProvider = person.type == UserType.PROVIDER;
    const isCustomer = person.type == UserType.CUSTOMER;

    const [transations, setTransactions] = useState<Transaction[]>([]);

    const transationApi = useMemo(() => new TransactionApi(), []);

    const findAll = async () => {
        const customer = await LocalStorage.getItemUserType();
        const provider = await LocalStorage.getItemUserType();
        
        if(isCustomer){
            await transationApi.customer(customer.id).then(({data})=>{
                setTransactions(data);
            })
        }

        if(isProvider){
            await transationApi.provider(provider.id).then(({data})=>{
                setTransactions(data);
            })  
        }
    }

    useEffect(()=>{
        findAll();
    },[]);

    return (
        <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
                <TableHead>
                    <TableRow>
                        <TableCell>Serviço</TableCell>
                        <TableCell>Prestador</TableCell>
                        <TableCell>Cliente</TableCell>
                        <TableCell>Saldo em carteira</TableCell>
                        <TableCell>Valor Final</TableCell>
                        <TableCell>Preço</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {transations.map((row) => (
                        <TableRow key={row.id}>
                            <TableCell> {row.job.title}</TableCell>
                            <TableCell> {row.job.provider.user.fullName}</TableCell>
                            <TableCell> {row.customer.user.fullName}</TableCell>
                            <TableCell> {row.valueInitial}</TableCell>
                            <TableCell>{row.valueFinal}</TableCell>
                            <TableCell>{row.priceJob}</TableCell>                            
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    )
}