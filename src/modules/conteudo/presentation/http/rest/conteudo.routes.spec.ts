import express, { Application } from "express";
import { afterEach, beforeAll, describe, expect, test, vi } from "vitest";
import { MockProxy, mock, mockReset } from "vitest-mock-extended";
import request from 'supertest';
import { CriarConteudoProps, IConteudo } from "../../../../../modules/conteudo/domain/conteudo.types";
import { InserirConteudoExpressController } from "./controllers/inserir-conteudo.express.controller";
import { RecuperarConteudoPorIdExpressController } from "./controllers/recuperar-conteudo-por-id.express.controller";

let appMock: Application;
let recuperarConteudoPorIdControllerMock: MockProxy<RecuperarConteudoPorIdExpressController>;
let inserirConteudoControllerMock: MockProxy<InserirConteudoExpressController>;

describe('[REST] Rotas Express: Conteudo', () => {

    beforeAll(async () => {
        appMock = express();
        recuperarConteudoPorIdControllerMock = mock<RecuperarConteudoPorIdExpressController>();
        inserirConteudoControllerMock = mock<InserirConteudoExpressController>();
    });

    afterEach(() => {
        vi.restoreAllMocks();
        mockReset(recuperarConteudoPorIdControllerMock);
        mockReset(inserirConteudoControllerMock);
    });

    describe('GET api/v1/conteudos/:id', () => {

        test('Deve Retornar Status 200 e um Objeto do Tipo IConteudo no formato JSON', async () => {

            //Dado (Given)
			const conteudoInputDTO: IConteudo = {
                id: "80830927-8c3e-4db9-9ddf-30ea191f139b",
                titulo: "Queria Saber",
                descricao: "sei naooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooo",
                categoria: "categoria teste",
                autor:"Deivid Pontes",
                banner:"https://aajajajjaja.com"
            }

            recuperarConteudoPorIdControllerMock.recuperar.mockImplementation(async (request, response, next) => {
                response.status(200).json(conteudoInputDTO);
            });

            appMock.use('/api/v1/conteudos/:id', recuperarConteudoPorIdControllerMock.recuperar);

            //Quando (When)
			const response = await request(appMock)
                .get('/api/v1/conteudos/80830927-8c3e-4db9-9ddf-30ea191f139b')

            //Então (Then
			expect(response.status).toEqual(200);
            expect(response.headers["content-type"]).toMatch(/json/);
            expect(response.body).toEqual(conteudoInputDTO);

        });

    });

    describe('POST api/v1/conteudos', () => {

        test('Deve Retornar Status 200 e um Objeto do Tipo IConteudo no formato JSON', async () => {

            //Dado (Given)
            const conteudoInputDTO: CriarConteudoProps = {
                titulo: "Queria Saber",
                descricao: "sei naooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooo",
                categoria: "categoria teste",
                autor:"Deivid Pontes",
                banner:"https://aajajajjaja.com"
            };

            const conteudoOutputDTO: IConteudo = {
                id: "80830927-8c3e-4db9-9ddf-30ea191f139b",
                titulo: "Queria Saber",
                descricao: "sei naooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooo",
                categoria: "categoria teste",
                autor:"Deivid Pontes",
                banner:"https://aajajajjaja.com"
            }

            inserirConteudoControllerMock.inserir.mockImplementation(async (request, response, next) => {
                response.status(200).json(conteudoOutputDTO);
            });

            appMock.use('/api/v1/conteudos', inserirConteudoControllerMock.inserir); // Cast to any for mocking purposes

			//Quando (When)
			const response = await request(appMock)
                .post('/api/v1/conteudos')
                .send(conteudoInputDTO)

            //Então (Then
			expect(response.status).toEqual(200);
            expect(response.headers["content-type"]).toMatch(/json/);
            expect(response.body).toEqual(conteudoOutputDTO);

        });	

    });

});