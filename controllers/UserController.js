const { Op } = require("sequelize");
const { User } = require("../models");
const config = require("../config/auth.config");
var bcrypt = require("bcryptjs");
var jwt = require("jsonwebtoken");

module.exports = {
  async getAll(request, response) {
    try {
      const user = await User.findAll({
        attributes: {
          exclude: ["password"],
        },
      });
      return response.status(200).json(user);
    } catch (error) {
      return response.status(400).json(error.message);
    }
  },
  async getUserById(request, response) {
    try {
      const { id } = request.params;

      const user = await User.findOne({
        where: { id },
        attributes: {
          exclude: ["password"],
        },
      });
      if (!user) throw new Error("user does not exist");

      return response.status(200).json(user);
    } catch (error) {
      return response.status(400).json(error.message);
    }
  },
  async create(request, response) {
    try {
      const { username, email, password } = request.body;

      const user = await User.create({
        username,
        email,
        password: bcrypt.hashSync(password, 8),
      });
      return response.status(201).json(user);
    } catch (error) {
      return response.status(400).json(error.message);
    }
  },
  async update(request, response) {
    try {
      const { id } = request.params;
      const { username, email, password } = request.body;

      const user = await User.findByPk(id);
      if (!user) throw new Error("user does not exist");

      // Forma 1 - fazer update após um findOne e atualizar o registro
      await user.update({ username, email, password: bcrypt.hashSync(password, 8) });

      // Forma 2 - fazer update com o where dentro do metodo update
      // const use2 = await User.update(
      //   { username, email, password: bcrypt.hashSync(password, 8) },
      //   { where: { id } }
      // );

      return response.status(200).json(use);
    } catch (error) {
      return response.status(400).json(error.message);
    }
  },
  async delete(request, response) {
    try {
      const { id } = request.params;

      const user = await User.findByPk(id);
      if (!user) throw new Error("user does not exist");

      await user.destroy();
      return response.status(200).json(user);
    } catch (error) {
      return response.status(400).json(error.message);
    }
  },
  async login(request, response) {
    try {
      const { username, password } = request.body;

      const user = await User.findOne({
        where: {
          [Op.or]: {
            username,
            email: username,
          },
        },
      });
      if (!user) throw new Error("invalid username or password");

      var passwordIsValid = bcrypt.compareSync(password, user.password);
      if (!passwordIsValid) throw new Error("invalid password");

      var accessToken = jwt.sign({ id: user.id }, config.secret, {
        expiresIn: 86400,
      });

      return response.status(200).json({ ...user, accessToken });
    } catch (error) {
      return response.status(400).json(error.message);
    }
  },
  async logout(request, response) {
    try {
      if (!user) throw new Error("user does not exist");
      return response.status(200).json(user);
    } catch (error) {
      return response.status(400).json(error.message);
    }
  },
};
