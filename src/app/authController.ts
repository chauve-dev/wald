import controller from "./controller";

export default class authController extends controller{

    index(){
        if(true){
            this.render();
        }else{
            this.error();
        }
    }

    render(){
        this.response.send('ok');
    }

    error(){
        this.response.send('no');
    }
}