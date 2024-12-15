"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert("pegawais", [
      {
        name: "Pegawai 1",
        email: "pegawai1@gmail.com",
        phone: "08123456789",
        address: "Surabaya 1",
        jabatan_id: 2,
        user_id: 2,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "Pegawai 2",
        email: "pegawai2@gmail.com",
        phone: "08123456788",
        address: "Surabaya 2",
        jabatan_id: 3,
        user_id: 3,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "Pegawai 3",
        email: "pegawai3@gmail.com",
        phone: "08123456787",
        address: "Surabaya 3",
        jabatan_id: 4,
        user_id: 4,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("pegawais", null);
  },
};
