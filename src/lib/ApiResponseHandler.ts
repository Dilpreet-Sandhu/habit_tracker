import { AxiosResponse } from "axios";
import { toast } from "react-toastify";


export function ResponseHandler(res : AxiosResponse) {
    switch (res.status) {
        case 200:
            toast(res.data.message,{type : "success"});
            return res.data.data;
        case 400:
            toast(res.data.message,{type : "error"});
            break;
        case 500:
            toast(res.data.message,{type : "error"});
            break;
    
        default:
            break;
    }
}