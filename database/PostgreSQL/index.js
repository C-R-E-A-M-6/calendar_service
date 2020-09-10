const { Pool, Client } = require('pg');

const pool = new Pool({
  user: 'sdc',
  host: '3.101.40.240',
  database: 'properties',
});
pool.connect(() => (console.log('Connected to PostgreSQL server')));

const client = new Client({
  user: 'sdc',
  host: 'localhost',
  database: 'properties',
});
client.connect();

// client.query('SELECT NOW()', (err, res) => {
//   console.log('Connected to PostgreSQL');
//   // console.log(err, res);
//   client.end();
// });

module.exports = pool;