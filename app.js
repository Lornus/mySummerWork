const express = require('express');
const consolidate = require('consolidate');
const mustache_ex = require('mustache-express');
const path = require('path');
require('dotenv').config();
const app = express();
const mongoose = require('mongoose');
const dbPlanet = require('./models/planets')
const dbUser = require('./models/users')
const dbRace = require('./models/race')

const connectOptions = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
};
const morgan = require('morgan');
const body_parser = require('body-parser');
const busboy_body_parser = require('busboy-body-parser');
const mstRouter = require('./routes/route_mst');
const { mustache } = require('consolidate');

const PORT = Number(process.env.PORT) || 3000



app.use(body_parser.urlencoded({ extended: true }))
app.use(body_parser.json());
app.use(busboy_body_parser());

app.use((err, req, res, next) => {
    if (err instanceof SyntaxError && err.status === 400 && 'body' in err) {
        res.status(400).send({ mess: "Bad request" });
        return;
    }

    next();
});



const viewsDir = path.join(__dirname, 'views');
app.engine("mst", mustache_ex(path.join(viewsDir, "partials")));
app.set('views', viewsDir);
app.set('view engine', 'mst');
// usage
app.get('/', function(req, res) {
    res.render('index', { index_current: 'current', home_link: 'disabled_link' });
});


app.get('/about', function(req, res) {
    res.render('about', { about_current: 'current', about_link: 'disabled_link' });
});


app.use('', mstRouter);
app.use(express.static("./public"));
app.use(express.static("./data"));
app.use(morgan('dev'));


async function appStart() {
    try {
        console.log('Connection to database...')

        await mongoose.connect(process.env.MONGO_URL, {
            useNewUrlParser: true,
            useCreateIndex: true,
            useUnifiedTopology: true,
        })

        console.log('App has successfully connected to the database...')

        app.listen(PORT, () => {
            console.log(`App is listening on port ${PORT}...`)
        })
    } catch (err) {
        console.log('Database connection error: ', err.message)
        process.exit(1)
    }
}

appStart()