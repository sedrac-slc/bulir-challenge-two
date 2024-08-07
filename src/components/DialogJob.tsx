import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import { TextareaAutosize, TextField } from '@mui/material';
import { useState } from 'react';

interface DialogJobProps {
    onSubmit: (event: React.FormEvent<HTMLFormElement>) => void;
    titleForm: string;
    isOpen: boolean;
    onOpen: () => void;
    onClosed: () => void;
    person: any,
}

export default function DialogJob({
    onSubmit,
    titleForm,
    isOpen,
    onOpen,
    onClosed,
    person,
}: DialogJobProps) {

    const [title, setTitle] = useState<string>(person.title)
    const [price, setPrice] = useState<string>(person.price);
    const [description, setDescription] = useState<string>(person.description);

    return (
        <>
            <Button variant="outlined" onClick={onOpen}>
                Adicionar
            </Button>
            <Dialog fullScreen open={isOpen} onClose={onClosed} PaperProps={{ component: 'form', onSubmit: onSubmit }}>
                <DialogTitle>{titleForm}</DialogTitle>
                <DialogContent>
                    <div className='mt-4 flex flex-col gap-5'>
                        <TextField id="outlined-title" name="title" label="Digita o titulo:" value={title} onChange={(e) => setTitle(e.target.value)} required />
                        <TextField id="outlined-price" name="price" label="Digita o preço:" type="number" value={price} onChange={(e) => setPrice(e.target.value)} required />
                        <TextareaAutosize name="description" placeholder="Descrição" value={description}  onChange={(e) => setDescription(e.target.value)} minRows={3} className='border border-gray-300 p-2 rounded'/>
                    </div>
                </DialogContent>
                <DialogActions>
                    <Button color='primary' type="submit">Confirma</Button>
                    <Button color='error' onClick={onClosed}>Cancelar</Button>
                </DialogActions>
            </Dialog>
        </>
    );
}