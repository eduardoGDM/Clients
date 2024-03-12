import fastify, { FastifyRequest, FastifyReply } from "fastify";
import { CreateCustomerService } from "../services/CreateCostumerService";

class CreateCostumerController {
  async handle(request: FastifyRequest, reply: FastifyReply) {
    const { name, email } = request.body as { name: string; email: string }; //identifico oq vou rececber na request

    const customerService = new CreateCustomerService();
    const customer = await customerService.execute({ name, email });

    reply.send(customer);
  }
}
//Primeiro passo é receber esses dados
//Depois chamar o service referente a essa funcao createCustomerService
//Service recebe e faz uma verificação
//Depois controller valida os dados
//Depois devolve para o usuario
export { CreateCostumerController };
