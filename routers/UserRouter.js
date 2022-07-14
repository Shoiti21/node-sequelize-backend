const { Router } = require("express");
const authJwt = require("../middleware/authentication");
const UserController = require("../controllers/UserController");
const AddressController = require("../controllers/AddressController");

const UserRouter = Router();

UserRouter.get("/", UserController.getAll);
UserRouter.get("/:id", [authJwt.verifyTokenUser], UserController.getUserById);
UserRouter.post("/create", UserController.create);
UserRouter.put("/update/:id", [authJwt.verifyTokenUser], UserController.update);
UserRouter.delete("/delete/:id", [authJwt.verifyTokenUser], UserController.delete);
UserRouter.post("/login", UserController.login);
UserRouter.get("/logout", UserController.logout);

UserRouter.get("/:id/address", AddressController.getAll);
UserRouter.get("/:id/address/:addressId", AddressController.getAddressById);
UserRouter.post("/:id/address/create", [authJwt.verifyTokenUser], AddressController.create);
UserRouter.put("/:id/address/update/:addressId", AddressController.update);
UserRouter.delete("/:id/address/delete/:addressId", AddressController.delete);

module.exports = UserRouter;
