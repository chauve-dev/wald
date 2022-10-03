import controller from "../../core/app/controller";

export default class indexContoller extends controller{
    index(){
        this.response.view('index', {title: "index"});
    }

    test(){
        this.response.view('index', {title: "test"})
    }
}