import authController from "../../app/authController";
import { user } from "../../models/user.model"
import { car } from "../../models/car.model"

export default class testController extends authController{

    index(){
        super.index()
    }

    async render(){
        await user.query().insert({
            username: 'Wald Walder',
            email: 'wald@wald.wald'
        })

        await car.query().insert({
            name: 'Walda',
            userId: 0
        })

        car.query().where('userId', 0).then(users => {
            this.response.send(users)
        });
    }
}