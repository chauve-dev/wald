import controller from "../app/controller";
import { User } from '../models/User.model';
import { Car } from '../models/Car.model';

export default class testController extends controller{
    async index(){
        User.create({
            prenom: "Test",
            nom: "Test"
        })
        Car.create({
            name: 'test',
            userid: 1
        })
        this.response.send(await Car.findAll());
    }
}