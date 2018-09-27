const express = require('express');
const cors = require('cors');
const monk = require('monk');

const app = express();

const db = monk('localhost/roardb');
const roars = db.get('roars');

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

app.post('/roars', (req, res) => {
    if (isValidRoar(req.body)) {
        const roar = {
            name: req.body.name.toString(),
            content: req.body.content.toString(),
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