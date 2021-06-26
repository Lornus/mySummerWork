const mongoose = require('mongoose')
/**
 * @typedef User
 * @property {integer} id.required 
 * @property {string} login. 
 * @property {string} fullname. 
 * @property {integer} role 
 * @property {string} registeredAt 
 * @property {string} avaUrl 
 * @property {integer} isEnabled 
 */

const UserSchema = new mongoose.Schema({
    login: { type: String },
    fullname: { type: String },
    role: { type: Boolean },
    registeredAt: { type: Date, default: Date.now },
    avaUrl: { type: String },
    isEnabled: { type: Boolean },
    Bio: { type: String },
    planet_id: [{ type: mongoose.mongo.ObjectId, ref: "planets" }]
});

module.exports = mongoose.model('Users', UserSchema);