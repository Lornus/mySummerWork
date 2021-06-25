const mongoose = require('mongoose')
/**
 * @typedef Planet
 * @property {integer} id
 * @property {string} discoverer.required 
 * @property {string} name.required 
 * @property {integer} sat.required 
 * @property {integer} mass.required 
 * @property {string} timeDownload 
*/

const PlanetSchema = new mongoose.Schema({
    discoverer: {type: String},
    name: {type: String},
    sat: {type: Number},
    mass: {type: Number},
    timeDownload: { type: Date, default: Date.now },
    media_path: {type: String},
    race_id: [{type: mongoose.mongo.ObjectId, ref: 'races'}]
});

module.exports = mongoose.model('planets', PlanetSchema)