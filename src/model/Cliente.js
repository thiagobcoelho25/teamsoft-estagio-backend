const Database = require('../db/config');
const Endereco = require("./Endereco");
require('dotenv').config()
const axios = require("axios");

module.exports = {
    async getTodosClientes() {
        const db = await Database()

        const data = await db.all('SELECT * FROM table_cliente')

        await db.close()

        let clientes = []

        for (cliente of data) {
            clientes.push({
                "id-cliente": cliente["id_cliente"],
                cnpj: cliente.cnpj,
                "razao-social": cliente["razao_social"],
                contato: cliente.contato,
                telefone: cliente.telefone,
                enderecos: await Endereco.getEnderecosByIdCliente(cliente["id_cliente"]),
            })
        }

        return clientes
    },

    async deleteClienteByCNPJ(cnpj) {
        const db = await Database();

        await db.run(`DELETE FROM table_cliente WHERE cnpj like '%${cnpj}%'`,function(err) {
            if(err) throw new Error('Error na Deleção');
        })
        
        await db.close()
    },

    async postCliente(cliente){
        const db = await Database();
        
        await db.run(`INSERT INTO table_cliente(cnpj, contato, razao_social, telefone)
        VALUES ("${cliente.cnpj}", "${cliente.contato}", "${cliente["razao-social"]}", "${cliente.telefone}");`,function(err) {
            if(err) throw new Error('Error na Inserção');
        });
        
        cliente["id-cliente"] = await db.get("SELECT last_insert_rowid()")
        cliente["id-cliente"] = cliente["id-cliente"]['last_insert_rowid()']

        //criar requisição API Google Geocoding para pegar Lat e Long
        let retorno = await axios.get(`https://maps.googleapis.com/maps/api/geocode/json?address=${cliente.enderecos.numero},${cliente.enderecos.endereco},${cliente.enderecos.bairro},${cliente.enderecos.cidade},${cliente.enderecos.estado},${cliente.enderecos.cep}&key=${process.env.YOUR_API_KEY}`)
        retorno = retorno.data
        
        if(retorno.status !== 'OK'){
            throw new Error("Error na API Google");
        } else {
            cliente.enderecos.latitude = retorno.results[0].geometry.location.lat
            cliente.enderecos.longitude = retorno.results[0].geometry.location.lng
        }

        await Endereco.postEndereco(cliente)

        await db.close()
    },

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

}