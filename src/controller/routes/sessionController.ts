import controller from "../../app/controller";

export default class sessionController extends controller{
    index(){
        if(this.doSessionExists()){
            this.response.send(this.session);
        }else{
            this.response.send('no');
        }
    }
}