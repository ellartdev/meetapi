const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
require('dotenv').config(); // must have it there!

let corsOpts = {
    origin: process.env.CORS_ORIGIN
}

app.use(cors(corsOpts));
app.use(bodyParser.json()); // Content-Type: application/json
app.use(bodyParser.urlencoded({ extended: true })); // Content-Type: application/x-www-form-urlencoded

// connecting to the database uwu
const db = require('./app/models');
db.mongoose.connect(db.url, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    console.log(`> Connected to the database`);
}).catch(e => {
    console.error(`> Error connecting to database: ${e}`);
});

// when entering or requesting the site itself
app.get('/', (req, res) => {
    res.status(200).json({ message: "Yooooooooooo init fam m8!!!" });
});

require('./app/routes/meetup.routes')(app);
const PORT = process.env.PORT || 8080
app.listen(PORT, () => {
    console.log(`> Server listening on port ${PORT}`);
});
