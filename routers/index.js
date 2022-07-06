const { Router } = require("express");
const UserRouter = require("./UserRouter");

const routers = Router();

routers.use('/user', UserRouter);

module.exports = routers;