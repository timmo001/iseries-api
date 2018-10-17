module.exports = (app, jsonParser) => {
  app.post('/sql', jsonParser, (req, res) => {
    require('../common/sql')(req.body, response => {
      res.status(response.OK ? 200 : 400).json(response);
    });
  });
};
