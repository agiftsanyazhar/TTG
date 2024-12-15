import Sequelize from "sequelize";
import db from "../config/database.js";
import User from "./UserModel.js";

const DataTypes = Sequelize;

const Role = db.define(
  "roles",
  {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    freezeTableName: true,
  }
);

export { Role };

Role.hasMany(User, { foreignKey: "role_id" });

export default Role;

(async () => {
  await db.sync();
})();
