// server.js
import fastify from 'fastify';
import { contatoRoutes } from './routes/contato.routes.js';

const server = fastify({ logger: true });
const port = 3000;

// Registrar rotas com prefixo /api
server.register(contatoRoutes, { prefix: '/api' });

// Iniciar o servidor
server.listen({ port, host: '0.0.0.0' })
  .then(address => console.log(`Servidor rodando em ${address}`))
  .catch(err => {
    console.error('Erro ao iniciar o servidor:', err);
    process.exit(1);
  });
