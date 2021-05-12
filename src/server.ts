import express from "express";
import "./db/config";
const server = express();
import "reflect-metadata";
import { routes } from "./routes";
import dotenv from "dotenv";
import swaggerUi from "swagger-ui-express"
import * as swaggerDocument from "./swagger.json";


dotenv.config()

//usar,liberar o req.body
server.use(express.json())

//Rotas
server.use(routes)
server.use("/swagger", swaggerUi.serve, swaggerUi.setup(swaggerDocument))

server.listen(3000, () => console.log('Rodando na Porta 3000'))