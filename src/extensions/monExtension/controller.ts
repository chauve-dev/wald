import {extension} from "../../core/app/extensionController";
import {FastifyReply, FastifyRequest} from "fastify";

export default class monExtension extends extension {

    async before() {
        console.log("before")
        this.application.get('/extension', (req: FastifyRequest, res: FastifyReply) => {
            res.send("ok");
        })
    }

    async after() {
        console.log("after")
    }

}