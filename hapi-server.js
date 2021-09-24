// Knex
const knex = require("knex")({
  client: "pg",
  connection: {
    host: "localhost", // PostgreSQL server
    user: "", // Your user name
    password: "", // Your password
    database: "postgres" // Your database name
  }
});

// Objection
const objection = require("objection");
objection.Model.knex(knex);

// Models
// const Account = require("./models/Account");

// Hapi
const Joi = require("@hapi/joi"); // Input validation
const Hapi = require("@hapi/hapi"); // Server

const server = Hapi.server({
  host: "localhost",
  port: 3000,
  routes: {
    cors: true
  }
});

async function init() {
  // Show routes at startup.
  await server.register(require("blipp"));

  // Output logging information.
  await server.register({
    plugin: require("hapi-pino"),
    options: {
      prettyPrint: true
    }
  });

  // Configure static file service.
  await server.register(require("@hapi/inert"));

  // Configure routes.
  server.route([
  ]);

  // Start the server.
  await server.start();
}

process.on("unhandledRejection", err => {
  server.logger().error(err);
  process.exit(1);
});

// Go!
init();
