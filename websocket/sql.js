const sql = require('../common/sql');

const run = (ws, req) => {
  sql(req, response => {
    response.date = new Date();
    ws.send(JSON.stringify(response));
  });
};

module.exports = (ws, req) => {
  run(ws, req);
  setTimeout(() => {
    run(ws, req);
  }, 10000);
};
