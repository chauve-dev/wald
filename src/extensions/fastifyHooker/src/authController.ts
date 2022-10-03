import {FastifyInstance, FastifyReply, FastifyRequest, HookHandlerDoneFunction} from "fastify";

export default class authController {
    constructor(app: FastifyInstance) {
        app.addHook('onRequest', (request, reply, done) => {
            this.main(request, reply, done);
        });
    }

    private main(request: FastifyRequest, reply: FastifyReply, done: HookHandlerDoneFunction) {
        console.log('hook');
        done();
    }
}