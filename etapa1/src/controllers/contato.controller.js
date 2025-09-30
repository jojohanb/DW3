import { ContatoModel } from '../models/contato.model.js';

export class ContatoController {
  constructor() {
    this.contatoModel = new ContatoModel();
  }

  getContatos(request, reply) {
    const contatos = this.contatoModel.findAll();
    return reply.send(contatos);
  }

  getContatoById(request, reply) {
    const { id } = request.params;
    const contato = this.contatoModel.findById(id);

    if (!contato) {
      return reply.code(404).send({ message: 'Contato não encontrado' });
    }
    return reply.send(contato);
  }

  createContato(request, reply) {
    const novoContato = this.contatoModel.create(request.body);
    return reply.code(201).send(novoContato);
  }

  updateContato(request, reply) {
    const { id } = request.params;
    const contatoAtualizado = this.contatoModel.update(id, request.body);

    if (!contatoAtualizado) {
      return reply.code(404).send({ message: 'Contato não encontrado' });
    }
    return reply.send(contatoAtualizado);
  }

  deleteContato(request, reply) {
    const { id } = request.params;
    const sucesso = this.contatoModel.remove(id);

    if (!sucesso) {
      return reply.code(404).send({ message: 'Contato não encontrado' });
    }
    return reply.code(204).send();
  }
}
