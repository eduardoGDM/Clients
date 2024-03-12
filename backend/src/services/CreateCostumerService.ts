import prismaClient from "../prisma";

interface CreateCustomerProps {
  name: string;
  email: string;
}

class CreateCustomerService {
  async execute({ name, email }: CreateCustomerProps) {
    //o método execute espera receber o nome,email e name
    if (!name || !email) {
      throw new Error("Preencha todos os campos");
    }
    const customer = await prismaClient.customer.create({
      //espera a ORM prismaClient onde o customer é um modelo da tabela ja gerada pelo prisma
      data: {
        //passo os itens ja declarados anteriormente declarados no schema.prisma
        name,
        email,
        status: true,
      },
    }); //
    return customer;
  }
}

export { CreateCustomerService };
