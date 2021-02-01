const keys = require('./keys');
const express = require('express');
const bodyParser = require('body-parser');
const redis = require('redis');
const { Pool } = require('pg');
const cors = require('cors');

/// Express
const app = express();
app.use(cors());
app.use(bodyParser.json());

app.get('/', (req, res) => {
  res.send('Hi!');
});

app.get('/values/all', async (req, res) => {
  const values = await pgClient.query('SELECT * FROM values');
  res.send(values.rows);
});

app.get('/values/current', async (req, res) => {
  redisClient.hgetall('values', (err, values) => {
    res.send(values);
  });
});

app.post('/values', async (req, res) => {
  const index = req.body.index;
  
  if(parseInt(index) > 40){
    return res.status(422).send('Index too high');
  }
  
  redisClient.hset('values', index, 'Nothing yet!');
  redisPublisher.publish('insert', index);
  pgClient.query('INSERT INTO values(number) VALUES($1)', [index]);
  
  res.send({working: true});
});

app.listen(5000, err => {
  console.log('Listening on PORT 500');
})

/// Postgres
const pgClient = new Pool({
  user: keys.pg.user,
  password: keys.pg.pass,
  host: keys.pg.host,
  port: keys.pg.port,
  database: keys.pg.db
});

pgClient.on('connect', () => {
  pgClient.
    query('CREATE TABLE IF NOT EXISTS values (number INT)').
    catch(err => console.log(err))
});

/// Redis
const redisClient = redis.createClient({
  host: keys.redis.host,
  port: keys.redis.port,
  retry_strategy: () => 1000
});

const redisPublisher = redisClient.duplicate();


