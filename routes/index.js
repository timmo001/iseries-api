module.exports = (app, jsonParser) => {
  app.get('/', (_req, res) => {
    res.render('index', { title: 'iSeries API' });
  });
  require('./sql')(app, jsonParser);
  require('./insert')(app, jsonParser);
  require('./update')(app, jsonParser);
  require('./ifs')(app, jsonParser);
  require('./pgm')(app, jsonParser);
  require('./message')(app, jsonParser);
};
