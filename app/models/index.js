const dbConf = require("../config/db.config");
const mongoose = require('mongoose');
mongoose.Promise = global.Promise;

const db = {};

db.mongoose = mongoose;
db.url = dbConf.url;
db.meetups = require('./meetup.model')(mongoose);

module.exports = db;
