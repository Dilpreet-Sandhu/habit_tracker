import { toast } from "react-toastify";
import axios from 'axios';
interface params {
    url : string;
    data ?: {} | any[],
    method : string
}

export async function useApi({url,data,method} : params) {
    try {
        let res;
        switch (method) {
            case 'GET':
                res = await axios.get(url);
                break;
            case 'PUT':
                res = await axios.put(url,data);
                break;
            case 'POST':
                res = await axios.post(url,data);
                break;
            case 'DELETE':
                res = await axios.delete(url);
                break;
        
            default:
                break;
        }

        if (res?.status == 200) {
            toast(res.data.message,{type :"success"})
            return res.data
        }else {
            toast(res?.data.message,{type : "error"});
        }
        
        
    } catch (error) {
        console.log("error: ",error);
        toast("something went wrong while api request",{type : "error"})
    }
}