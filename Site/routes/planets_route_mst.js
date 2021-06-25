const router = require('express').Router();
const planetController = require('../controllers/planets_controller_mst');

router
    .get("/", planetController.getPlanets)
    .get("/new", planetController.newPlanet)
    .get("/:id", planetController.getPlanetById)
    .post("/", planetController.postPlanet)
    .post("/delete/:id", planetController.deletePlanet)
    .get("/getupdate/:id", planetController.getupdatePlanet)
    .post("/getupdate/:id", planetController.updatePlanet)
    .get("/getupdatephoto/:id", planetController.getupdatePlanetPhoto)
    .post("/getupdatephoto/:id", planetController.updatePlanetPhoto)
    .get("/addrace/:id", planetController.addRace)
    .post("/addrace/:id", planetController.postAddRace)
    .get("/deleterace/:id", planetController.deleteRace)
    .post("/deleterace/:id", planetController.postDelRace);

module.exports = router;