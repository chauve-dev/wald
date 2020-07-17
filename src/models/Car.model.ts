import { Sequelize, Model, DataTypes, BuildOptions } from "sequelize";
import { database } from "../sequelize";

export class Car extends Model {
  public id!: number;
  public name!: string;
  public userid!: number;
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

Car.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    name: {
      type: DataTypes.STRING
    },
    userid: {
      type: DataTypes.INTEGER
    }
  },
  {
    tableName: "cars",
    sequelize: database // this bit is important
  }
);

Car.sync({ force: false });
