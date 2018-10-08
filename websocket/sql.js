const sql = require('../common/sql');

module.exports = (req, cb) => {
  sql(req, response => {
    cb(response);
  });
};
