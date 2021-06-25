const router = require('express').Router();

const userController = require('../controllers/users_controller_mst');

router
    .get("/:id", userController.getUserById)
    .get("/", userController.getUsers)
    .get("/addplanet/:id", userController.addPlanet)
    .post("/addplanet/:id", userController.postPlanet)
    .get("/deleteplanet/:id", userController.deletePlanet)
    .post("/deleteplanet/:id", userController.postDelPlanet);


module.exports = router;