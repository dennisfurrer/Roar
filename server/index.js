const express = require('express');
const cors = require('cors');

const app = express();

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
    res.json({
        message: 'Roarer'
    });
});

function isValidRoar(roar) {
    return roar.name && roar.name.toString().trim() !== '' &&
    roar.content && roar.content.toString().trim() !== '';
}

app.post('/roars', (req, res) => {
    if (isValidRoar(req.body)) {
        // insert into db ..
        const roar = {
            name: req.body.name.toString(),
            content: req.body.content.toString()
        };
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