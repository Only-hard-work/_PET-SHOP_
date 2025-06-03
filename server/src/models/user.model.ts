import { DataTypes, HasManyAddAssociationMixin, HasManyGetAssociationsMixin, Model } from "sequelize";
import sequelize from "../config/database";
import Pet from "./pet.model";

class User extends Model {
  public id!: number;
  public username!: string;
  public email!: string;
  public password!: string;
  public avatar!: string;
  public phone!: string;
  public address!: string;

  public getPets!: HasManyGetAssociationsMixin<Pet>;
  public addPet!: HasManyAddAssociationMixin<Pet, number>;
  public hasPet!: HasManyAddAssociationMixin<Pet, number>;

  public readonly pets?: Pet[];
}

User.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    username: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        isEmail: true,
      },
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    avatar: {
      type: DataTypes.STRING,
      defaultValue: "default-avatar.jpg",
    },
    phone: DataTypes.STRING,
    address: DataTypes.TEXT,
  },
  {
    sequelize,
    modelName: "user",
  }
);

User.hasMany(Pet, { foreignKey: 'ownerId' });
Pet.belongsTo(User, { foreignKey: 'ownerId' });

export default User;
