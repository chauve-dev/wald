import controllerMiddleware from "../../app/controllerMiddleware";

export default class indexController extends controllerMiddleware{
    index(){
        this.next();
    }
}