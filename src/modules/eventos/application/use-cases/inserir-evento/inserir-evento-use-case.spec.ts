import { Evento } from "../../../../../modules/eventos/domain/evento.entity";
import { IEventoRepository } from "../../../../../modules/eventos/domain/evento.repository.interface";
import { afterEach, beforeAll, describe, expect, test, vi } from "vitest";
import { MockProxy, mock, mockReset } from "vitest-mock-extended";
import { InserirEventoUseCase } from "./inserir-evento-use-case";
import { CriarEventoProps, IEvento } from "../../../../../modules/eventos/domain/evento.types";


let eventoRepositorioMock: MockProxy<IEventoRepository<Evento>>;;
let inserirEventoUseCase: InserirEventoUseCase;

describe('Caso de Uso: Inserir Evento', () => {

    beforeAll(async () => {
        eventoRepositorioMock = mock<IEventoRepository<Evento>>();
        inserirEventoUseCase = new InserirEventoUseCase(eventoRepositorioMock);
    });

    afterEach(() => {
        vi.restoreAllMocks();
        mockReset(eventoRepositorioMock);
    });

    test('Deve Inserir Um Evento', async () => {

        //Dado (Given)
        const eventoInputDTO: CriarEventoProps = {
            titulo: 'Evento Teste do Projeto',
            descricao: 'aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa',
            local: 'Rua do São Nunca',
            data: '05/05/2025',
            horario: '1010',
            banner:"https://google.com"
        };

        const evento: Evento = Evento.criar(eventoInputDTO);

        eventoRepositorioMock.inserir.mockResolvedValue(evento);

        //Quando (When)
		const eventoOutputDTO: IEvento = await inserirEventoUseCase.execute(evento);

        //Então (Then)
		expect(eventoOutputDTO).toBeDefined();
        expect(eventoOutputDTO).toMatchObject(
            expect.objectContaining({
                id:expect.any(String),
                titulo:expect.any(String),
                descricao:expect.any(String),
                local:expect.any(String),
                data:expect.any(String),
                horario:expect.any(String)
            })
        );
        expect(eventoRepositorioMock.inserir).toHaveBeenCalledTimes(1);

    });

});