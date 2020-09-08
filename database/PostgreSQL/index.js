const { Pool, Client } = require('pg');

const pool = new Pool({
  user: 'sdc',
  host: 'localhost',
  database: 'properties',
});
pool.connect();

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