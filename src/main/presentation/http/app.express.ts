import express from "express";
import dotenv from "dotenv";
import helmet from "helmet";
import path from "path";

///////////////////////////////////

import { apiv1Router } from "./rest/api.v1";
import { customMorgan } from "./middlewares/custom-morgan.middleware";
import { errorLogger } from "./middlewares/error-logger.middleware";
import { invalidPath } from "./middlewares/invalid-path.middleware";
import { errorResponder } from "./middlewares/error-responser.middleware";

import fs from "fs";
import swaggerDocs from "./swagger.json";

const swaggerUi = require("swagger-ui-express");

dotenv.config();

const server = express();

server.use(helmet()); //O Helmet proteger o seu aplicativo de algumas vulnerabilidades da web bastante conhecidas configurando os cabeçalhos HTTP adequadamente.
server.use(express.json()); //Configura o cabeçalho de resposta tornar as resposta da API em JSON.
server.use(express.urlencoded({ extended: true })); //Lida com dados de requisição, exemplo pega o body em qualquer requisição, não apenas no POST./
server.use(express.static(path.join(__dirname, "../public")));

server.get("/main", (req, res) => {
    res.json({ rota: "main" });
});

// Criação do diretório de uploads
const uploadDir = path.join(__dirname, "../uploads");
if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir);
}

server.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocs));

//Middleware Customizados
server.use(customMorgan);
// Serve a pasta de uploads como estática
server.use("/uploads", express.static(uploadDir));

//Middlewares de Rotas
server.use("/api/v1", apiv1Router);

//Middleware de Tratamento de Erros (Error Handling)
server.use(invalidPath);
server.use(errorLogger);
server.use(errorResponder);

server.listen(3000, () => {
    console.log(`Servidor rodando em http://localhost:${process.env.PORT}`);
});
