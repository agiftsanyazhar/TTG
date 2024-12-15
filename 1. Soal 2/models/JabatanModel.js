import Sequelize from "sequelize";
import db from "../config/database.js";

const DataTypes = Sequelize;

const Jabatan = db.define(
  "jabatans",
  {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    salary: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    allowance: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0,
    },
  },
  {
    freezeTableName: true,
  }
);

export { Jabatan };

export default Jabatan;

(async () => {
  const Pegawai = (await import("./PegawaiModel.js")).default;

  await db.sync();

  Jabatan.hasMany(Pegawai, { foreignKey: "jabatan_id" });
})();
