import { Button, Grid, IconButton, Stack, Toolbar, Typography } from "@mui/material";
import MenuIcon from '@mui/icons-material/Menu';
import LoginIcon from '@mui/icons-material/Login';
import HowToRegIcon from '@mui/icons-material/HowToReg';

import logo from '../assets/img/bakground.png';
import { Link } from "react-router-dom";

export default function Home() {
    return (
        <>
            <Toolbar className="border-b">
                <IconButton edge="start" color="inherit" aria-label="menu" sx={{ mr: 2 }}>
                    <MenuIcon />
                </IconButton>
                <Typography variant="h6" noWrap component="div" sx={{ flexGrow: 1 }}>Bulir</Typography>
            </Toolbar>
            <Grid container spacing={{ xs: 2, md: 3 }} columns={{ xs: 4, sm: 8, md: 12 }}>
                <Grid item xs={6} className="flex flex-col gap-2 justify-center items-center">
                    <div className="space-y-10 mx-5 md:ml-5 flex flex-col gap-2 justify-center items-center">
                        <div className="text-4xl mt-3 md:mt-0">Bem vido, ao bulir challengeTwo</div>
                        <div className="text-xl text-center">
                            Este website, atende o desenvolvimento de uma aplicação para atender o pedido do desafio 2 da emmpresa Bulir
                        </div>
                        <Stack spacing={2} direction="row" className="mt-10">
                            <Link to="/login" >
                                <Button variant="contained" startIcon={<LoginIcon />}>
                                    Autenticação
                                </Button>
                            </Link>
                            <Link to="/register" >
                                <Button variant="outlined" startIcon={<HowToRegIcon />}>
                                    Cadastramento
                                </Button>
                            </Link>
                        </Stack>
                    </div>
                </Grid>
                <Grid item xs={6}>
                    <img alt="logo" src={logo} />
                </Grid>
            </Grid>
        </>
    )
}