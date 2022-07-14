const { Op } = require("sequelize");
const { User, Address } = require("../models");

module.exports = {
  async getAll(request, response) {
    try {
			const { id: user_id } = request.params;
      const address = await Address.findAll({
        where: { user_id },
      });
      return response.status(200).json(address);
    } catch (error) {
      return response.status(400).json(error.message);
    }
  },
  async getAddressById(request, response) {
    try {
      const { id: user_id, addressId } = request.params;

      const address = await Address.findOne({
        where: { user_id, id: addressId },
      });
      if (!address) throw new Error("address does not exist");

      return response.status(200).json(address);
    } catch (error) {
      return response.status(400).json(error.message);
    }
  },
  async create(request, response) {
    try {
      const { id: user_id } = request.params;
      const { zipcode, country, state, city, district, street } = request.body;

			const user = await User.findByPk(user_id);
      if (!user) throw new Error("user does not exist");

      const address = await Address.create({
        zipcode,
        country,
        state,
        city,
        district,
        street,
        user_id,
      });
      return response.status(201).json(address);
    } catch (error) {
      return response.status(400).json(error.message);
    }
  },
  async update(request, response) {
    try {
      const { id: user_id, addressId } = request.params;
      const { zipcode, country, state, city, district, street } = request.body;

      const address = await Address.findOne({
        where: {
          [Op.or]: {
            id: addressId,
            user_id,
          },
        },
      });
      if (!address) throw new Error("address does not exist");

      await address.update({ zipcode, country, state, city, district, street });
      return response.status(200).json(address);
    } catch (error) {
      return response.status(400).json(error.message);
    }
  },
  async delete(request, response) {
    try {
      const { id: user_id, addressId } = request.params;

      const address = await Address.findOne({
        where: {
          [Op.or]: {
            id: addressId,
            user_id,
          },
        },
      });
      if (!address) throw new Error("address does not exist");

      await address.destroy();
      return response.status(200).json(address);
    } catch (error) {
      return response.status(400).json(error.message);
    }
  },
};
