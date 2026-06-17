const express = require('express');
const serviceRouter = express.Router();
const serviceController = require('../controllers/serviceController');
const authenticateUser = require('../middleware/authMiddleware');

serviceRouter.use(authenticateUser);

serviceRouter.post("/", serviceController.createService);
serviceRouter.get("/", serviceController.fetchAllServices);
serviceRouter.patch("/:id", serviceController.updateService);
serviceRouter.delete("/:id", serviceController.deleteService);

module.exports = serviceRouter;