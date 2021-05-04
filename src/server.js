const express = require('express');
const server = express();
const routes = require("./routes");

//usar,liberar o req.body
server.use(express.json())

//Rotas
server.use(routes)


//error Handling
/*server.use(
    function errorHandler(err, req, res, next) {
        res.json({
            "mensagem de error": err.message
        })
    }
)*/

server.listen(3000, () => console.log('Rodando na Porta 3000'))