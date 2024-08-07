import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import FormUser from './FormUser';

interface DialogUserProps{
  onSubmit: (event: React.FormEvent<HTMLFormElement>) => void;
  title: string;
  userType: string;
  isOpen: boolean;
  isShowPassword: boolean
  onOpen: () => void;
  onClosed: () => void;
  person: any,
}

export default function DialogUser({
  onSubmit, 
  title,
  isOpen,
  isShowPassword,
  onOpen,
  onClosed,
  person,
}: DialogUserProps) {

  
  return (
    <React.Fragment>

      <Button variant="outlined" onClick={onOpen}>
        Adicionar
      </Button>

      <Dialog fullScreen open={isOpen} onClose={onClosed}
        PaperProps={{
          component: 'form',
          onSubmit: onSubmit
        }}
      >
        <DialogTitle>{title}</DialogTitle>
        <DialogContent>
          <div className="mt-4">
            <FormUser isDisabled={false} isShowPassword={isShowPassword} person={person}/>
          </div>
        </DialogContent>
        <DialogActions>
          <Button color='primary' type="submit">Confirma</Button>
          <Button color='error' onClick={onClosed}>Cancelar</Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
}