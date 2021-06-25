const UserModel = require('../models/users');
class UserRepository {

    constructor() {

    }

    async getUsers() {

        const userDocs = await UserModel.find();
        const usersArr = userDocs.map(i => i.toJSON());
        return usersArr;

    }

    async getUserById(id) {

        const user = await UserModel.findById(id).populate("planet_id", ["_id", "name", "discoverer"]);
        return user;

    }
    async addPlanetToList(user_id, planet_id) {

        const updateInfo = await UserModel.updateOne({ _id: user_id }, { '$addToSet': { 'planet_id': planet_id } });

    }
    async deletePlanetFromList(user_id, planet_id) {

        const updateInfo = await UserModel.updateOne({ _id: user_id }, { '$pull': { 'planet_id': planet_id } });

    }
};

module.exports = UserRepository;