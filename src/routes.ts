import { Router } from "express";
import { ClienteController } from "./controllers/ClienteController";
import { EnderecoController } from "./controllers/EnderecoController";

const routes = Router();

const clienteController = new ClienteController()
const enderecoController = new EnderecoController()

routes.get("/clientes", clienteController.listarTodosClientes);
routes.delete("/cliente/:cnpj", clienteController.DeletarClientePorCNPJ);
routes.post("/cliente", clienteController.adicionarCliente);
routes.put("/cliente", clienteController.alterarCliente);

routes.post("/endereco", enderecoController.adicionarEndereco);
routes.delete("/endereco/:id", enderecoController.DeletarEnderecoPorId)
routes.put("/endereco", enderecoController.alterarCliente)


export { routes }