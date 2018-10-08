const sql = require('../common/sql');

const run = (ws, req) => {
  sql(req, response => {
    response.date = new Date();
    ws.send(JSON.stringify(response));
    console.log(`Response to '${req.request}' sent.`);
  });
};

module.exports = (ws, req) => {
  run(ws, req);
  setInterval(() => {
    run(ws, req);
  }, 10000);
};
