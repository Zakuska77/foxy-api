const knex = require('knex');
const dbconnexion = knex({
    client: 'pg',
    connection: {
      connectionString: process.env.DATABASE_URL,
    },
  });
module.exports = dbconnexion;
