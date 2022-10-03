import {FastifyReply, FastifyRequest} from "fastify";

export default class controllerMiddelware{

    request: FastifyRequest;
    response: FastifyReply;
    params: any;
    session: any;

    constructor(request: FastifyRequest, response: FastifyReply){
        this.request = request;
        this.response = response;
        this.params = request.params;
        this.session = request.session;
        this.index();
    }

    index(){
        this.response.send('Le routeur fonctionne mais nécessite la methode index() pour fonctionner')
    }

    doSessionExists(){
        return !!this.session;
    }

}