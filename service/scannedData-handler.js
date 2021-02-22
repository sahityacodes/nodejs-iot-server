const Beacon = require('../models/Beacon');


getLimit = () => {
  return Beacon.countDocuments({ 'status': 'ACTIVE' });
}

function getDurationInactiveBeacons(res) {
  Beacon.aggregate([
    {
      $match: {
        $and: [
          { status: "INACTIVE" },
          { $expr: { $eq: [21, { $dayOfMonth: "$inTime" }] } }, //new Date().getDate()
        ]
      }
    },
    {
      $project: {
        _id: 0,
        beaconId: 1,
        room: 1,
        duration: { $divide: [{ $subtract: ["$outTime", "$inTime"] }, 60000] }
      }
    }
  ]).exec((err, data) => {
    if (err) throw err;
    res.status(200).send(data);
  })
}


function getBeaconCountPerDayAndHour(res) {
  Beacon.aggregate(
    [
      {
        $group: {
          _id: {
            hour: { $floor: { $divide: [{ $hour: "$inTime" }, 2] } },
            day: { $dayOfMonth: "$inTime" },
            room: "$room"
          },
          beaconCount: {
            $sum: 1
          }
        },
      }, {
        $project: {
          day: "$_id.day",
          hours: "$_id.hours",
          _id: { room: 1, Hours: [{ $multiply: ["$_id.hour", 2] }, { $sum: [{ $multiply: ["$_id.hour", 2] }, 2] }], beaconCount: "$beaconCount" },
        }
      },
      {
        $sort: { day: 1,hours :1 }
      },
    ],
    function (err, result) {
      if (err) {
        console.log(err)
        res.send(err);
      } else {
        res.json(result);
      }
    }
  );
}

function getBeaconCountPerRoom(res) {
  Beacon.aggregate(
    [{
      $match: {
        $and: [
          { status: "ACTIVE" },
        ]
      }
    },
    {
      $group: {
        _id: "$room",
        beaconCount: {
          $sum: 1
        }
      },
    }, {
      $sort: { _id: 1 }
    }, {
      $project: {
        beaconCount: "$beaconCount",
        _id: 1
      }
    }
    ],
    function (err, result) {
      if (err) {
        res.send(err);
      } else {
        res.json(result);
      }
    }
  );
}

module.exports = { getLimit, getDurationInactiveBeacons, getBeaconCountPerDayAndHour, getBeaconCountPerRoom };
