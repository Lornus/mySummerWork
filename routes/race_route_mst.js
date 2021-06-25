
const router = require('express').Router();
const raceController = require('../controllers/races_controller_mst');

router
    .get("/", raceController.getRaces)
    .get("/new", raceController.newRace)
    .get("/:id", raceController.getRaceById)
    .post("/", raceController.postRace)
    .post("/:id", raceController.deleteRace)
    .get("/getupdate/:id", raceController.getupdateRace)
    .post("/getupdate/:id", raceController.updateRace)
    .get("/getupdatephoto/:id", raceController.getupdateRacePhoto)
    .post("/getupdatephoto/:id", raceController.updateRacePhoto);

module.exports = router;