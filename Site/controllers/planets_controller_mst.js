const path = require('path');
const { nextTick } = require('process');
const planetRepository = require('../repositories/planetsRepository');
const planetRepo = new planetRepository()
const Planet = require('../models/planets');
const fs = require('fs');

const RaceRepository = require('../repositories/raceRepository')
const raceRepo = new RaceRepository();

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
    async getPlanets(req, res) {
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

        let Planets;
        let name = "";
        try {
            if (req.query.name) {
                Planets = await planetRepo.getPlanetByName(req.query.name);
                name = req.query.name;
            } else {
                Planets = await planetRepo.getPlanets();
            }

            const Pag_planets = pagination(Planets, page, per_page);
            let class_prev;
            let class_next;

            if (page > 1) {
                class_prev = "";
            } else {
                class_prev = "disabled_link";
            }

            if (page * per_page < Planets.length) {
                class_next = "";
            } else {
                class_next = "disabled_link";
            }

            let max_page = Math.ceil(parseInt(Planets.length) / (per_page));
            if (max_page == 0) {
                max_page = 1;
            }

            res.render('planets', {
                planets: Pag_planets, search_name: name, planet_current: 'current', next_page: page + 1, previous_page: page - 1, page, class_prev, class_next,
                max_page, planet_link: 'disabled_link'
            });
        } catch (err) {
            console.log(err)
            res.status(404).send({ error: 'Cannot get planets' })

        }
    },

    async getPlanetById(req, res) {
        try {
            const Planet = await planetRepo.getPlanetById(req.params.id);
       
        res.render('planet', { planet: Planet, races: Planet.race_id, planet_current: 'current' });
    } catch (err) {
        console.log(err)
        res.status(404).send({ error: 'Cannot get planet by id' })
    }
    },

    newPlanet(req, res) {
        res.render('add_planet');
    },



    async postPlanet(req, res) {
        let time = new Date();
        const name = req.body.name;
        const discoverer = req.body.discoverer;
        const sat = req.body.sat;
        const mass = req.body.mass;
        let media = "";
        if (req.files['photo']) {
            try {
                const o = await uploadRaw(req.files['photo'].data)
                media_path = o.url;
            } catch (err) {
                res.status(500).send({ error: 'Cannot upload photo' })
            }
        }

        const planet = { discoverer: discoverer, name: name, sat: sat, timeDownload: time.toISOString(), mass: mass, media_path: media_path };
        try {
            const id = await planetRepo.addPlanet(planet)

            res.redirect('/planets/' + id);
        } catch (err) {
            res.status(500).send({ error: 'Cannot add planet' })
        }
    },


    async deletePlanet(req, res) {
        planetRepo.deletePlanet(req.params.id);
        res.redirect('/planets')
    },

    async getupdatePlanet(req, res) {
        try {
            const Planet = await planetRepo.getPlanetById(req.params.id);

            res.render('update_planet', { planet: Planet, id: req.params.id });
        } catch (err) {
            res.status(404).send({ error: 'Cannot get planet by id' })
        }
    },
    async updatePlanet(req, res) {
        const discoverer = req.body.discoverer;
        const name = req.body.name;
        const sat = req.body.sat;
        const mass = req.body.mass;
        const planet = { discoverer: discoverer, name: name, sat: sat, mass: mass };

        planetRepo.updatePlanet(req.params.id, planet);
        res.redirect('/planets/' + req.params.id);
    },
    async getupdatePlanetPhoto(req, res) {
        res.render('update_planet_photo', { id: req.params.id });
    },
    async updatePlanetPhoto(req, res) {
        let media_path = "";
        try {
            if (req.files['photo']) {

                const o = await uploadRaw(req.files['photo'].data)
                media_path = o.url;

            }

        } catch (err) {
            res.status(500).send({ error: 'Cannot upload photo' })
        }
        planetRepo.updatePlanetPhoto(req.params.id, media_path);
        res.redirect('/planets/' + req.params.id);
    },
    async addRace(req, res) {
        try {
            Races = await raceRepo.getRaces();
        } catch (err) {
            res.status(404).send({ error: 'Cannot get races' })
        }
        res.render('add_race_to_planet', { planet_id: req.params.id, races: Races });
    },
    async postAddRace(req, res) {
        const race_id = req.body.races;
        const planet_id = req.params.id;
        await planetRepo.addRaceToList(planet_id, race_id);
        res.redirect('/planets/' + planet_id);
    },
    async deleteRace(req, res) {
        try {
            const Planet = await planetRepo.getPlanetById(req.params.id);
         
        res.render('delete_race_from_planet', { planet_id: req.params.id, races: Planet.race_id });
    } catch (err) {
            res.status(404).send({ error: 'Cannot get planet by id' })
        }
    },
    async postDelRace(req, res) {
        const race_id = req.body.races;
        const planet_id = req.params.id;
        await planetRepo.deleteRaceFromList(planet_id, race_id);
        res.redirect('/planets/' + planet_id);
    }
}