import Swal from "sweetalert2";

export class SweetAlert {

    private static defaultMethod(icon: any, title: string, text: string, confirmButtonText: string = "Ok") {
        Swal.fire({
            icon: icon,
            title: title,
            text: text,
            confirmButtonText: confirmButtonText
        });
    }

    static error(title: string, text: string, confirmButtonText: string = "Ok") {
       this.defaultMethod("error", title,text,confirmButtonText)
    }

    static success(title: string, text: string, confirmButtonText: string = "Ok") {
        this.defaultMethod("success", title,text,confirmButtonText)
    }    

    static confirmDialog(title: any, text: any, runnable: () => void) {
        Swal.fire({
            title: title,
            text: text,
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Confirmo",
            cancelButtonText: "Cancelar",
        }).then((result) => {
            if (result.isConfirmed) {
                runnable();
            }
        });
    }


}