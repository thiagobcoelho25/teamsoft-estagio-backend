const { response } = require("express")
const Cliente = require("../model/Cliente")
const { ClienteValidation, CNPJValidation } = require("../validations/validations")

module.exports = {

    async listarTodosClientes(request, response) {

        const clientes = await Cliente.getTodosClientes();

        response.json(clientes)
    },

    async DeletarClientePorCNPJ(request, response) {
        try {
            const { cnpj } = request.params

            const { error, value } = CNPJValidation.validate({ cnpj: cnpj })

            if (error) {
                response.json({
                    error
                })
            } else {
                const clientes = await Cliente.deleteClienteByCNPJ(cnpj)

                response.json({ message: "Deleção Completa" })
            }
        } catch (err) {
            response.json({ message: "Deleção Completa" })
        }
    },

    async adicionarCliente(request, response) {
        try {
            let cliente = {
                cnpj: request.body.cnpj,
                "razao-social": request.body["razao-social"],
                contato: request.body.contato,
                telefone: request.body.telefone,
                enderecos: request.body.enderecos
            }

            const { error, value } = ClienteValidation.validate(cliente)

            if (error) {
                response.json({
                    error
                })
            } else {
                await Cliente.postCliente(cliente)

                response.json({ message: "Inserção Completa" })
            }
        } catch (error) {
            response.json({
                "mensagem de error": error.message
            })
        }
    },

    async alterarCliente(request, response) {
        try {
            let cliente = {
                cnpj: request.body.cnpj,
                "razao-social": request.body["razao-social"],
                contato: request.body.contato,
                telefone: request.body.telefone,
                enderecos: request.body.enderecos
            }

            const { error, value } = ClienteValidation.validate(cliente)

            if (error) {
                response.json({
                    error
                })
            } else {
                await Cliente.putCliente(cliente)

                response.json({ message: "Atualização Completa" })
            }
        } catch (error) {
            response.json({
                "mensagem de error": error.message
            })
        }
    }
}