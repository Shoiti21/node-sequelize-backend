const { Router } = require("express");
const authJwt = require("../middleware/authentication");
const UserController = require("../controllers/UserController");

const UserRouter = Router();

UserRouter.get("/", UserController.getAll);
UserRouter.post("/create", UserController.create);
UserRouter.put("/update/:id", [authJwt.verifyTokenUser], UserController.update);
UserRouter.delete("/delete/:id", [authJwt.verifyTokenUser], UserController.delete);
UserRouter.post("/login", UserController.login);
UserRouter.get("/logout", UserController.logout);

module.exports = UserRouter;
