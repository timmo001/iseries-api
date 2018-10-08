const WebSocket = require('ws');

module.exports = server => {
  const wss = new WebSocket.Server({ server });

  wss.on('connection', ws => {
    console.log('WS Connection:', ws);
    ws.send('Hello!');
    ws.on('message', incoming = (message) => {
      message = JSON.parse(message);
      switch (message.request) {
        case 'sql': require('./sql')(ws, message, {}); break;
      }
    });
    // ws.on('close', () => { });
  });
};
