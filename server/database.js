const knex = require("knex")({
  client: "pg",
  connection: {
    host: "localhost",
    database: "pgLearning",
    password: "arridha",
    user: "amrad",
    port: 5432
  }
});
module.exports = knex;
