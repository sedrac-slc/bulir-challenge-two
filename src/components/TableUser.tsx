import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { Button } from '@mui/material';
import { UserType } from '../model/user';

interface TableUserProps{
    rows: any[];
    onUpdate: (event: any) => void;
    onDelete: (event: any) => void;
    userType: string;
}

export default function TableUser({
    rows,
    onUpdate,
    onDelete,
    userType
}: TableUserProps) {
    return (
        <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
                <TableHead>
                    <TableRow>
                        <TableCell>Nome</TableCell>
                        <TableCell>Email</TableCell>
                        <TableCell>Bilhete</TableCell>
                        {userType == UserType.CUSTOMER && (
                            <TableCell>Balance</TableCell>
                        )}
                        <TableCell colSpan={2} align='center'>Acções</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {rows.map((row) => (
                        <TableRow key={row.id}>
                            <TableCell> {row.user.fullName}</TableCell>
                            <TableCell>{row.user.email}</TableCell>
                            <TableCell>{row.user.nif}</TableCell>
                            { userType == UserType.CUSTOMER && (
                                <TableCell>{row.balance}</TableCell>
                            )}
                            <TableCell align='center'>
                                <Button color='warning' onClick={() => { onUpdate(row) }}>Editar</Button>
                            </TableCell>
                            <TableCell align='center'>
                                <Button color='error' onClick={() => { onDelete(row) }}>Eliminar</Button>
                            </TableCell>                            
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
}
