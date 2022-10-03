import Fastify, {FastifyInstance, FastifyReply, FastifyRequest} from 'fastify';
const fastifySession = require('@fastify/session');
const fastifyCookie = require('@fastify/cookie');
import route from "./route";
require('dotenv').config()
import {extension} from "./app/extensionController";
import * as fs from "fs";
import path from "path";

class app {
    private app!: FastifyInstance;

    constructor(port: number | undefined) {
        this.init(port);
    }

    async init(port: number | undefined){
        this.checks(async (errors: Array<String>, success: boolean) => {
            await errors.forEach((data) => {
                console.error(data);
            }, () => {
                if (!success) return process.exit(1);
            });
        });
        this.app = this.fastifyInit('pug');
        this.fastifySession();
        const extensions = await this.loadExtension();
        for (const extension of extensions){
            await extension.before();
        }
        await this.fastifyRegisterer();

        this.startServer(port);
    }

    fastifyInit(viewEngine: string): FastifyInstance{
        const app: FastifyInstance = Fastify({logger: true});
        app.register(require("@fastify/view"), {
            root: path.join(__dirname, "views"),
            engine: {
                pug: require(viewEngine),
            },
        });

        app.register(require('@fastify/static'), {
            root: path.join(__dirname, 'public'),
            prefix: '/public/', // optional: default '/'
        })
        return app;
    }

    async fastifyRegisterer(){
        for(let element of route){
            await this.registerRoute(element);
        }
        console.log('\x1b[36m[Info] > Toutes les routes sont enregistré.','\x1b[0m');
    }

    fastifySession(): void{
        this.app.register(fastifyCookie);
        this.app.register(
            fastifySession,
            {
                secret: process.env.SESSION_SECRET || "defaultSecretOf32characterOrMore"
            }
        );
    }

    checks(callback: any){
        let errors = [];
        let success = true;
        if(route.length == 0){
            errors.push("Aucune route définie, veuillez définir des routes dans route.ts");
            success = false;
        }
        callback(errors, success);
    }

    async loadExtension(): Promise<any> {
        let extensions: Array<any> = [];
        var files = fs.readdirSync(__dirname+'/extensions');
        for (const e of files){
            await import("./extensions/" + e + '/controller').then((ctrl) => {
                extensions.push(new ctrl.default(this.app));
            });
        }
        return extensions;
    }

    async registerRoute(element: any){
        var type: string = element.type.toLowerCase() || 'get';
        if(['get', 'post', 'put', 'delete'].includes(type)){
            let controller = element.controller.split("::")
            await import("./controller/routes/" + controller[0]).then((ctrl) => {
                // @ts-ignore
                this.app[type](element.path, (req: Request, res: Response) => {
                    new ctrl.default(req, res, controller[1]);
                });
            });
            console.log(`\x1b[33m[Info] > ${element.path} Registered`,'\x1b[0m')
        }else{
            console.log(`\x1b[31m[Error] > ${element.path} not registered method ${type} do not exists`,'\x1b[0m')
        }
    }

    startServer(port: number | undefined) {
        this.app.listen({ port: port }, (err) => {
            if (err) throw err;
            console.log("\x1b[32m[Info] > Server Running",'\x1b[0m');
        });
    }
}

const wald = new app(3000);