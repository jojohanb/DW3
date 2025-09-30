// server.js
const fastify = require('fastify')({ logger: true });

const port = 3000;

// --- Banco de Dados em Memória ---
const contatos = [];
let nextId = 1;

// --- ROTAS ---

// GET - Listar todos os contatos
fastify.get('/contatos', (request, reply) => {
  reply.send(contatos);
});

// GET - Buscar um único contato por ID
fastify.get('/contatos/:id', (request, reply) => {
  const id = parseInt(request.params.id);
  const contato = contatos.find(c => c.id === id);

  if (!contato) {
    return reply.code(404).send({ message: 'Contato não encontrado' });
  }
  reply.send(contato);
});

// POST - Criar um novo contato
fastify.post('/contatos', (request, reply) => {
  const { nome, telefone, email } = request.body;

  if (!nome || !email) {
    return reply.code(400).send({ message: 'Nome e email são obrigatórios' });
  }

  const novoContato = { id: nextId++, nome, telefone, email };
  contatos.push(novoContato);
  reply.code(201).send(novoContato);
});

// PUT - Atualizar um contato
fastify.put('/contatos/:id', (request, reply) => {
  const id = parseInt(request.params.id);
  const contatoData = request.body;
  const index = contatos.findIndex(c => c.id === id);

  if (index === -1) {
    return reply.code(404).send({ message: 'Contato não encontrado' });
  }

  contatos[index] = { ...contatos[index], ...contatoData };
  reply.send(contatos[index]);
});

// DELETE - Remover um contato
fastify.delete('/contatos/:id', (request, reply) => {
  const id = parseInt(request.params.id);
  const index = contatos.findIndex(c => c.id === id);

  if (index === -1) {
    return reply.code(404).send({ message: 'Contato não encontrado' });
  }

  contatos.splice(index, 1);
  reply.code(204).send();
});

// --- Iniciar o Servidor ---
fastify.listen({ port, host: '0.0.0.0' })
  .then(address => {
    console.log(`Servidor rodando em ${address}`);
  })
  .catch(err => {
    console.error('Erro ao iniciar o servidor:', err);
    process.exit(1);
  });
