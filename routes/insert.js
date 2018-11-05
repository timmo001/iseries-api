module.exports = (app, jsonParser) => {
  app.post('/insert', jsonParser, (req, res) => {
    require('../common/batchUpdate')('INSERT', req, res);
  });
};
