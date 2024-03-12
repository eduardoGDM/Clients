import { PrismaClient } from "@prisma/client";
import { error } from "console";
import prismaClient from "../prisma";
interface DeleteCustomerProps {
  id: string;
}
class DeleteCustomerService {
  async execute({ id }: DeleteCustomerProps) {
    if (!id) {
      throw new Error("Solicitacao invalida");
    }
    const findCustomer = await prismaClient.customer.findFirst({
      //metodo get para buscar o objeto no banco
      where: {
        id: id,
      },
    });
    if (!findCustomer) {
      //se nao encontrar no banco
      throw new Error("Cliente nao exsite");
    }
    await prismaClient.customer.delete({
      //metodo para deletar um objeto
      where: {
        // filtro deletar apenas um item
        id: findCustomer.id, //id especifico para deletar
      },
    });
    return { message: "Deletado com sucesso" };
  }
}

export { DeleteCustomerService };
