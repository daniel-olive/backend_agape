import dotenv from "dotenv";
import { createHTTPServer } from "./presentation/http/server";
import { prisma } from "./infra/database/orm/prisma/client";
import app from "./presentation/http/app.express";
import { logger } from "../shared/helpers/logger.winston";

async function bootstrap() {
    // logger.info(`Inicializando a API....🚀`);

    // //Carrega variáveis de ambiente do arquivo .env
    // dotenv.config();

    // const api_name = process.env.API_NAME;

    // logger.ok(`Carregando variáveis de ambiente do arquivo .env`);

    // const app: Application = await createExpressApplication();
    // logger.ok(`Aplicação Express Instanciada e Configurada`);

    // const httpServer = await createHTTPServer(app);
    // logger.ok('Servidor HTTP Instanciado e Configurado');

    // prisma.$connect().then(
    //     async () => {
    //         logger.ok(`Banco de Dados Conectado`);
    //     }
    // );

    async function bootstrap() {
        logger.info(`Inicializando a API....🚀`);

        // Carrega variáveis de ambiente do arquivo .env
        dotenv.config();

        const api_name = process.env.API_NAME;

        logger.ok(`Carregando variáveis de ambiente do arquivo .env`);

        logger.ok(`Aplicação Express Instanciada e Configurada`);

        const httpServer = await createHTTPServer(app); // Usa o app diretamente
        logger.ok("Servidor HTTP Instanciado e Configurado");

        prisma.$connect().then(() => {
            logger.ok(`Banco de Dados Conectado`);
        });
    }

    bootstrap().catch((error) => {
        logger.error(error.message);
    });
}

bootstrap().catch((error) => {
    logger.error(error.message);
});
