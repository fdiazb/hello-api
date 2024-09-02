module.exports = function (fastify, opts, done) {
    fastify.post('/auth/login', async (request, reply) => {
      const { username, password } = request.body;
  
      if (
        username === process.env.OAUTH_USERNAME &&
        password === process.env.OAUTH_PASSWORD
      ) {
        const token = fastify.jwt.sign({ username });
        return reply.send({ token });
      }
  
      return reply.status(401).send({ error: 'Invalid credentials' });
    });
  
    done();
  };
  