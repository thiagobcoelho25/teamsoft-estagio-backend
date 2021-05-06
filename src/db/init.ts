const Database = require('./config')

const initDb = {
    async init() {

        const db = await Database()

        await db.exec(`CREATE TABLE table_cliente(
        id_cliente INTEGER PRIMARY KEY AUTOINCREMENT,
        cnpj VARCHAR(14) NOT NULL UNIQUE,
        razao_social VARCHAR(255) NOT NULL,
        contato VARCHAR(255) NOT NULL,
        telefone VARCHAR(20) NOT NULL
        );`);

        await db.exec(`CREATE TABLE table_endereco(
        id_endereco INTEGER PRIMARY KEY AUTOINCREMENT,
        endereco VARCHAR(255),
        numero INT NOT NULL,
        complemento VARCHAR(255),
        bairro VARCHAR(50) NOT NULL,
        cidade VARCHAR(50) NOT NULL,
        estado VARCHAR(50) NOT NULL,
        cep VARCHAR(8) NOT NULL,
        id_cliente_fk INTEGER NOT NULL,
        latitude DECIMAL(9,7),
        longitude DECIMAL(9,7),
        FOREIGN KEY (id_cliente_fk) REFERENCES table_cliente (id_cliente)
        ON DELETE CASCADE 
        );`);

        await db.run(`INSERT INTO table_cliente(cnpj, contato, razao_social, telefone)
        VALUES ("12345678910111", "Sr julio", "Industria Alimenticia lttp", "35214013");`);
        await db.run(`INSERT INTO table_cliente(cnpj, contato, razao_social, telefone)
        VALUES ("12131415161718", "Maria green", "Loja de Roupa Maria Claire", "999999999");`);

        await db.run(`INSERT INTO table_endereco(endereco,numero,complemento,bairro,cidade,estado,cep,id_cliente_fk,latitude,longitude)
        VALUES ("Rua sao jorge", 99, "Perto da ufes", "Goiabeiras", "Vitoria", "Espirito santo", "12345678", 1, -20.2812719, -40.3043105);`);
        await db.run(`INSERT INTO table_endereco(endereco,numero,bairro,cidade,estado,cep,id_cliente_fk,latitude,longitude)
        VALUES ("Rua Rio Branco", 10, "Goiabeiras", "Vila Velha", "Espirito santo", "87654321", 2, -20.3346243, -40.2847284);`);

        await db.close()
    }
}

initDb.init()