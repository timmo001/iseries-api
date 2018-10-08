const WebSocket = require('ws'),
  Run = require('./run');

module.exports = server => {
  const wss = new WebSocket.Server({ server });
  wss.on('connection', ws => {
    let runningFuncs = [];
    console.log('New WS Connection');
    ws.on('message', message => {
      message = JSON.parse(message);
      runningFuncs.map(rf => rf.name === message.request && rf.runner.stop());
      switch (message.request) {
        case 'sql':
          runningFuncs.push({
            name: message.request,
            runner: new Run(ws, message, require('./sql'))
          });
          break;
      }
    }).on('close', () => {
      runningFuncs.map(rf => rf.runner.stop());
    });
  });
};
