import {Application} from "express";
import instance from "../instance";

class extension {
    protected application: Application;
    protected instance: instance;

    constructor(app: Application) {
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