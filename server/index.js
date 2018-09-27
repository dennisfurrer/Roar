const express = require('express');
const cors = require('cors');
const monk = require('monk');
const Filter = require('bad-words');
const rateLimit = require('express-rate-limit');

const app = express();
const db = monk('localhost/roardb');
const roars = db.get('roars');
const filter = new Filter();

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
    res.json({
        message: 'Roarer'
    });
});

app.get('/roars', (req, res) => {
    roars
        .find()
        .then(roars => {
            res.json(roars);
        });
});

function isValidRoar(roar) {
    return roar.name && roar.name.toString().trim() !== '' &&
    roar.content && roar.content.toString().trim() !== '';
}

app.use(rateLimit({
    windowsMs: 30 * 1000, // 30 secs
    max: 1
}));

app.post('/roars', (req, res) => {
    if (isValidRoar(req.body)) {
        const roar = {
            name: filter.clean(req.body.name.toString()),
            content: filter.clean(req.body.content.toString()),
            created: new Date()
        };

        roars
            .insert(roar)
            .then(createdRoar => {
                res.json(createdRoar);
            });
    } else {
        res.status(422);
        res.json({
            message: 'Name and Content are required fields!'
        });
    }
});

app.listen(5000, () => {
    console.log('Listening on http://localhost:5000');
});