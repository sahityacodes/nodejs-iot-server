const Nexmo = require('nexmo');

function sendMessage(){
    const nexmo = new Nexmo({
        apiKey: '4edd0c06',
        apiSecret: 'Los6ZGfB0IVdwLV7',
      });
      
      const from = 'Server';
      const to = '393480586891';
      const text = 'Too many people in Room 101 on floor 1';
    nexmo.message.sendSms(from, to, text);
}
module.exports = { sendMessage };
