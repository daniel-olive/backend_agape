import { PrismaClient } from "@prisma/client";
import { afterEach, beforeAll, describe, expect, test, vi } from "vitest";
import { DeepMockProxy, mockDeep, mockReset } from 'vitest-mock-extended';
import { faker } from "@faker-js/faker";
import { EventoPrismaRepository } from "./evento.prisma.repository";
import { Evento } from "modules/eventos/domain/evento.entity";
import { EventoMap } from "../mappers/evento.map";



const prismaMock: DeepMockProxy<PrismaClient> = mockDeep<PrismaClient>();
let eventoRepositorio: EventoPrismaRepository;
let UUIDValido: string;
let tituloEventoValido: string;
let descricaoEventoValida: string;
let localEventoValido: string;
let dataEventoValida: string;
let horarioEventoValido: string;

describe('Repositório Prisma: Evento', () => {

	beforeAll(async () => {

        eventoRepositorio = new EventoPrismaRepository(prismaMock);

        //Preencendo as variáveis com dados em conformidade com as restrições da regra de negócio
        UUIDValido = faker.string.uuid(); // Retorna um UUID v4
        tituloEventoValido = faker.string.alpha({length:{min:Evento.TAMANHO_MINIMO_TITULO,max:Evento.TAMANHO_MAXIMO_TITULO}});
        descricaoEventoValida = faker.string.alpha({length:{min:Evento.TAMANHO_MINIMO_DESCRICAO,max:Evento.TAMANHO_MAXIMO_DESCRICAO}});
        localEventoValido = faker.string.alpha({length:{min:Evento.TAMANHO_MINIMO_LOCAL,max:Evento.TAMANHO_MAXIMO_LOCAL}});
        dataEventoValida = faker.string.alpha({length:{min:8,max:10}})
        horarioEventoValido = faker.string.alpha({length:{min:Evento.TAMANHO_MINIMO_HORARIO,max:Evento.TAMANHO_MAXIMO_HORARIO}})
    });

    afterEach(() => {
        vi.restoreAllMocks();
        mockReset(prismaMock);
    });


    describe('Recuperar Todos os Eventos', () => {

        test('Deve Recuperar Todos os Eventos Sem Execeção', async () => {

            const listaEventosPrisma = [{
                id: UUIDValido,
                titulo: tituloEventoValido,
                descricao: descricaoEventoValida,
                local: localEventoValido,
                data: dataEventoValida,
                horario: horarioEventoValido,
                banner: "https://exemplo.com/banner.jpg", // Adicione a propriedade banner
                createdAt: new Date(), // Adicione a data de criação
                updatedAt: new Date() // Adicione a data de atualização
                
            },{
                id: UUIDValido,
                titulo: tituloEventoValido,
                descricao: descricaoEventoValida,
                local: localEventoValido,
                data: dataEventoValida,
                horario: horarioEventoValido,
                banner: "https://exemplo.com/banner.jpg", // Adicione a propriedade banner
                createdAt: new Date(), // Adicione a data de criação
                updatedAt: new Date() // Adicione a data de atualização
                
            }];

            prismaMock.evento.findMany.mockResolvedValue(listaEventosPrisma);

            const eventos:Array<Evento> = listaEventosPrisma.map(
                (evento) => EventoMap.fromPrismaModelToDomain(evento)
            );

            const todosEventosRecuperados = await eventoRepositorio.recuperarTodos();

            expect(todosEventosRecuperados).toStrictEqual(eventos);
            expect(prismaMock.evento.findMany).toHaveBeenCalledTimes(1);


		});

    });


    describe('Inserir Evento', () => {

        test('Deve Inserir Um Evento', async () => {

            const eventoPrisma = {
                id: UUIDValido,
                titulo: tituloEventoValido,
                descricao: descricaoEventoValida,
                local: localEventoValido,
                data: dataEventoValida,
                horario: horarioEventoValido,
                banner:"https://google.com",
                createdAt: new Date(), // Adicione a data de criação
                updatedAt: new Date() // Adicione a data de atualização
            };

            prismaMock.evento.create.mockResolvedValue(eventoPrisma);

            const evento: Evento = EventoMap.toDomain(eventoPrisma);

            const eventoInserido = await eventoRepositorio.inserir(evento);

            expect(eventoInserido).toStrictEqual(evento)
            expect(prismaMock.evento.create).toHaveBeenCalledTimes(1);
            expect(prismaMock.evento.create).toBeCalledWith(  {
                data: {
                id: UUIDValido,
                titulo: tituloEventoValido,
                descricao: descricaoEventoValida,
                local: localEventoValido,
                data: dataEventoValida,
                horario: horarioEventoValido,
                createdAt: new Date(), // Adicione a data de criação
                updatedAt: new Date() // Adicione a data de atualização
                }    
            });  


        });

    });

    describe('Alterar Evento', () => {

        test('Deve Atualizar Um Evento', async () => {

            const eventoPrisma = {
                id: UUIDValido,
                titulo: tituloEventoValido,
                descricao: descricaoEventoValida,
                local: localEventoValido,
                data: dataEventoValida,
                horario: horarioEventoValido,
                banner:"https://google.com",
                createdAt: new Date(), // Adicione a data de criação
                updatedAt: new Date() // Adicione a data de atualização
            };

            prismaMock.evento.update.mockResolvedValue(eventoPrisma);

            const evento: Evento = EventoMap.toDomain(eventoPrisma);

            const eventoAtualizado = await eventoRepositorio.atualizar(evento.id,evento);

            expect(eventoAtualizado).toBeTruthy()
            expect(prismaMock.evento.update).toHaveBeenCalledTimes(1);
            expect(prismaMock.evento.update).toBeCalledWith({
                where: {id : evento.id},
                data: eventoPrisma
            });  


        });

    });

    describe('Deletar Evento', () => {

        test('Deve Deletar Um Evento por UUID', async () => {

            const eventoPrisma = {
                id: UUIDValido,
                titulo: tituloEventoValido,
                descricao: descricaoEventoValida,
                local: localEventoValido,
                data: dataEventoValida,
                horario: horarioEventoValido,
                banner:"https://google.com",
                createdAt: new Date(), // Adicione a data de criação
                updatedAt: new Date() // Adicione a data de atualização
                
            };

            prismaMock.evento.delete.mockResolvedValue(eventoPrisma);

            const evento: Evento = EventoMap.toDomain(eventoPrisma);

            const eventoDeletado = await eventoRepositorio.deletar(evento.id);

            expect(eventoDeletado).toBeTruthy();
            expect(prismaMock.evento.delete).toHaveBeenCalledTimes(1);
            expect(prismaMock.evento.delete).toBeCalledWith({
                where: {id : evento.id}
            });  


        });

    });

});