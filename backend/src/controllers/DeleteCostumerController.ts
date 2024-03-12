import fastify, { FastifyRequest, FastifyReply } from "fastify";
import { DeleteCustomerService } from "../services/DeleteCustomerService";

class DeleteCostumerController {
  async handle(request: FastifyRequest, reply: FastifyReply) {
    const { id } = request.query as { id: string }; //desconstrução da query, obtendo apenas o ID para realizar o metodo

    const custumerService = new DeleteCustomerService();

    const customer = await custumerService.execute({ id });
    reply.send(customer);
  }
}
export { DeleteCostumerController };
