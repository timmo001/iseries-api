module.exports = (app, jsonParser) => {
  app.get('/', (req, res) => {
    res.render('index', { title: 'iSeries API' });
  });
  require('./sql')(app, jsonParser);
  require('./insert')(app, jsonParser);
};
