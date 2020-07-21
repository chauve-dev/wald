import { Model } from 'objection';
import knex from '../knex'

import { user } from './user.model'

Model.knex(knex)

export class car extends Model {
    //username!: string;
    name!: string;
    userId!: number;

    static relationMappings = {
        owner: {
          relation: Model.BelongsToOneRelation,
          modelClass: user,
          join: {
            from: 'cars.userId',
            to: 'users.id'
          }
        }
      };

    static get tableName() {
        return 'cars';
    }

    static get jsonSchema() {
        return {
            type: 'object',
            required: ['name', 'userId'],
            
            properties: {
                id: {type: 'integer'},
                name: {type: 'string', minLength: 1, maxLength: 255},
                userId: {type: 'integer'}
            }
        }
    }
}