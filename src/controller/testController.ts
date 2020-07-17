import controller from "../app/controller";
import { User } from '../models/User.model';

export default class testController extends controller{
    index(){
        User.create<User>({
            nom:"JEANTET",
            prenom:"Joey"
        })
        this.response.send('ok');
    }
}