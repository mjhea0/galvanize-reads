module.exports = {

  development: {
    client: 'postgresql',
    connection: {
      database: 'galvanize_reads'
    },
    migrations: {
      directory: __dirname + '/src/server/db/migrations'
    },
    seeds: {
      directory: __dirname + '/src/server/db/seeds/dev'
    }
  },

};