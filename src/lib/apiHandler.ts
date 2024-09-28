
export class ApiHandler {
    success : boolean
    message : string
    data : any

    constructor({success,message,data} : {success : boolean,message : string,data : any}) {
        this.success = success;
        this.message = message;
        this.data = data;
    }

}