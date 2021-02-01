const keys = require('./keys');
const redis = require('redis');

const client = redis.createClient({
  host: keys.redis.host,
  port: keys.redis.port,
  retry_strategy: () => 1000
});
const subscriber = client.duplicate();
subscriber.subscribe('insert');

function fib(i){
  if(i < 2) return 1;
  return fib(i - 1) + fib( i -2);
}

subscriber.on('message', (channel, message) => {
  client.hset('values', message, fib(parseInt(message)));
});
