var mosca = require('mosca');
const { eventNames } = require('./models/Beacon');
var beacon = require('./service/scannedData-handler');
require("dotenv/config");

var settings = {
  port: 1883,
};

var server = new mosca.Server(settings, function () {
  console.log("Server running");
});


server.on("ready", function () {
  console.log("Server up");
});

// fired when a  client is connected
server.on("clientConnected", function (client) {
  console.log("client connected", client.id);
});

// fired when a message is received
server.on('published', function (packet, client) {
  beacon.addBeacons(packet.payload.toString());
});

// fired when a client subscribes to a topic
server.on("subscribed", function (topic, client) {
  console.log("subscribed : ", topic);
  beacon.getLimit().then((count) => {
    if (count >= 15) {
      server.publish(message);
    }
  });
});

// fired when a client subscribes to a topic
server.on("unsubscribed", function (topic, client) {
  console.log("unsubscribed : ", topic);
});

// fired when a client is disconnecting
server.on("clientDisconnecting", function (client) {
  console.log("clientDisconnecting : ", client.id);
});

// fired when a client is disconnected
server.on("clientDisconnected", function (client) {
  console.log("clientDisconnected : ", client.id);
});

var message = {
  topic: '/'+process.env.FLOOR_NO+'/'+process.env.ROOM_NO,
  payload: { Limit: "Limit Reached" },
  qos: 2,
  retain: true
};




module.exports = { server };