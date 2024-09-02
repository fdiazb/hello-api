module.exports = function (fastify, opts, done) {
    // Mock database
    const users = [{ id: 1, name: 'John Doe' }];
  
    // JWT authentication hook
    fastify.addHook('onRequest', async (request, reply) => {
      try {
        await request.jwtVerify();
      } catch (err) {
        reply.send(err);
      }
    });
  
    // Get all users
    fastify.get('/users', async (request, reply) => {
      return users;
    });
  
    // Get user by ID
    fastify.get('/users/:id', async (request, reply) => {
      const user = users.find((u) => u.id === parseInt(request.params.id));
      if (!user) {
        return reply.status(404).send({ error: 'User not found' });
      }
      return user;
    });
  
    // Create a new user
    fastify.post('/users', async (request, reply) => {
      const newUser = { id: users.length + 1, ...request.body };
      users.push(newUser);
      return reply.status(201).send(newUser);
    });
  
    // Update a user
    fastify.put('/users/:id', async (request, reply) => {
      const id = parseInt(request.params.id);
      const index = users.findIndex((u) => u.id === id);
      if (index === -1) {
        return reply.status(404).send({ error: 'User not found' });
      }
      users[index] = { id, ...request.body };
      return users[index];
    });
  
    // Delete a user
    fastify.delete('/users/:id', async (request, reply) => {
      const id = parseInt(request.params.id);
      const index = users.findIndex((u) => u.id === id);
      if (index === -1) {
        return reply.status(404).send({ error: 'User not found' });
      }
      users.splice(index, 1);
      return { message: 'User deleted' };
    });
  
    done();
  };
  