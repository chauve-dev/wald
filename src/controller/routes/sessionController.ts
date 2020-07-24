import controller from "../../app/controller";

export default class sessionController extends controller{
    index(){
        if(this.request.session){
            this.response.send(this.request.session.test);
        }else{
            this.response.send('no');
        }
    }
}