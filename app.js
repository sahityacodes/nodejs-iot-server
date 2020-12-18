var express = require("express");
var app = express();
const authRoute = require('./routes/auth');
const mongoose = require('mongoose');
const beaconData = require("./routes/beaconData");
const  server  = require("./mqtt_handler");

require("dotenv/config");

//Route middleware
app.use(express.json());
app.use('/api/user', authRoute);
app.use('/api/beacon',beaconData);


app.listen(3000, () => console.log("Express"));


mongoose.connect(process.env.DB_CONNECTION, { useUnifiedTopology: true , useNewUrlParser: true})
    .then(() => console.log('Now connected to MongoDB!'))
    .catch(err => console.error('Something went wrong', err));


