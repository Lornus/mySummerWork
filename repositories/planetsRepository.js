const PlanetModel = require('../models/planets');
const UserModel = require('../models/users');

// const fs = require('fs');
class PlanetRepository {

    constructor() {

    }
    async addPlanet(planet) {

        const result = await new PlanetModel(planet).save();
        return result.toJSON()._id;

    }

    async getPlanets() {

        const planetDocs = await PlanetModel.find({});
        const planetArr = planetDocs.map(i => i.toJSON());
        console.log(planetArr)
        return planetArr;

    }

    async getPlanetByName(name) {

        let items = await this.getPlanets();
        items = items.filter(item => item.name.includes(name));

        return items;

    }

    async getPlanetById(id) {

        const planet = await PlanetModel.findOne({ _id: id }).populate("race_id", ["_id", "name"]);
        return planet;

    }

    async updatePlanet(planet_id, planet) {

        const updateInfo = await PlanetModel.updateOne({ _id: planet_id }, { $set: { discoverer: planet.discoverer, name: planet.name, sat: planet.sat, mass: planet.mass} });


    }
    async updatePlanetPhoto(planet_id, media_path) {

        const updateInfo = await PlanetModel.updateOne({ _id: planet_id }, { $set: { media_path: media_path } });

    }
    async deletePlanet(planet_id) {

        const updateInfo = await UserModel.updateMany({ planet_id: planet_id }, { '$pull': { 'planet_id': planet_id } });
        const result = await PlanetModel.deleteOne({ _id: planet_id });
        return result;

    }
    async addRaceToList(planet_id, race_id) {

        const updateInfo = await PlanetModel.updateOne({ _id: planet_id }, { '$addToSet': { 'race_id': race_id } });

    }
    async deleteRaceFromList(planet_id, race_id) {
        const updateInfo = await PlanetModel.updateOne({ _id: planet_id }, { '$pull': { 'race_id': race_id } });
    }
};


module.exports = PlanetRepository;