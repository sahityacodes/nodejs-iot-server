const router = require('express').Router();
const { getDurationInactiveBeacons, getBeaconCountPerDayAndHour, getBeaconCountPerRoom } = require('../service/scannedData-handler');

router.get('/duration', async (req, res) => {
    try {
        getDurationInactiveBeacons(res);
    } catch (err) {
        res.status(400).send(err);
    }
});

router.get('/beaconCountPerDay', async (req, res) => {
    try {
        getBeaconCountPerDayAndHour(res);
    } catch (err) {
        res.status(400).send(err);
    }
});

router.get('/beaconCountPerRoom', async (req, res) => {
    try {
        getBeaconCountPerRoom(res);
    } catch (err) {
        res.status(400).send(err);
    }
});

module.exports = router;
