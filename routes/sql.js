module.exports = (app, jsonParser) => {
  app.post('/sql', jsonParser, (req, res) => {
    if (!req.body.username) { console.log('Bad username'); res.status(400).send('No Username! You must provide one!'); }
    else if (!req.body.password) { console.log('Bad password'); res.status(400).send('No Password! You must provide one!'); }
    else if (!req.body.hostname) { console.log('Bad hostname'); res.status(400).send('No hostname! You must provide one!'); }
    else if (!req.body.command) { console.log('Bad command'); res.status(400).send('No command! You must provide one!'); }
    else {
      const config = { host: req.body.hostname, user: req.body.username, password: req.body.password };
      const pool = require('node-jt400').pool(config);

      if (req.body.command.toUpperCase().startsWith('SELECT')) {
        pool.query(req.body.command)
          .then(result => {
            res.status(200).json(result);
          })
          .fail(error => {
            console.log('error:', error);
            res.status(400).send(error);
          });
      } else if (req.body.command.toUpperCase().startsWith('UPDATE')) {
        pool.update(req.body.command).then(nUpdated => {
          const message = 'Updated ' + nUpdated + ' rows';
          console.log(message);
          res.status(400).json({ message });
        })
          .fail(error => {
            console.log('error:', error);
            res.status(400).send(error);
          });
      } else if (req.body.command.toUpperCase().startsWith('DELETE')) {
        pool.update(req.body.command).then(nUpdated => {
          const message = 'Deleted ' + nUpdated + ' rows';
          console.log(message);
          res.status(400).json({ message });
        })
          .fail(error => {
            console.log('error:', error);
            res.status(400).send(error);
          });
      } else if (req.body.command.toUpperCase().startsWith('INSERT')) {
        pool.insertAndGetId(req.body.command).then(id => {
          const message = 'Inserted new row with id ' + id;
          console.log(message);
          res.status(200).json({ message, id });
        })
          .fail(error => {
            console.log('error:', error);
            res.status(400).send(error);
          });
      }
    }
  });
};
