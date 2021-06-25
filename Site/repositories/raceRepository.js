const RaceModel = require('../models/race');
const PlanetModel = require('../models/planets');
// const fs = require('fs');
class RaceRepository {

    constructor() {

    }
    async addRace(race) {
        const result = await new RaceModel(race).save();
        return result.toJSON()._id;
    }

    async getRaces() {
        const raceDocs = await RaceModel.find({});
        const raceArr = raceDocs.map(i => i.toJSON());
        return raceArr;
    }

    async getRaceByName(name) {
        let items = await this.getRaces();
        items = items.filter(item => item.name.includes(name));
        return items;
    }

    async getRaceById(id) {
        const race = await RaceModel.findOne({ _id: id });
        return race;
    }

    async updateRace(race_id, race) {
        const updateInfo = await RaceModel.updateOne({ _id: race_id }, {
            $set: {
                name: race.name,
                strength: race.strength,
                intellect: race.intellect,
                dexterity: race.dexterity
            }
        });
    }
    async updateRacePhoto(planet_id, media_path) {
        const updateInfo = await RaceModel.updateOne({ _id: planet_id }, { $set: { media_path: media_path } });
        return updateInfo;
    }

    async deleteRace(race_id) {
        const updateInfo = await PlanetModel.updateMany({ race_id: race_id }, { '$pull': { 'race_id': race_id } });
        const result = await RaceModel.deleteOne({ _id: race_id });
        return result;
    }
};

module.exports = RaceRepository;