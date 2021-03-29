import controllerMiddleware from "../../app/controllerMiddleware";

export default class indexController extends controllerMiddleware{
    index(){
        console.log('middleware');
        this.next();
    }
}