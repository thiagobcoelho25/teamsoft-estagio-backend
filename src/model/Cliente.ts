/*const Database = require('../db/config');
import dotenv from "dotenv"; dotenv.config();
import axios from "axios";*/
import { Column, Entity, PrimaryColumn, OneToOne, JoinColumn, OneToMany } from "typeorm";
import { Endereco } from "./Endereco"

@Entity("table_cliente")
class Cliente {
    
    @PrimaryColumn()
    cnpj: string;

    @Column()
    "razao-social": string;

    @Column()
    contato: string;

    @Column()
    telefone: string;

    @OneToMany(type => Endereco, enderecos => enderecos.cliente)
    enderecos: Endereco[]

}

export { Cliente }

    /*
    async putCliente(cliente){
        const db = await Database();

        const data = await db.get(`SELECT id_cliente FROM table_cliente WHERE cnpj like "%${cliente.cnpj}%"`)
        cliente["id-cliente"] = data["id_cliente"]

        await db.run(`UPDATE table_cliente SET cnpj="${cliente.cnpj}",
                    contato="${cliente.contato}",
                    razao_social="${cliente["razao-social"]}",
                    telefone="${cliente.telefone}" WHERE id_cliente="${cliente["id-cliente"]}"`,function(err) {
            if(err) throw new Error('Error na Inserção');
        });
        
        //Pegar nova posicão lat, lng do novo endereço
        //criar requisição API Google Geocoding para pegar Lat e Long
        let retorno = await axios.get(`https://maps.googleapis.com/maps/api/geocode/json?address=${cliente.enderecos.numero},${cliente.enderecos.endereco},${cliente.enderecos.bairro},${cliente.enderecos.cidade},${cliente.enderecos.estado},${cliente.enderecos.cep}&key=${process.env.YOUR_API_KEY}`)
        retorno = retorno.data
        
        if(retorno.status !== 'OK'){
            throw new Error("Error na API Google");
        } else {
            cliente.enderecos.latitude = retorno.results[0].geometry.location.lat
            cliente.enderecos.longitude = retorno.results[0].geometry.location.lng
        }
        //alterar(PUT) Endereco
        await Endereco.putEndereco(cliente)

        await db.close()
    }

}*/