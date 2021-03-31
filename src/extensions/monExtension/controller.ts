import {extension} from "../../app/extensionController";
import { Application, Request, Response } from "express";

export default class monExtension extends extension {

    async before() {
        console.log("before")
        this.application.get('/extension', (req: Request, res: Response) => {
            res.send("ok");
        })
    }

    async after() {
        console.log("after")
    }

}