const router = require('express').Router();
const Beacon = require('../models/Beacon');
var dateFormat = require("dateformat");
  
router.get('/', async (req, res) => {
    try{
      const beacons = await Beacon.find();
        res.send(beacons);
    }catch(err){
        res.status(400).send(err);
    }
});

module.exports = router;
