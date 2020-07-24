import controller from "../../app/controller";

export default class indexContoller extends controller{
    index(){
        if(this.request.session){
            this.request.session.test = 'ok';
        }
        this.response.render('index', {title: "test"});
    }
}