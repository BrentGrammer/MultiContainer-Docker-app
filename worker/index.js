const keys = require('./keys');
const redis = require('redis');

const redisClient = redis.createClient({
  host: keys.redisHost,
  port: keys.redisPort,
  // this tells redis to try to reconnect every 1 sec if server conn is lost:
  retry_strategy: () => 1000
});
// sub stands for subscription - watching redis to run work whenever a new value is inserted
const sub = redisClient.duplicate();

function fib(index) {
  if (index < 2) return 1;
  return fib(index - 1) + fib(index - 2);
}

sub.on('message', (channel, message) => {
  redisClient.hset('values', message, fib(parseInt(message)));
});
// this sets a listener for when a value is inserted into redis
sub.subscribe('insert');