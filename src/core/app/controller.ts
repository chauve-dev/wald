import {FastifyReply, FastifyRequest} from "fastify";

export default class controller {

    request: FastifyRequest;
    response: FastifyReply;
    params: any;
    session: any;

    constructor(request: FastifyRequest, response: FastifyReply, fun: string){
        this.request = request;
        this.response = response;
        this.params = request.body;
        this.session = request.session;
        // @ts-ignore
        if(!this[fun]){
            this.index();
        } else {
            // @ts-ignore
            this[fun]();
        }
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