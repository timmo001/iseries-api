const query = (pool, query, cb) => {
  pool.query(query)
    .then(result => {
      cb({ OK: true, message: result });
    })
    .fail(error => {
      console.log('error:', error);
      cb({ OK: false, message: error });
    });
};

module.exports = (req, cb) => {
  if (!req.username) { console.log('Bad username'); cb({ OK: false, message: 'No Username! You must provide one!' }); }
  else if (!req.password) { console.log('Bad password'); cb({ OK: false, message: 'No Password! You must provide one!' }); }
  else if (!req.hostname) { console.log('Bad hostname'); cb({ OK: false, message: 'No hostname! You must provide one!' }); }
  else if (!req.command) { console.log('Bad command'); cb({ OK: false, message: 'No command! You must provide one!' }); }
  else {
    const config = { host: req.hostname, user: req.username, password: req.password };
    const pool = require('node-jt400').pool(config);

    if (req.command.toUpperCase().startsWith('SELECT')) {
      query(pool, req.command, result => {
        if (req.get_columns) {
          const ignoredWords = ['join', 'inner', 'outer', 'where', 'order'], tables = [];
          let canAdd = false;
          req.command.toLowerCase().split(' ').map(c => {
            if (canAdd) {
              if (!ignoredWords.find(w => w === c)) tables.push(c);
              else canAdd = false;
            }
            if (c === 'from') canAdd = true;
          });

          console.log('tables:', tables);

          const columns = [];
          tables.map(table => {
            return query(pool, `SELECT * FROM SYSCOLUMNS WHERE TBNAME = '${table.toUpperCase()}'`, result => {
              columns.push({ table, data: result.message });
            });
          });
          require('wait-until')(100, 1000, () => columns.length === tables.length, () => {
            console.log({ OK: true, message: { columns, result } });
            cb({ OK: true, message: { columns, result: result.message } });
          });
        } else cb({ OK: true, message: result });
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