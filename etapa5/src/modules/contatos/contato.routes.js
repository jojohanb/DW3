import { ContatoRepository } from './contato.repository.js';
import { ContatoService } from './contato.service.js';
import { ContatoController } from './contato.controller.js';

// "Linha de montagem" para o módulo de contatos
const contatoRepository = new ContatoRepository();
const contatoService = new ContatoService(contatoRepository);
const contatoController = new ContatoController(contatoService);

export async function contatoRoutes(fastify, options) {
  fastify.get('/contatos', (request, reply) =>
    contatoController.getContatos(request, reply)
  );

  fastify.get('/contatos/:id', (request, reply) =>
    contatoController.getContatoById(request, reply)
  );

  fastify.post('/contatos', (request, reply) =>
    contatoController.createContato(request, reply)
  );

  fastify.put('/contatos/:id', (request, reply) =>
    contatoController.updateContato(request, reply)
  );

  fastify.delete('/contatos/:id', (request, reply) =>
    contatoController.deleteContato(request, reply)
  );
}
