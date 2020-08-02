import { Model } from 'objection';
import knex from '../knex'

import { car } from './car.model'
import { subController } from '../subController'

Model.knex(knex)

export class user extends Model {
    username!: string;
    email!: string;

    static relationMappings = {
        vehicules: {
          relation: Model.HasManyRelation,
          modelClass: car,
          join: {
            from: 'users.id',
            to: 'cars.userId'
          }
        }
      };

      static afterInsert({ inputItems }: any) {
        subController.index('user', inputItems[0], 'insert')
      }

      static afterUpdate({inputItems}: any){
        subController.index('user', inputItems[0], 'update')
      }

      static afterDelete(){
        subController.index('user', {}, 'delete')
      }

    static get tableName() {
        return 'users';
    }



    static get jsonSchema() {
        return {
            type: 'object',
            required: ['username', 'email'],
            
            properties: {
                id: {type: 'integer'},
                username: {type: 'string', minLength: 1, maxLength: 255},
                email: {type: 'string', minLength: 1, maxLength: 255}
            }
        }
    }
}