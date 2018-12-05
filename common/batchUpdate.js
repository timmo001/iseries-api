module.exports = (command, req, res) => {
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
    req.body.data.map(d => {
      let obj = Object.values(d);
      if (command === 'UPDATE') obj = [...obj, obj[0]];
      dataArr.push(obj);
    });

    if (command === 'UPDATE') {
      let set = 'SET ';
      keys.map(key => set += `${key} = ?, `);
      pool.batchUpdate(`UPDATE ${req.body.table} ${set.slice(0, -2)} WHERE ${keys[0]} = ?`, dataArr)
        .then(result => {
          pool.close();
          res.status(200).json({
            message: `Updated ${result.length} rows`,
            result
          });
        });
    } else {
      pool.batchUpdate(`INSERT INTO ${req.body.table} (${keys.join(',')}) VALUES(${values.join(',')})`, dataArr)
        .then(result => {
          pool.close();
          res.status(200).json({
            message: `Inserted ${result.length} rows`,
            result
          });
        });
    }
  }
};