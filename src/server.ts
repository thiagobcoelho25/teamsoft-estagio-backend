import express from "express";
import "./db/config";
const server = express();
import "reflect-metadata";
import { routes } from "./routes"
import dotenv from "dotenv"

dotenv.config()

//usar,liberar o req.body
server.use(express.json())

//Rotas
server.use(routes)


server.listen(3000, () => console.log('Rodando na Porta 3000'))