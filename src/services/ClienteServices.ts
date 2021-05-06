import { getCustomRepository, Repository } from "typeorm"
import axios from "axios"
import { Cliente } from "../model/Cliente";
import { Endereco } from "../model/Endereco";
import { ClienteRepository } from "../repositories/ClienteRepository";
import { EnderecoRepository } from "../repositories/EnderecoRepository"

class ClientesService {
    private clienteRepository: Repository<Cliente>
    private enderecoRepository: Repository<Endereco>

    constructor() {
        this.clienteRepository = getCustomRepository(ClienteRepository)
        this.enderecoRepository = getCustomRepository(EnderecoRepository)
    }

    async create(cliente: Cliente){
        let newCliente = this.clienteRepository.create(cliente)
        
        const clienteExist = await this.clienteRepository.findOne({cnpj: newCliente.cnpj})
        if(clienteExist){
            throw new Error("Error de usuario existente")
        }
        
        newCliente = await this.clienteRepository.save(newCliente)
        
        let newEndereco = this.enderecoRepository.create({...cliente.enderecos[0]})

        
        let retorno = await axios.get(`https://maps.googleapis.com/maps/api/geocode/json?address=${newEndereco.numero},${newEndereco.endereco},${newEndereco.bairro},${newEndereco.cidade},${newEndereco.estado},${newEndereco.cep}&key=${process.env.YOUR_API_KEY}`)
        
        if(retorno.data.status !== 'OK'){
            throw new Error("Error na API Google");
        } else {
            newEndereco.latitude = retorno.data.results[0].geometry.location.lat
            newEndereco.longitude = retorno.data.results[0].geometry.location.lng
        }
        
        newEndereco.cliente = newCliente
        await this.enderecoRepository.save(newEndereco)
        
    }

    async getAllClientes(){
        return await this.clienteRepository.find({relations: ["enderecos"]});
    }


    async deleteClienteByCNPJ(cnpj: string){
        await this.clienteRepository.delete({cnpj: cnpj})
    }

    async putClienteByCNPJ(cliente: Cliente){
        const cnpj = cliente.cnpj
        await this.clienteRepository.createQueryBuilder().update(Cliente).set({...cliente}).where("cnpj = :cnpj",{cnpj})
        .execute()
    }
}

export { ClientesService }