import Sequelize from "sequelize";
import db from "../config/database.js";
import Jabatan from "./JabatanModel.js";

const DataTypes = Sequelize;

const Pegawai = db.define(
  "pegawais",
  {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    phone: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    address: {
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
    jabatan_id: {
      type: Sequelize.INTEGER,
      allowNull: false,
      references: {
        model: "jabatans",
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

export default Pegawai;

import { User } from "./UserModel.js";

(async () => {
  await db.sync();

  Pegawai.belongsTo(User, { foreignKey: "user_id" });
  Pegawai.belongsTo(Jabatan, { foreignKey: "jabatan_id" });
})();
