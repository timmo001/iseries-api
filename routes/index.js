const sql = require('./sql');

module.exports = (app, jsonParser) => {
  app.get('/', (req, res) => {
    res.render('index', { title: 'iSeries API' });
  });
  sql(app, jsonParser);
};
