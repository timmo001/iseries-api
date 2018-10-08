module.exports = (req, cb) => {
  if (!req.username) { console.log('Bad username'); cb({ OK: false, message: 'No Username! You must provide one!' }); }
  else if (!req.password) { console.log('Bad password'); cb({ OK: false, message: 'No Password! You must provide one!' }); }
  else if (!req.hostname) { console.log('Bad hostname'); cb({ OK: false, message: 'No hostname! You must provide one!' }); }
  else if (!req.command) { console.log('Bad command'); cb({ OK: false, message: 'No command! You must provide one!' }); }
  else {
    const config = { host: req.hostname, user: req.username, password: req.password };
    const pool = require('node-jt400').pool(config);

    if (req.command.toUpperCase().startsWith('SELECT')) {
      pool.query(req.command)
        .then(result => {
          cb({ OK: true, message: result });
        })
        .fail(error => {
          console.log('error:', error);
          cb({ OK: false, message: error });
        });
    } else if (req.command.toUpperCase().startsWith('UPDATE')) {
      pool.update(req.command).then(nUpdated => {
        const message = 'Updated ' + nUpdated + ' rows';
        console.log(message);
        cb({ OK: true, message });
      })
        .fail(error => {
          console.log('error:', error);
          cb({ OK: false, message: error });
        });
    } else if (req.command.toUpperCase().startsWith('DELETE')) {
      pool.update(req.command).then(nUpdated => {
        const message = 'Deleted ' + nUpdated + ' rows';
        console.log(message);
        cb({ OK: true, message });
      })
        .fail(error => {
          console.log('error:', error);
          cb({ OK: false, message: error });
        });
    } else if (req.command.toUpperCase().startsWith('INSERT')) {
      pool.insertAndGetId(req.command).then(id => {
        const message = 'Inserted new row with id ' + id;
        console.log(message);
        cb({ OK: true, message: { message, id } });
      })
        .fail(error => {
          console.log('error:', error);
          cb({ OK: false, message: error });
        });
    }
  }
};