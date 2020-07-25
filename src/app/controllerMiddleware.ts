import {Request, Response, NextFunction} from "express";
export default class controllerMiddelware{

    request: Request;
    response: Response;
    next: NextFunction;
    params: any;
    session: any;

    constructor(request: Request, response: Response, next: NextFunction){
        this.request = request;
        this.response = response;
        this.next = next;
        this.params = request.params;
        this.session = request.session;
        this.index();
    }

    index(){
        this.response.send('Le routeur fonctionne mais nécessite la methode index() pour fonctionner')
    }

    doSessionExists(){
        if(this.session){
            return true;
        }else{
            return false;
        }
    }

}