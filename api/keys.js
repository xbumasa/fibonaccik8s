module.exports = {
  redis: {
    host: process.env.REDIS_HOST,
    port: process.env.REDIS_PORT
  },
  pg: {
    host: process.env.PGHOST,
    port: process.env.PGPORT,
    db: process.env.PGDATABASE,
    user: process.env.PGUSER,
    pass: process.env.PGPASSWORD
  }
};
