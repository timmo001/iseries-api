const query = (pool, query, cb) => {
  pool.query(query)
    .then(result => {
      cb({ OK: true, result: result });
    })
    .fail(error => {
      console.log('error:', error);
      cb({ OK: false, result: error });
    });
};

module.exports = (req, cb) => {
  if (!req.username) { console.log('Bad username'); cb({ OK: false, result: 'No username! You must provide one!' }); }
  else if (!req.password) { console.log('Bad password'); cb({ OK: false, result: 'No password! You must provide one!' }); }
  else if (!req.hostname) { console.log('Bad hostname'); cb({ OK: false, result: 'No hostname! You must provide one!' }); }
  else if (!req.command) { console.log('Bad command'); cb({ OK: false, result: 'No command! You must provide one!' }); }
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

          const columns = [];
          tables.map(table => {
            table = table.toUpperCase();
            let schemaSepIndex = table.indexOf('/');
            if (schemaSepIndex < 0) schemaSepIndex = table.indexOf('.');
            return query(pool, `SELECT * FROM SYSCOLUMNS WHERE TBNAME = '${
              table.substr(schemaSepIndex + 1)
              }'`, result => {
                const columnsInner = [];
                result.result.map(r => {
                  if (r.TABLE_SCHEMA === table.substr(0, schemaSepIndex))
                    columnsInner.push(r);
                });
                columns.push({ table, data: columnsInner });
              });
          });

          require('wait-until')(100, 1000, () => columns.length === tables.length, () => {
            cb({ OK: true, columns, result: result.result });
          });

        } else cb(result);
      });
    } else if (req.command.toUpperCase().startsWith('UPDATE')) {
      pool.update(req.command).then(nUpdated => {
        const result = 'Updated ' + nUpdated + ' rows';
        console.log(result);
        cb({ OK: true, result });
      })
        .fail(error => {
          console.log('error:', error);
          cb({ OK: false, result: error });
        });
    } else if (req.command.toUpperCase().startsWith('DELETE')) {
      pool.update(req.command).then(nUpdated => {
        const result = 'Deleted ' + nUpdated + ' rows';
        console.log(result);
        cb({ OK: true, result });
      })
        .fail(error => {
          console.log('error:', error);
          cb({ OK: false, result: error });
        });
    } else if (req.command.toUpperCase().startsWith('INSERT')) {
      pool.insertAndGetId(req.command).then(id => {
        const result = 'Inserted new row with id ' + id;
        console.log(result);
        cb({ OK: true, result: { result, id } });
      })
        .fail(error => {
          console.log('error:', error);
          cb({ OK: false, result: error });
        });
    }
  }
};