import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { Button } from '@mui/material';
import { LocalStorage } from '../util/LocalStorage';
import { UserType } from '../model/user';

interface TableJobProps {
    rows: any[];
    onUpdate: (event: any) => void;
    onDelete: (event: any) => void;
    onContract: (event: any) => void;
}

export default function TableJob({
    rows,
    onUpdate,
    onDelete,
    onContract,
}: TableJobProps) {

    const person = LocalStorage.getItemPerson();
    const isProvider = person.type == UserType.PROVIDER;
    const isCustomer = person.type == UserType.CUSTOMER;

    return (
        <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
                <TableHead>
                    <TableRow>
                        <TableCell>Título</TableCell>
                        <TableCell>Preço</TableCell>
                        <TableCell>Descrição</TableCell>
                        <TableCell colSpan={person.type == UserType.CUSTOMER ? 1 : 2} align='center'>Acções</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {rows.map((row) => (
                        <TableRow key={row.id}>
                            <TableCell> {row.title}</TableCell>
                            <TableCell>{row.price}</TableCell>
                            <TableCell>{row.description}</TableCell>
                            {isProvider && (
                                <>
                                    <TableCell align='center'>
                                        <Button color='warning' onClick={() => { onUpdate(row) }}>Editar</Button>
                                    </TableCell>
                                    <TableCell align='center'>
                                        <Button color='error' onClick={() => { onDelete(row) }}>Eliminar</Button>
                                    </TableCell>
                                </>
                            )}
                            {isCustomer && person.balance >= row.price && (
                                <TableCell align='center'>
                                    <Button color='warning' onClick={() => { onContract(row) }}>Contratar</Button>
                                </TableCell>
                            )}
                            {isCustomer && person.balance < row.price && (
                                <TableCell align='center'>
                                    <div>-------------</div>
                                </TableCell>
                            )}                            
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
}