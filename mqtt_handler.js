var mosca = require('mosca');
const { sendMessage } = require('./service/sms-service');
require("dotenv/config");

var settings = {
  port: 1883,
  http: { port: 8080, bundle:true, static: './' }
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
  console.log(packet.payload.toString());
  messageToClient(packet.payload.toString())
});

// fired when a client subscribes to a topic
server.on('subscribed', function (topic, client) {
  console.log("subscribed : ", topic);
});

// fired when a client subscribes to a topic
server.on('unsubscribed', function (topic, client) {
  console.log("unsubscribed : ", topic);
});

// fired when a client is disconnected
server.on("clientDisconnected", function (client) {
  console.log("clientDisconnected : ", client.id);
});

var message = {
  topic: '/1/101',
  payload: ''
};

function messageToClient(payload) {
  try{
  if(typeof JSON.parse(payload) === 'object' && JSON.parse(payload).length > 2){
      message.payload = "Limit Reached";
      server.publish(message);
      sendMessage();
  }
  }catch(err){
    console.log('Not a list');
  }
}

module.exports = { server };