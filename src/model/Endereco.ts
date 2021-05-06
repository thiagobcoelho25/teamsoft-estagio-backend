import { Column, Entity, JoinColumn, ManyToMany, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Cliente } from "./Cliente";

@Entity("table_endereco")
class Endereco {
    
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    endereco: string

    @Column()
    numero: number

    @Column({nullable: true})
    complemento: string

    @Column()
    bairro: string

    @Column()
    cidade: string

    @Column()
    estado: string

    @Column()
    cep: string

    @Column('decimal', { precision: 9, scale: 2 })
    latitude: number

    @Column('decimal', { precision: 9, scale: 2 })
    longitude: number

    @ManyToOne(() => Cliente, cliente => cliente.enderecos, { onDelete: 'CASCADE' })
    @JoinColumn({name: "id_fk_cliente"})
    cliente: Cliente
}

export { Endereco }


/*module.exports = {
    async getEnderecosByIdCliente(id_cliente){
        const db = await Database()

        const data = await db.get('SELECT * FROM table_endereco WHERE id_cliente_fk = ?', id_cliente)

        return ({
            "id-endereco": data["id_endereco"],
            endereco: data.endereco,
            numero: data.numero,
            complemento: data.complemento ? data.complemento : "",
            bairro: data.bairro,
            cidade: data.cidade,
            estado: data.estado,
            cep: data.cep,
            "id-cliente-fk": data.id_cliente_fk,
            latitude: data.latitude ? data.latitude : 0,
            longitude: data.longitude ? data.longitude : 0
        })

        await db.close()
    },

    async deleteEnderecoById(id_cliente){
        const db = await Database()

        await db.run(`DELETE FROM table_endereco WHERE id_cliente_fk = ${id_cliente}`, function(err) {
            if(err) throw new Error('Error na Deleção');
        })

        await db.close()
    },

    async postEndereco(cliente){
        const db = await Database();
        
        let endereco = cliente.enderecos

        await db.run(`INSERT INTO table_endereco(endereco,numero,complemento,bairro,cidade,estado,cep,id_cliente_fk,latitude,longitude)
        VALUES ("${endereco.endereco}", ${endereco.numero}, "${endereco.complemento}", "${endereco.bairro}", "${endereco.cidade}", "${endereco.estado}", "${endereco.cep}", ${cliente["id-cliente"]}, ${endereco.latitude}, ${endereco.longitude});`);

        await db.close()
    },
    
    async putEndereco(cliente){
        const db = await Database();
        
        let endereco = cliente.enderecos

        await db.run(`UPDATE table_endereco SET endereco="${endereco.endereco}",numero=${endereco.numero},
        complemento="${endereco.complemento}",bairro="${endereco.bairro}",
        cidade="${endereco.cidade}",estado="${endereco.estado}",
        cep="${endereco.cep}",latitude=${endereco.latitude},longitude=${endereco.longitude} WHERE id_cliente_fk=${cliente["id-cliente"]}`);

        await db.close()
    }
}*/