const query = require('./query');

module.exports = (pool, table, cb) => {
  console.log('table:', table);
  query(pool, `SELECT * FROM QSYS2.SYSTABLES WHERE TABLE_NAME = '${table}'`, tblSchemas => {
    query(pool, `SELECT SCHEMA_NAME FROM QSYS2.LIBLIST ORDER BY ORDINAL_POSITION ASC`, schemas => {
      tblSchemas.map(tblSchema => {
        const schemaFound = schemas.find(schema => tblSchema.SCHEMA_NAME === schema.SCHEMA_NAME);
        if (schemaFound) {
          cb(schemaFound.SCHEMA_NAME);
          return;
        }
      });
    });
  });
};