import { Evento } from "../../../../../modules/eventos/domain/evento.entity";
import { IEventoRepository } from "../../../../../modules/eventos/domain/evento.repository.interface";
import { afterEach, beforeAll, describe, expect, test, vi } from "vitest";
import { MockProxy, mock, mockReset } from "vitest-mock-extended";
import { RecuperarEventoPorIdUseCase } from "./recuperar-evento-por-id-use-case";
import { IEvento } from "../../../../../modules/eventos/domain/evento.types";
import { EventoApplicationExceptions } from "../../evento.application.exception";



let eventoRepositorioMock: MockProxy<IEventoRepository<Evento>>;;
let recuperarEventoPorIdUseCase: RecuperarEventoPorIdUseCase;

describe('Caso de Uso: Recuperar Evento por ID', () => {

    beforeAll(async () => {
        eventoRepositorioMock = mock<IEventoRepository<Evento>>();
        recuperarEventoPorIdUseCase = new RecuperarEventoPorIdUseCase(eventoRepositorioMock);
    });

    afterEach(() => {
        vi.restoreAllMocks();
        mockReset(eventoRepositorioMock);
    });

    test('Deve Recuperar Um Evento por UUID', async () => {

        //Dado (Given)
        const eventoInputDTO = {
            id: "2a013b24-8dc5-4198-946b-7e1a1c7f2bfd",
            titulo: 'Acampamento na Chacara Agape',
            descricao: 'aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa',
            local: 'Chacara Agape',
            data: '04/04/2024',
            horario: '1515',
            banner:"https://google.com"
        };

        eventoRepositorioMock.existe.mockResolvedValue(true);

        eventoRepositorioMock.recuperarPorUuid.mockResolvedValue(Evento.recuperar(eventoInputDTO));

        //Quando (When)
        const eventoOutputDTO: IEvento = await recuperarEventoPorIdUseCase.execute(eventoInputDTO.id);

        //Então (Then)
        expect(eventoOutputDTO).toEqual(eventoInputDTO);
        expect(eventoRepositorioMock.existe).toHaveBeenCalledTimes(1);
        expect(eventoRepositorioMock.recuperarPorUuid).toHaveBeenCalledTimes(1);

    });

    test('Deve Lançar uma Exceção ao Tentar Recuperar um Evento que Não Existe', async () => {

        //Dado (Given)
        const eventoInputDTO = {
            id: "2a013b24-8dc5-4198-946b-7e1a1c7f2bfd",
            titulo: 'Acampamento na Chacara Agape',
            descricao: 'aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa',
            local: 'Chacara Agape',
            data: '04/04/2024',
            horario: '1515'
        };

        eventoRepositorioMock.existe.mockResolvedValue(false);

        //Quando (When) e Então (Then)
        await expect(() => recuperarEventoPorIdUseCase.execute(eventoInputDTO.id))
            .rejects
            .toThrowError(EventoApplicationExceptions.EventoNaoEncontrado);

    });

});