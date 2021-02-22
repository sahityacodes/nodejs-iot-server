var express = require("express");
var app = express();
//const authRoute = require('./routes/auth');
const mongoose = require('mongoose');
const beaconData = require("./routes/beaconData");
const server = require("./mqtt_handler");
var cors = require('cors')


require("dotenv/config");

//Route middleware
app.options('*', cors());

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PATCH, DELETE');
    next();
});
app.use(express.json());
//app.use('/api/user', authRoute);
app.use('/api/beacon', beaconData);
app.use(cors());

app.listen(3000, () => console.log("Express"));

try{
mongoose.connect(process.env.DB_CONNECTION, { useUnifiedTopology: true, useNewUrlParser: true })
    .then(() => console.log('Now connected to MongoDB!'))
    .catch(err => console.error('Something went wrong', err));
}catch(error){
    console.log(error);
}




