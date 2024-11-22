import { Mock, afterEach, beforeAll, describe, expect, test, vi, vitest } from "vitest";
import { MockProxy, mock, mockReset } from "vitest-mock-extended";
import { Request, Response } from "express";
import { CriarEventoProps } from "../../../../../../modules/eventos/domain/evento.types";
import { InserirEventoExpressController } from "./inserir-evento.express.controller";
import { InserirEventoUseCase } from "../../../../../../modules/eventos/application/use-cases/inserir-evento/inserir-evento-use-case";


let inserirEventoUseCaseMock:  MockProxy<InserirEventoUseCase>;
let requestMock: MockProxy<Request>;
let responseMock: MockProxy<Response>;
let nextMock: Mock;
let inserirEventoController: InserirEventoExpressController;

describe('Controller Express: Inserir Evento por ID', () => {

    beforeAll(async () => {
        inserirEventoUseCaseMock = mock<InserirEventoUseCase>();
        requestMock = mock<Request>();
        responseMock = mock<Response>();
        nextMock = vitest.fn();
        inserirEventoController = new InserirEventoExpressController(inserirEventoUseCaseMock);
    });

    afterEach(() => {
        vi.restoreAllMocks();
        mockReset(requestMock);
        mockReset(responseMock);
        mockReset(inserirEventoUseCaseMock);
    });

    test('Deve Inserir Um Evento por UUID', async () => {

        //Dado (Given)
        const eventoInputDTO: CriarEventoProps = {
            titulo: "Evento Chato e Sem Graça",
            descricao: "aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
            local: "Rua Não Sei Né",
            data: "04/05/2025",
            horario: '2222',
            banner:"https://google.com"
        };

        requestMock.body = eventoInputDTO;
        inserirEventoUseCaseMock.execute.mockResolvedValue(eventoInputDTO);
        responseMock.status.mockReturnThis();

        //Quando (When)
        await inserirEventoController.inserir(requestMock, responseMock, nextMock);

        //Então (Then)
        expect(inserirEventoUseCaseMock.execute).toHaveBeenCalledWith(eventoInputDTO);
        expect(responseMock.status).toHaveBeenCalledWith(200);
        expect(responseMock.json).toHaveBeenCalledWith(eventoInputDTO);
        expect(nextMock).not.toHaveBeenCalled();

    });

});