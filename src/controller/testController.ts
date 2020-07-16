import controller from "../app/controller";

export default class testController extends controller{
    index(){
        this.response.send('testController');
    }
}