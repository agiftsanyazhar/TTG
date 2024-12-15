import Sequelize from "sequelize";
import db from "../config/database.js";

const DataTypes = Sequelize;

const Admin = db.define(
  "admins",
  {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    user_id: {
      type: Sequelize.INTEGER,
      allowNull: false,
      references: {
        model: "users",
        key: "id",
      },
      onUpdate: "CASCADE",
      onDelete: "CASCADE",
    },
  },
  {
    freezeTableName: true,
  }
);

export default Admin;

import { User } from "./UserModel.js";

(async () => {
  await db.sync();

  Admin.belongsTo(User, { foreignKey: "user_id" });
})();
