import {extension} from "../../core/app/extensionController";
import authController from "./src/authController";

export default class fastifyHooker extends extension {

    async before() {
        console.log("before")
        new authController(this.application);
    }

    async after() {
        console.log("after")
    }

}