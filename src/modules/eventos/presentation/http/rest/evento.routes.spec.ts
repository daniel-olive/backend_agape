import express, { Application } from "express";
import { afterEach, beforeAll, describe, expect, test, vi } from "vitest";
import { MockProxy, mock, mockReset } from "vitest-mock-extended";
import request from 'supertest';
import { CriarEventoProps, IEvento } from "../../../../../modules/eventos/domain/evento.types";
import { InserirEventoExpressController } from "./controllers/inserir-evento.express.controller";
import { RecuperarEventoPorIdExpressController } from "./controllers/recuperar-evento-por-id.express.controller";

let appMock: Application;
let recuperarEventoPorIdControllerMock: MockProxy<RecuperarEventoPorIdExpressController>;
let inserirEventoControllerMock: MockProxy<InserirEventoExpressController>;

describe('[REST] Rotas Express: Evento', () => {

    beforeAll(async () => {
        appMock = express();
        recuperarEventoPorIdControllerMock = mock<RecuperarEventoPorIdExpressController>();
        inserirEventoControllerMock = mock<InserirEventoExpressController>();
    });

    afterEach(() => {
        vi.restoreAllMocks();
        mockReset(recuperarEventoPorIdControllerMock);
        mockReset(inserirEventoControllerMock);
    });

    describe('GET api/v1/eventos/:id', () => {

        test('Deve Retornar Status 200 e um Objeto do Tipo IEvento no formato JSON', async () => {

            //Dado (Given)
			const eventoInputDTO: IEvento = {
                id: "80830927-8c3e-4db9-9ddf-30ea191f139b",
                titulo: "Não Sei Oque Colocar",
                descricao: "sei laaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
                local: "Não Sei Mesmo",
                data: "02/02/2022",
                horario: '8888',
                banner:"https://google.com"
            }

            recuperarEventoPorIdControllerMock.recuperar.mockImplementation(async (request, response, next) => {
                response.status(200).json(eventoInputDTO);
            });

            appMock.use('/api/v1/eventos/:id', recuperarEventoPorIdControllerMock.recuperar);

            //Quando (When)
			const response = await request(appMock)
                .get('/api/v1/eventos/80830927-8c3e-4db9-9ddf-30ea191f139b')

            //Então (Then
			expect(response.status).toEqual(200);
            expect(response.headers["content-type"]).toMatch(/json/);
            expect(response.body).toEqual(eventoInputDTO);

        });

    });

    describe('POST api/v1/eventos', () => {

        test('Deve Retornar Status 200 e um Objeto do Tipo IEvento no formato JSON', async () => {

            //Dado (Given)
            const eventoInputDTO: CriarEventoProps = {
                titulo: "Não Sei Oque Colocar",
                descricao: "sei laaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
                local: "Não Sei Mesmo",
                data: "02/02/2022",
                horario: '8888',
                banner:"https://google.com"
            };

            const eventoOutputDTO: IEvento = {
                id: "80830927-8c3e-4db9-9ddf-30ea191f139b",
                titulo: "Não Sei Oque Colocar",
                descricao: "sei laaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
                local: "Não Sei Mesmo",
                data: "02/02/2022",
                horario: '8888',
                banner:"https://google.com"
            }

            inserirEventoControllerMock.inserir.mockImplementation(async (request, response, next) => {
                response.status(200).json(eventoOutputDTO);
            });

            appMock.use('/api/v1/eventos', inserirEventoControllerMock.inserir); // Cast to any for mocking purposes

			//Quando (When)
			const response = await request(appMock)
                .post('/api/v1/eventos')
                .send(eventoInputDTO)

            //Então (Then
			expect(response.status).toEqual(200);
            expect(response.headers["content-type"]).toMatch(/json/);
            expect(response.body).toEqual(eventoOutputDTO);

        });	

    });

});