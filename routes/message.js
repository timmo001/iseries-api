module.exports = (app, jsonParser) => {
  app.post('/message', jsonParser, (req, res) => {
    if (!req.body.username) { console.log('Bad username'); res.status(400).send('No username! You must provide one!'); }
    else if (!req.body.password) { console.log('Bad password'); res.status(400).send('No password! You must provide one!'); }
    else if (!req.body.hostname) { console.log('Bad hostname'); res.status(400).send('No hostname! You must provide one!'); }
    else if (!req.body.path) { console.log('Bad path'); res.status(400).send('No path! You must provide one!'); }
    else if (!req.body.message_id) { console.log('Bad message_id'); res.status(400).send('No message_id! You must provide one!'); }
    else {
      const config = { host: req.body.hostname, user: req.body.username, password: req.body.password };
      const pool = require('node-jt400').pool(config);
      const file = pool.openMessageFile({ path: req.body.path });
      res.status(200).send(file.readSync({ messageId: req.body.message_id }).getTextSync());
    }
  });
};
