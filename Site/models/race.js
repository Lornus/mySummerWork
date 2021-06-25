const mongoose = require('mongoose')

const RaceSchema = new mongoose.Schema({
    name: {type: String},
    strength: {type: Number},
    intellect: {type: Number},
    dexterity: {type: Number},
    media_path: { type: String }
});
module.exports = mongoose.model('races', RaceSchema);