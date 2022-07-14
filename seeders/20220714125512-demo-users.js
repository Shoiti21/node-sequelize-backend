"use strict";
var bcrypt = require("bcryptjs");
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      "Users",
      [
        {
          username: "JoaoSilva",
          email: "joao_silva@teste.net",
          password: bcrypt.hashSync("teste123", 8),
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          username: "Maria20",
          email: "maria_20@teste.net",
          password: bcrypt.hashSync("teste123", 8),
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          username: "Mario10",
          email: "mario_10@teste.net",
          password: bcrypt.hashSync("teste123", 8),
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          username: "leandroShoiti",
          email: "leandro_shoiti@teste.net",
          password: bcrypt.hashSync("teste123", 8),
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          username: "leoleo",
          email: "leo.leo@teste.net",
          password: bcrypt.hashSync("teste123", 8),
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          username: "silva",
          email: "silva@teste.net",
          password: bcrypt.hashSync("teste123", 8),
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {}
    );
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("Users", null, {});
  },
};
