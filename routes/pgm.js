module.exports = (app, jsonParser) => {
  app.post('/pgm', jsonParser, (req, res) => {
    if (!req.body.username) { console.log('Bad username'); res.status(400).send('No username! You must provide one!'); }
    else if (!req.body.password) { console.log('Bad password'); res.status(400).send('No password! You must provide one!'); }
    else if (!req.body.hostname) { console.log('Bad hostname'); res.status(400).send('No hostname! You must provide one!'); }
    else if (!req.body.program) { console.log('Bad program'); res.status(400).send('No program! You must provide one!'); }
    else {
      const config = { host: req.body.hostname, user: req.body.username, password: req.body.password };
      const pool = require('node-jt400').pool(config);
      const pgm = pool.pgm(req.body.program, req.body.params);
      pgm(req.body.props).then(result => {
        res.status(200).json({ result });
      });
    }
  });
};
