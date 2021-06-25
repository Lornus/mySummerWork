const path = require('path');
const { nextTick } = require('process');
const raceRepository = require('../repositories/raceRepository');
const raceRepo = new raceRepository();
const Race = require ('../models/race');
const fs = require('fs');
require('dotenv').config();

const cloudinary = require('cloudinary').v2;
cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.CLOUD_API_KEY,
    api_secret: process.env.CLOUD_API_SECRET
});

function pagination(items, page, per_page) {
    const startInd = (page - 1) * per_page;
    const endInd = page * per_page;
    return (items.slice(startInd, endInd));
}


async function uploadRaw(buffer) {
    return new Promise((resolve, reject) => {
        cloudinary.uploader
            .upload_stream({ resource_type: 'raw' },
                (err, result) => {
                    if (err) {
                        reject(err);
                    } else {
                        resolve(result);
                    }
                })
            .end(buffer);
    });
}

module.exports = {
    async getRaces(req, res) {
        let page;

        if (req.query.page && isNaN(req.query.page)) {
            res.status(400).send({ mess: 'page and per_page should be a number' });
            return;
        }

        if (!req.query.page) {
            page = 1;
        } else {
            page = parseInt(req.query.page);
        }

        const per_page = 4;

        let Races;

        let name = "";
        try {
            if (req.query.name) {
                Races = await raceRepo.getRaceByName(req.query.name);
                name = req.query.name;
            } else {
                Races = await raceRepo.getRaces();
            }
        const Pag_races = pagination(Races, page, per_page);

        let class_prev;
        let class_next;

        if (page > 1) {
            class_prev = "";
        } else {
            class_prev = "disabled_link";
        }

        if (page * per_page < Races.length) {
            class_next = "";
        } else {
            class_next = "disabled_link";
        }

        let max_page = Math.ceil(parseInt(Races.length) / (per_page));
        if (max_page == 0) {
            max_page = 1;
        }
        res.render('races', {races: Pag_races, search_name: name, race_current: 'current', next_page: page + 1, previous_page: page - 1, page, class_prev, class_next, max_page, race_link: 'disabled_link' });
    } catch (err) {
        res.status(404).send({ error: 'Cannot get races' })
    }
    },

    async getRaceById(req, res) {
        try {
            const Race = await raceRepo.getRaceById(req.params.id);
        
        res.render('race', { race: Race, race_current: 'current' });
    } catch (err) {
        res.status(404).send({ error: 'Cannot get race by id' })
    }
    },

    newRace(req, res) {
        res.render('add_race');
    },

    async postRace(req, res) {
        const name = req.body.name;
        const strength = req.body.strength;
        const intellect = req.body.intellect
        const dexterity = req.body.dexterity;
        let media_path = "";
        try {
        if (req.files['photo']) {
            

                const o = await uploadRaw(req.files['photo'].data)
                media_path = o.url;
            }
        } catch (err) {
                res.status(500).send({ error: 'Cannot upload 11photo' })
            }
        const race = {
            name: name,
            strength: strength,
            intellect: intellect,
            dexterity: dexterity,
            media_path: media_path
        };
        try {
            const id = await raceRepo.addRace(race);
        
        res.redirect('/races/' + id);}
        catch (err) {
            res.status(500).send({ error: 'Cannot get races by id' })
        }
    },


    async deleteRace(req, res) {
        raceRepo.deleteRace(req.params.id);
        res.redirect('/races');
    },
    async getupdateRace(req, res) {
        try {
            const Race = await raceRepo.getRaceById(req.params.id);
        } catch (err) {
            res.status(404).send({ error: 'Cannot get races by id' })
        }
        res.render('update_race', { race: Race, id: req.params.id});
    },
    async updateRace(req, res) {
        const name = req.body.name;
        const strength = req.body.strength;
        const intellect = req.body.intellect;
        const dexterity = req.body.dexterity;
        const Race = {
            name: name,
            strength: strength,
            intellect: intellect,
            dexterity: dexterity
        };
        raceRepo.updateRace(req.params.id, Race);
        res.redirect('/races/' + req.params.id);
    },
    async getupdateRacePhoto(req, res) {
        res.render('update_race_photo', { id: req.params.id });
    },
    async updateRacePhoto(req, res) {
        let media_path = "";
        try {
        if (req.files['photo']) {
                const o = await uploadRaw(req.files['photo'].data)
                media_path = o.url;
            
        }
    } catch (err) {
        res.status(500).send({ error: 'Cannot upload photo' })
    }
    try{
        const updateinfo = await raceRepo.updateRacePhoto(req.params.id, media_path);
        res.redirect('/races/' + req.params.id);
    } catch(err){
        res.status(500).send({ error: 'Cannot upload phot43o' })
        } 
}
}