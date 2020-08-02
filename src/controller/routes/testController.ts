import authController from "../../app/authController";
import { user } from "../../models/user.model"
import { car } from "../../models/car.model"

export default class testController extends authController{

    async render(){
        await user.query().insert({
            username: 'Wald Walder',
            email: 'wald@wald.wald'
        })

        await user.query().patch({ email: 'test'}).where('id', '=', 43)

        await user.query().delete().where('id', '=', 46)

        user.query().then(users => {
            this.response.send(users)
        });
    }
}