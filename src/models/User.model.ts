import { Sequelize, Model, DataTypes, BuildOptions } from "sequelize";
import { database } from "../sequelize";

export class User extends Model {
  public id!: number;
  public nom!: string;
  public prenom!: string;
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

User.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    prenom: {
      type: DataTypes.STRING
    },
    nom: {
      type: DataTypes.STRING
    }
  },
  {
    tableName: "users",
    sequelize: database // this bit is important
  }
);

User.sync({ force: false });
