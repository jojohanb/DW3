import fastify from 'fastify';
import { contatoRoutes } from './modules/contatos/contato.routes.js';
// futuramente, se tiver usuários:
// import { usuarioRoutes } from './modules/usuarios/usuario.routes.js';

const server = fastify({ logger: true });

// registrando as rotas com prefixos
server.register(contatoRoutes, { prefix: '/api/contatos' });
// server.register(usuarioRoutes, { prefix: '/api/usuarios' });

const port = 3000;

try {
  await server.listen({ port });
  console.log(`🚀 Servidor executando na porta ${port}`);
} catch (error) {
  console.error("Erro ao iniciar o servidor:", error);
  process.exit(1);
}
