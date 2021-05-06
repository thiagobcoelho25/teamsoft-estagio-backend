import { Request, Response, } from "express"
import { ClienteEnderecoValidation, NumberValidation, EnderecoValidation } from "../validations/validations"
import { EnderecosService } from "../services/EnderecoServices"
import { Endereco } from "../model/Endereco"

interface IEnderecos{
    cnpj: string,
    enderecos: Endereco[]
}

class EnderecoController {
    async adicionarEndereco(request: Request, response: Response){
        const enderecosService = new EnderecosService()

        try {
            const endereco = request.body as IEnderecos 

            const { error } = ClienteEnderecoValidation.validate(endereco);

            if (error) {
                response.json({
                    error
                })
            } else {
                await enderecosService.create(endereco);
                
                response.json({ message: "Inserção Completa" })
            }

        } catch (error) {
            response.json({
                "mensagem-de-error": "Inserção Incompleta",
                "tipo-de-error": error.message
            })
        }

    }

    async DeletarEnderecoPorId(request: Request, response: Response){
        const { id } = request.params

        const enderecosService = new EnderecosService();

        const { error } = NumberValidation.validate(id);

        try {
            if (error) {
                response.json({
                    error
                })
            } else {
                await enderecosService.delete(parseInt(id));
                
                response.json({ message: "Inserção Completa" })
            }
        } catch (error) {
           response.json({
                "mensagem-de-error": "Delecão Incompleta",
                "tipo-de-error": error.message
            }) 
        }

    }

    async alterarCliente(request: Request, response: Response){
        const enderecosService = new EnderecosService()

        const endereco = request.body as Endereco;

        try {
            const { error } = EnderecoValidation.validate(endereco);

            if (error) {
                response.json({
                    error
                })
            } else {
                await enderecosService.putEndereco(endereco)
                
                response.json({ message: "Alteração Completa" })
            }
        } catch (error) {
            response.json({
                "mensagem-de-error": "Alteração Incompleta",
                "tipo-de-error": error.message
            }) 
        }
    }

}

export { EnderecoController }