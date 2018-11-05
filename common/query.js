module.exports = (pool, query, cb) => {
  pool.query(query)
    .then(result => {
      cb({ OK: true, result: result });
    })
    .fail(error => {
      console.log('error:', error);
      cb({ OK: false, result: JSON.stringify(error.message) });
    });
};
