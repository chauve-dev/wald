import { Sequelize, Model, DataTypes, BuildOptions } from "sequelize";
import { database } from "../sequelize";

export class Node extends Model {
  public id!: number;
  public name!: string;
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

Node.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    name: {
      type: new DataTypes.STRING(128),
      allowNull: false
    }
  },
  {
    tableName: "nodes",
    sequelize: database // this bit is important
  }
);

Node.sync({ force: false });
