const express = require('express');
const routes = express.Router();

const ClienteController = require("./controllers/ClienteController");



routes.get("/clientes", ClienteController.listarTodosClientes)
routes.delete("/cliente/:cnpj", ClienteController.DeletarClientePorCNPJ)
routes.post("/cliente", ClienteController.adicionarCliente)
routes.put("/cliente",ClienteController.alterarCliente);


module.exports = routes