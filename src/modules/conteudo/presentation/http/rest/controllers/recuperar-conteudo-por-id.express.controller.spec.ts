import { Request, Response } from "express";
import { Mock, afterEach, beforeAll, describe, expect, test, vi, vitest } from "vitest";
import { MockProxy, mock, mockReset } from "vitest-mock-extended";
import { ConteudoApplicationExceptions } from "../../../../../../modules/conteudo/application/conteudo.application.exception";
import { IConteudo } from "../../../../../../modules/conteudo/domain/conteudo.types";
import { RecuperarConteudoPorIdUseCase } from "../../../../../../modules/conteudo/application/use-cases/recuperar-conteudo-por-id/recuperar-conteudo-por-id-use-case";
import { RecuperarConteudoPorIdExpressController } from "./recuperar-conteudo-por-id.express.controller";
import { HttpError, HttpErrors } from "../../../../../../shared/presentation/http/http.error";

let requestMock: MockProxy<Request>;
let responseMock: MockProxy<Response>;
let nextMock: Mock;
let recuperarConteudoPorIdUseCaseMock:  MockProxy<RecuperarConteudoPorIdUseCase>;
let recuperarConteudoPorIdController: RecuperarConteudoPorIdExpressController;

describe('Controller Express: Recuperar Conteudo por ID', () => {

    beforeAll(async () => {
        requestMock = mock<Request>();
        responseMock = mock<Response>();
        nextMock = vitest.fn();
        recuperarConteudoPorIdUseCaseMock = mock<RecuperarConteudoPorIdUseCase>();
        recuperarConteudoPorIdController = new RecuperarConteudoPorIdExpressController(recuperarConteudoPorIdUseCaseMock);
    });

    afterEach(() => {
        vi.restoreAllMocks();
        mockReset(requestMock);
        mockReset(responseMock);
        mockReset(recuperarConteudoPorIdUseCaseMock);
    });

    test('Deve Recuperar Um Conteudo por UUID', async () => {

        //Dado (Given)
        const conteudoInputDTO: IConteudo = {
            id: "80830927-8c3e-4db9-9ddf-30ea191f139b",
            titulo: "Outro Teste Conteudo",
            descricao: "teste 33333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333",
            categoria: "categoria teste",
            autor:"Deivid Pontes",
            banner:"https://aajajajjaja.com"
        }

        requestMock.params.id = conteudoInputDTO.id as string;
        recuperarConteudoPorIdUseCaseMock.execute.mockResolvedValue(conteudoInputDTO);
        responseMock.status.mockReturnThis();

        //Quando (When)
        await recuperarConteudoPorIdController.recuperar(requestMock, responseMock, nextMock);

        //Então (Then
		expect(recuperarConteudoPorIdUseCaseMock.execute).toHaveBeenCalledWith(conteudoInputDTO.id);
        expect(responseMock.status).toHaveBeenCalledWith(200);
        expect(responseMock.json).toHaveBeenCalledWith(conteudoInputDTO);
        expect(nextMock).not.toHaveBeenCalled();

    });

    test('Deve Tratar uma Exceção de Conteudo Não Encontrado', async () => {

        //Dado (Given)
        const conteudoInputDTO: IConteudo = {
            id: "80830927-8c3e-4db9-9ddf-30ea191f139b",
            titulo: "Mais Outro Teste",
            descricao: "zzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzz",
            categoria: "categoria teste",
            autor:"Deivid Pontes",
            banner:"https://aajajajjaja.com"
        }

        requestMock.params.id = conteudoInputDTO.id as string;
        recuperarConteudoPorIdUseCaseMock.execute.mockRejectedValue(new ConteudoApplicationExceptions.ConteudoNaoEncontrado());
        responseMock.status.mockReturnThis();

        //Quando (When) 
        await recuperarConteudoPorIdController.recuperar(requestMock, responseMock, nextMock);

        expect(recuperarConteudoPorIdUseCaseMock.execute).toHaveBeenCalledWith(conteudoInputDTO.id);
        expect(nextMock).toHaveBeenCalled();
        expect(nextMock.mock.lastCall[0].name).toBe(HttpErrors.NotFoundError.name);

    });

});