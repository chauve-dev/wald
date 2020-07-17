import controller from "../app/controller";
import { Node } from '../models/node.model';

export default class testController extends controller{
    index(){
        Node.create<Node>({
            name:"ok"
        })
        this.response.send('ok');
    }
}