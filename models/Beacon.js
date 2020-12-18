const mongoose = require('mongoose');
var dateFormat = require("dateformat");

const BeaconSchema = mongoose.Schema({
    beaconId: {
        type: String,
    },
    inTime: {
        type: String,
    },
    outTime: {
        type: String,
    },
    status: {
        type: String,
    }
});

module.exports = mongoose.model('Beacon', BeaconSchema);