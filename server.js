require('dotenv').config();
const fastify = require('fastify')({ logger: true });
const fastifyJwt = require('fastify-jwt');

// Register plugins
fastify.register(fastifyJwt, { secret: process.env.JWT_SECRET });

// Register routes
fastify.register(require('./routes/auth'));
fastify.register(require('./routes/users'));
fastify.register(require('./routes/health'));

// Start server
const start = async () => {
  try {
    await fastify.listen({ port: 3000 });
    console.log('Server listening on http://localhost:3000');
  } catch (err) {
    fastify.log.error(err);
    process.exit(1);
  }
};

start();
