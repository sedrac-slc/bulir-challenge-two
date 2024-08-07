import { Button } from "@mui/material";
import classNames from "classnames";
import { Link } from "react-router-dom";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

export enum TypeForm{
    LOGIN = 'LOGIN',
    REGISTER = 'REGISTER',
}

interface FormAppLayoutProps {
    title: string;
    typeForm: TypeForm;
    children: React.ReactNode;
} 

export default function FormAppLayout({
    title,
    typeForm,
    children,
}: FormAppLayoutProps) {
    return (
        <main className={classNames({"flex h-screen justify-center items-center": true})}>
            <div className="absolute top-0 left-0 h-full w-6/12 bg-blue-400 z-0 p-2">
                <Link to="/">
                    <Button variant="contained" color="success" startIcon={<ArrowBackIcon/>}>página inicial</Button>
                </Link>
            </div>
            <div className={classNames(
                {"border border-blue-400 rounded m-3 w-full p-4 flex flex-col gap-6 bg-gray-50 z-10": true},
                {"max-w-lg": typeForm == TypeForm.LOGIN},
                {"max-w-5xl": typeForm == TypeForm.REGISTER},
            )}>
                <div className="text-2xl">{title}</div>
                {children}
            </div>
        </main>
    )
}