import prismaClient from "../prisma";

class ListCustomersService {
  async execute() {
    const customers = await prismaClient.customer.findMany(); //comando findMany() para buscar no banco todos os elementos armazenados na tabela customers

    return customers;
  }
}

export { ListCustomersService };
