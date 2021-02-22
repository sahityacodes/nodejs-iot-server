const mongoose = require('mongoose');
var dateFormat = require("dateformat");

const BeaconSchema = mongoose.Schema({
    beaconId: {
        type: String,
    },
    inTime: {
        type: Date,
    },
    outTime: {
        type: Date,
    },
    status: {
        type: String,
    }
});

module.exports = mongoose.model('Beacon', BeaconSchema);