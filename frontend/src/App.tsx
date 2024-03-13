("");
import { FiTrash } from "react-icons/fi";
import { api } from "./services/api";
import { useEffect, useState, useRef, FormEvent } from "react";

interface CustomerProps {
  id: string;
  name: string;
  email: string;
  status: string;
  created_at: string;
}

export default function App() {
  const [customers, setCustomers] = useState<CustomerProps[]>([]); //repasso a tipagem feita na interface para os objetos encaminhados para o useState
  const nameRef = useRef<HTMLInputElement | null>(null);
  const emailRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    loadCustomers();
  }, []);

  async function loadCustomers() {
    const response = await api.get("/costumers"); //requisição referente a listagem total de elementos
    setCustomers(response.data); //passa os dados para o useState e armazena em costumers
    console.log(response.data);
  }

  async function handleSubmit(event: FormEvent) {
    event.preventDefault();

    if (!nameRef.current?.value || !emailRef.current?.value) return; //verificação para que nao sejam enviados dados vazios.

    const response = await api.post("/costumer", {
      //faz a requisição para utilizar o metodo post e enviar os dados para a API
      name: nameRef.current?.value,
      email: emailRef.current?.value,
    });
    setCustomers((allCostumers) => [...allCostumers, response.data]); //pego todos os dados ja armazenados,adiciono os novos dados adicionados
    nameRef.current.value = "";
    emailRef.current.value = "";
  }

  async function handleDelete(id: string) {
    try {
      await api.delete("/costumer", {
        params: {
          id: id,
        },
      });

      const allCostumers = customers.filter((customer) => customer.id !== id); //filtro para atualizar a listagem, indicando que o ID que foi selecionado devera ser filtrado e nao aparecera mais na listagem do costumer
      setCustomers(allCostumers);
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <div className="w-full min-h-screen bg-gray-900 flex justify-center px-4">
      <main className="my-10 w-full md:max-w-2xl ">
        <h1 className="text-4xl font-medium text-white">Clientes</h1>

        <form className="flex flex-col my-6" onSubmit={handleSubmit}>
          <label className="font-medium text-white">Nome:</label>
          <input
            className="w-full mb-5 p-2 rounded-lg"
            type="text"
            placeholder="Digite seu nome completo..."
            ref={nameRef}
          />
          <label className="font-medium text-white">Email:</label>
          <input
            className="w-full mb-5 p-2 rounded-lg"
            type="email"
            placeholder="Digite seu email completo..."
            ref={emailRef}
          />
          <input
            type="submit"
            value="Cadastrar"
            className="cursor-pointer w-full p-2 bg-green-500 rounded font-medium"
          />
        </form>

        <section className="flex flex-col gap-4">
          {customers.map((customer) => (
            <article
              key={customer.id}
              className="w-full bg-white rounded p-2 relative hover:scale-105 duration-200"
            >
              <p className="font-medium">
                <span>Nome:</span>
                {customer.name}
              </p>
              <p className="font-medium">
                <span>Emai:</span> {customer.email}
              </p>
              <p className="font-medium">
                <span>Status:</span>
                {customer.status ? "Ativo" : "Inativo"}
              </p>
              <button
                onClick={() => handleDelete(customer.id)}
                className="bg-red-500 w-7 h-7 flex items-center justify-center rounded-lg absolute right-0 -top-2"
              >
                <FiTrash size={18} color="#fff" />
              </button>
            </article>
          ))}
        </section>
      </main>
    </div>
  );
}
