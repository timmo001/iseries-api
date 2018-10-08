module.exports = (app, jsonParser) => {
  app.post('/insert', jsonParser, (req, res) => {
    if (!req.body.username) { console.log('Bad username'); res.status(400).send('No username! You must provide one!'); }
    else if (!req.body.password) { console.log('Bad password'); res.status(400).send('No password! You must provide one!'); }
    else if (!req.body.hostname) { console.log('Bad hostname'); res.status(400).send('No hostname! You must provide one!'); }
    else if (!req.body.table) { console.log('Bad table'); res.status(400).send('No table! You must provide one!'); }
    else if (!req.body.data) { console.log('Bad data'); res.status(400).send('No data! You must provide some!'); }
    else {
      const config = { host: req.body.hostname, user: req.body.username, password: req.body.password };
      const pool = require('node-jt400').pool(config),
        keys = Object.keys(req.body.data[0]);
      let values = [], dataArr = [];
      keys.map(() => values.push('?'));
      req.body.data.map(d => dataArr.push(Object.values(d)));

      pool.batchUpdate(`INSERT INTO ${req.body.table} (${keys.join(',')}) VALUES(${values.join(',')})`, dataArr)
        .then(result => {
          res.status(200).json({
            message: `Inserted ${result.length} rows`,
            result
          });
        });
    }
  });
};
