module.exports = (app, jsonParser) => {
  app.post('/update', jsonParser, (req, res) => {
    require('../common/batchUpdate')('UPDATE', req, res);
  });
};
