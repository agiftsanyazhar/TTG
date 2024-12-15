"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert("jabatans", [
      {
        name: "Kepala Bengkel",
        salary: 10000000,
        allowance: 5000000,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "Teknisi",
        salary: 9000000,
        allowance: 4500000,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "Administrasi",
        salary: 8000000,
        allowance: 4000000,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "Karyawan Umum",
        salary: 7000000,
        allowance: 3500000,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "Pemilik Usaha",
        salary: 6000000,
        allowance: 0,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("jabatans", null);
  },
};
