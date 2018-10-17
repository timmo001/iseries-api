module.exports = (app, jsonParser) => {
  app.post('/ifs/read', jsonParser, (req, res) => {
    if (!req.body.username) { console.log('Bad username'); res.status(400).send('No username! You must provide one!'); }
    else if (!req.body.password) { console.log('Bad password'); res.status(400).send('No password! You must provide one!'); }
    else if (!req.body.hostname) { console.log('Bad hostname'); res.status(400).send('No hostname! You must provide one!'); }
    else if (!req.body.path) { console.log('Bad path'); res.status(400).send('No path! You must provide one!'); }
    else {
      const config = { host: req.body.hostname, user: req.body.username, password: req.body.password };
      const pool = require('node-jt400').pool(config);
      const readStream = pool.ifs().createReadStream(req.body.path);
      res.status(200);
      readStream.pipe(res);
    }
  });
  app.post('/ifs/delete', jsonParser, (req, res) => {
    if (!req.body.username) { console.log('Bad username'); res.status(400).send('No username! You must provide one!'); }
    else if (!req.body.password) { console.log('Bad password'); res.status(400).send('No password! You must provide one!'); }
    else if (!req.body.hostname) { console.log('Bad hostname'); res.status(400).send('No hostname! You must provide one!'); }
    else if (!req.body.path) { console.log('Bad path'); res.status(400).send('No path! You must provide one!'); }
    else {
      const config = { host: req.body.hostname, user: req.body.username, password: req.body.password };
      const pool = require('node-jt400').pool(config);
      pool.ifs().deleteFile(req.body.path)
        .then(success => {
          if (success) res.status(200).json({ result: `Delete ${req.body.path} successful` })
          else res.status(500).json({ result: `Error deleting ${req.body.path}` });
        });
    }
  });
  app.post('/ifs/write', jsonParser, (req, res) => {
    if (!req.body.username) { console.log('Bad username'); res.status(400).send('No username! You must provide one!'); }
    else if (!req.body.password) { console.log('Bad password'); res.status(400).send('No password! You must provide one!'); }
    else if (!req.body.hostname) { console.log('Bad hostname'); res.status(400).send('No hostname! You must provide one!'); }
    else if (!req.body.path) { console.log('Bad path'); res.status(400).send('No path! You must provide one!'); }
    else if (!req.body.data) { console.log('Bad data'); res.status(400).send('No data! You must provide some!'); }
    else {
      const config = { host: req.body.hostname, user: req.body.username, password: req.body.password };
      const pool = require('node-jt400').pool(config);
      const writeStream = pool.ifs().createWriteStream(req.body.path);
      writeStream.write(req.body.data, error => {
        if (error) res.status(500).json({ result: `Error writing to ${req.body.path}`, data: error });
        else res.status(200).json({ result: `Write to ${req.body.path} successful` });
      });
    }
  });
};
