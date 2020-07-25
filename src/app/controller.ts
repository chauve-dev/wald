import {Request, Response} from "express";
export default class controller{

    request: Request;
    response: Response;
    params: any;
    session: any;

    constructor(request: Request, response: Response){
        this.request = request;
        this.response = response;
        this.params = request.params;
        this.session = request.session;
        this.index();
    }

    index(){
        this.response.send('La route fonctionne mais nécessite la methode index() pour fonctionner')
    }

    doSessionExists(){
        if(this.session){
            return true;
        }else{
            return false;
        }
    }

}