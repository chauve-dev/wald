import {Request, Response} from "express";
export default class controller{

    request: Request;
    response: Response;

    constructor(request: Request, response: Response){
        this.request = request;
        this.response = response;
        this.index();
    }

    index(){
        this.response.send('La route fonctionne mais nécessite la methode index() pour fonctionner')
    }

}