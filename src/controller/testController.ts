import controller from "../app/controller";
import { User } from '../models/User.model';

export default class testController extends controller{
    index(){
        User.create<User>({
            nom:"nom",
            prenom:"prenom"
        })
        this.response.send('ok');
    }
}