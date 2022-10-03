import instance from "../instance";
import {FastifyInstance} from "fastify";

class extension {
    protected application: FastifyInstance;
    protected instance: instance;

    constructor(app: FastifyInstance) {
        this.application = app;
        this.instance = instance.getInstance();
    }

    async before(){
        return;
    }

    async after(){
        return;
    }

}

export {extension}