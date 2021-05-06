import { Request, Response, } from "express"
import { CNPJValidation, ClienteValidation, ClienteCnpjInfoValidation } from "../validations/validations"
import { ClientesService } from "../services/ClienteServices"
import { Cliente } from "../model/Cliente"


class ClienteController {
    async adicionarCliente(request: Request, response: Response) {
        const clientesService = new ClientesService();

        try {
            let cliente = request.body as Cliente

            const { error, value } = ClienteValidation.validate(cliente)

            if (error) {
                response.json({
                    error
                })
            } else {
                await clientesService.create(cliente);
                
                response.json({ message: "Inserção Completa" })
            }
        } catch (error) {
            response.json({
                "mensagem-de-error": "Inserção Incompleta",
                "tipo-de-error": error.message
            })
        }
    }

    async listarTodosClientes(request: Request, response: Response){
        const clientesService = new ClientesService();

        try {
            const clientes = await clientesService.getAllClientes();
            
            response.json(clientes)
        } catch (error) {
            response.json({
                "mensagem-de-error": "Listagem Incompleta",
                "tipo-de-error": error.message
            })
        }
    }

    async DeletarClientePorCNPJ(request: Request, response: Response){
        const clientesService = new ClientesService();

        try {
            const { cnpj } = request.params

            const { error, value } = CNPJValidation.validate({ cnpj: cnpj })

            if (error) {
                response.json({
                    error
                })
            } else {
                await clientesService.deleteClienteByCNPJ(cnpj)

                response.json({ message: "Deleção Completa" })
            }
        } catch (err) {
            response.json({ message: "Deleção Incompleta" })
        }
    }

    async alterarCliente(request: Request, response: Response){
        const clientesService = new ClientesService();

        try {
            const cliente = request.body as Cliente

            const { error, value } = ClienteCnpjInfoValidation.validate(cliente)

            if (error) {
                response.json({
                    error
                })
            } else {
                await clientesService.putClienteByCNPJ(cliente)
                
                response.json({ message: "Atualização Completa" })
            }
        } catch (error) {
            response.json({
                "mensagem-de-error": "Atualização Incompleta",
                "tipo-de-error": error.message
            })
        }
    }

}

export { ClienteController }