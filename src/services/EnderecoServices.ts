import { getCustomRepository, Repository } from "typeorm"
import axios from "axios"
import { Cliente } from "../model/Cliente"
import { Endereco } from "../model/Endereco"
import { ClienteRepository } from "../repositories/ClienteRepository"
import { EnderecoRepository } from "../repositories/EnderecoRepository"

interface IEnderecos{
    cnpj: string,
    enderecos: Endereco[]
}

class EnderecosService {
    private enderecoRepository: Repository<Endereco>
    private clienteRepository: Repository<Cliente>
    constructor() {
        this.enderecoRepository = getCustomRepository(EnderecoRepository)
        this.clienteRepository = getCustomRepository(ClienteRepository)
    }

    async create(endereco: IEnderecos){
        const { cnpj } = endereco;
        let newEnderecos = endereco.enderecos as Endereco[]
        
        const cliente = await this.clienteRepository.findOne({where: {cnpj: cnpj}})
        
        for (const iterator of newEnderecos) {
            let retorno = await axios.get(`https://maps.googleapis.com/maps/api/geocode/json?address=${iterator.numero},${iterator.endereco},${iterator.bairro},${iterator.cidade},${iterator.estado},${iterator.cep}&key=${process.env.YOUR_API_KEY}`)
            
            if(retorno.data.status !== 'OK'){
                throw new Error("Error na API Google");
            } else {
                iterator.latitude = retorno.data.results[0].geometry.location.lat
                iterator.longitude = retorno.data.results[0].geometry.location.lng
                iterator.cliente = cliente
            }
        }

        if(cliente){
            await this.enderecoRepository.save(newEnderecos)
        } else {
            throw new Error("Cliente N Existe");
        }
    }

    async delete(id: number){
        await this.enderecoRepository.delete({id: id})
    }

    async putEndereco(endereco: Endereco){
        const { id } = endereco
        await this.enderecoRepository.createQueryBuilder().update(Endereco).set({...endereco}).where("id = :id",{id})
        .execute()
    }

}

export { EnderecosService }