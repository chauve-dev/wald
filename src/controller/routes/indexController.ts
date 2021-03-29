import controller from "../../app/controller";

export default class indexContoller extends controller{
    index(){
        if(this.request.session){
            // @ts-ignore
            this.request.session.test = 'ok';
        }
        this.response.render('index', {title: "test"});
    }
}