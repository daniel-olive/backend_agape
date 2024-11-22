import { Request, Response } from "express";
import { Mock, afterEach, beforeAll, describe, expect, test, vi, vitest } from "vitest";
import { MockProxy, mock, mockReset } from "vitest-mock-extended";
import { RecuperarEventoPorIdUseCase } from "../../../../../../modules/eventos/application/use-cases/recuperar-evento-por-id/recuperar-evento-por-id-use-case";
import { RecuperarEventoPorIdExpressController } from "./recuperar-evento-por-id.express.controller";
import { IEvento } from "../../../../../../modules/eventos/domain/evento.types";
import { EventoApplicationExceptions } from "../../../../../../modules/eventos/application/evento.application.exception";
import { HttpError, HttpErrors } from "../../../../../../shared/presentation/http/http.error";


let requestMock: MockProxy<Request>;
let responseMock: MockProxy<Response>;
let nextMock: Mock;
let recuperarEventoPorIdUseCaseMock:  MockProxy<RecuperarEventoPorIdUseCase>;
let recuperarEventoPorIdController: RecuperarEventoPorIdExpressController;

describe('Controller Express: Recuperar Evento por ID', () => {

    beforeAll(async () => {
        requestMock = mock<Request>();
        responseMock = mock<Response>();
        nextMock = vitest.fn();
        recuperarEventoPorIdUseCaseMock = mock<RecuperarEventoPorIdUseCase>();
        recuperarEventoPorIdController = new RecuperarEventoPorIdExpressController(recuperarEventoPorIdUseCaseMock);
    });

    afterEach(() => {
        vi.restoreAllMocks();
        mockReset(requestMock);
        mockReset(responseMock);
        mockReset(recuperarEventoPorIdUseCaseMock);
    });

    test('Deve Recuperar Um Evento por UUID', async () => {

        //Dado (Given)
        const eventoInputDTO: IEvento = {
            id: "80830927-8c3e-4db9-9ddf-30ea191f139b",
            titulo: "Outro Evento teste",
            descricao: "testeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee",
            local: "Rua Teste Numero 1000",
            data: "01/01/2001",
            horario: '1212',
            banner:"https://google.com"
        }

        requestMock.params.id = eventoInputDTO.id as string;
        recuperarEventoPorIdUseCaseMock.execute.mockResolvedValue(eventoInputDTO);
        responseMock.status.mockReturnThis();

        //Quando (When)
        await recuperarEventoPorIdController.recuperar(requestMock, responseMock, nextMock);

        //Então (Then
		expect(recuperarEventoPorIdUseCaseMock.execute).toHaveBeenCalledWith(eventoInputDTO.id);
        expect(responseMock.status).toHaveBeenCalledWith(200);
        expect(responseMock.json).toHaveBeenCalledWith(eventoInputDTO);
        expect(nextMock).not.toHaveBeenCalled();

    });

    test('Deve Tratar uma Exceção de Evento Não Encontrado', async () => {

        //Dado (Given)
        const eventoInputDTO: IEvento = {
            id: "80830927-8c3e-4db9-9ddf-30ea191f139b",
            titulo: "Outro Evento teste",
            descricao: "testeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee",
            local: "Rua Teste Numero 1000",
            data: "01/01/2001",
            horario: '1212',
            banner:"https://google.com"
        }

        requestMock.params.id = eventoInputDTO.id as string;
        recuperarEventoPorIdUseCaseMock.execute.mockRejectedValue(new EventoApplicationExceptions.EventoNaoEncontrado());
        responseMock.status.mockReturnThis();

        //Quando (When) 
        await recuperarEventoPorIdController.recuperar(requestMock, responseMock, nextMock);

        expect(recuperarEventoPorIdUseCaseMock.execute).toHaveBeenCalledWith(eventoInputDTO.id);
        expect(nextMock).toHaveBeenCalled();
        expect(nextMock.mock.lastCall[0].name).toBe(HttpErrors.NotFoundError.name);

    });

});