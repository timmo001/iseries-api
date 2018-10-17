const respond = require('./respond');
let interval;

class Run {
  constructor(ws, message, func) {
    func(message, res => respond(ws, message.request, res));
    interval = setInterval(() => {
      if (message.get_columns) message.get_columns = false;
      func(message, res => respond(ws, message.request, res));
    }, message.update_ms || 10000);
  }
  stop() {
    clearInterval(interval);
  }
}

module.exports = Run;
