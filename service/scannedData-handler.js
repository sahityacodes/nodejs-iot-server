const Beacon = require('../models/Beacon');

async function addBeacons(payload) {
  if (payload.includes("BEACONID")) {
    var obj = JSON.parse(payload);
    if (typeof obj === 'object') {
      const beacon = new Beacon({
        beaconId: obj.BEACONID,
        status: obj.STATUS,
        inTime: obj.INTIME,
        outTime: obj.OUTTIME
      });
      let beaconExists = await Beacon.exists({ beaconId: obj.BEACONID });
      if (beaconExists === false) {
        setTimeout(() => {  beacon.save(); }, 300); 
        console.log("New Beacon Added");
      } else {
        Beacon.findOne({ beaconId: obj.BEACONID }, async function (err, doc) {
          if (doc.status != obj.STATUS) {
            Beacon.updateOne(doc, { status: obj.STATUS, inTime: obj.INTIME, outTime: obj.OUTTIME }, function () {
              console.log("Updated the beacon");
            });
          }
        });
      }

    }
  }
}

getLimit = () => {
  return Beacon.countDocuments({});
}

module.exports = { addBeacons, getLimit };
