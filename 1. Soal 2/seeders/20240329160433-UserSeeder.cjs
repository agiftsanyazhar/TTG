"use strict";

const bcrypt = require("bcrypt");

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    const salt = await bcrypt.genSalt();
    const hashPassword = await bcrypt.hash("12345678", salt);

    await queryInterface.bulkInsert("users", [
      {
        name: "Admin",
        email: "admin@gmail.com",
        password: hashPassword,
        role_id: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "Pegawai 1",
        email: "pegawai1@gmail.com",
        password: hashPassword,
        role_id: 2,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "Pegawai 2",
        email: "pegawai2@gmail.com",
        password: hashPassword,
        role_id: 2,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "Pegawai 3",
        email: "pegawai3@gmail.com",
        password: hashPassword,
        role_id: 2,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("users", null);
  },
};
