import { Prisma, PrismaClient } from "@prisma/client";
import { afterEach, beforeAll, describe, expect, test, vi } from "vitest";
import { DeepMockProxy, mockDeep, mockReset } from 'vitest-mock-extended';
import { faker } from "@faker-js/faker";
import { ConteudoPrismaRepository } from "./conteudo.prisma.repository";
import { Conteudo } from "../../../../modules/conteudo/domain/conteudo.entity";
import { ConteudoMap } from "../mappers/conteudo.map";
import { Categoria } from "../../../../modules/categoria/domain/categoria.entity";

const prismaMock: DeepMockProxy<PrismaClient> = mockDeep<PrismaClient>();
let conteudoRepositorio: ConteudoPrismaRepository;
let UUIDValido: string;
let tituloEventoValido: string;
let descricaoEventoValida: string;


describe('Repositório Prisma: Conteudo', () => {

    beforeAll(async () => {

        conteudoRepositorio = new ConteudoPrismaRepository(prismaMock);

        //Preencendo as variáveis com dados em conformidade com as restrições da regra de negócio
        UUIDValido = faker.string.uuid(); // Retorna um UUID v4
        tituloEventoValido = faker.string.alpha({ length: { min: Conteudo.TAMANHO_MINIMO_TITULO, max: Conteudo.TAMANHO_MAXIMO_TITULO } });
        descricaoEventoValida = faker.string.alpha({ length: { min: Conteudo.TAMANHO_MINIMO_DESCRICAO, max: Conteudo.TAMANHO_MAXIMO_DESCRICAO } });
    });

    afterEach(() => {
        vi.restoreAllMocks();
        mockReset(prismaMock);
    });


    describe('Recuperar Todos os Conteudos', () => {

        test('Deve Recuperar Todos os Conteudos Sem Execeção', async () => {

            const listaConteudosPrisma = [{
                id: UUIDValido,
                titulo: tituloEventoValido,
                descricao: descricaoEventoValida,
                publicadoEm: new Date(),
                atualizadoEm: new Date(),
                categoria: UUIDValido, // Mantenha esta propriedade como string
                viewCount: 0,
                category: { connect: { id: UUIDValido } }, // Mantenha este objeto para a conexão
                autor: "Deivid Pontes",
                banner: "https://google.com"
            },
            {
                id: UUIDValido,
                titulo: tituloEventoValido,
                descricao: descricaoEventoValida,
                publicadoEm: new Date(),
                atualizadoEm: new Date(),
                categoria: UUIDValido, // Mantenha esta propriedade como string
                viewCount: 0,
                category: { connect: { id: UUIDValido } }, // Mantenha este objeto para a conexão
                autor: "Deivid Pontes",
                banner: "https://google.com"
            }];

            prismaMock.conteudo.findMany.mockResolvedValue(listaConteudosPrisma);

            const conteudos: Array<Conteudo> = listaConteudosPrisma.map(
                (conteudo) => ConteudoMap.fromPrismaModelToDomain(conteudo)
            );

            const todosConteudosRecuperados = await conteudoRepositorio.recuperarTodos();

            expect(todosConteudosRecuperados).toStrictEqual(conteudos);
            expect(prismaMock.conteudo.findMany).toHaveBeenCalledTimes(1);


        });

    });


    describe('Inserir Conteudo', () => {

        test('Deve Inserir Um Conteudo', async () => {

            const conteudoPrisma = {
                id: UUIDValido,
                titulo: tituloEventoValido,
                descricao: descricaoEventoValida,
                categoria: "categoria teste",
                autor: "Deivid Pontes",
                banner: "https://aajajajjaja.com",
                publicadoEm: new Date(), // Adicione a data de publicação
                atualizadoEm: new Date(), // Adicione a data de atualização
                viewCount: 0 // Adicione a contagem de visualizações
            };

            prismaMock.conteudo.create.mockResolvedValue(conteudoPrisma);

            const conteudo: Conteudo = ConteudoMap.toDomain(conteudoPrisma);

            const conteudoInserido = await conteudoRepositorio.inserir(conteudo);

            expect(conteudoInserido).toStrictEqual(conteudo)
            expect(prismaMock.conteudo.create).toHaveBeenCalledTimes(1);
            expect(prismaMock.conteudo.create).toBeCalledWith({
                data: {
                    id: UUIDValido,
                    titulo: tituloEventoValido,
                    descricao: descricaoEventoValida,
                    categoria: "categoria teste"
                }
            });


        });

    });

    describe('Alterar Conteudo', () => {

        test('Deve Atualizar Um Conteudo', async () => {

            const conteudoPrisma = {
                id: UUIDValido,
                titulo: tituloEventoValido,
                descricao: descricaoEventoValida,
                categoria: "categoria teste",
                autor: "Deivid Pontes",
                banner: "https://aajajajjaja.com",
                publicadoEm: new Date(), // Adicione a data de publicação
                atualizadoEm: new Date(), // Adicione a data de atualização
                viewCount: 0 // Adicione a contagem de visualizações
            };

            prismaMock.conteudo.update.mockResolvedValue(conteudoPrisma);

            const conteudo: Conteudo = ConteudoMap.toDomain(conteudoPrisma);

            const conteudoAtualizado = await conteudoRepositorio.atualizar(conteudo.id, conteudo);

            expect(conteudoAtualizado).toBeTruthy()
            expect(prismaMock.conteudo.update).toHaveBeenCalledTimes(1);
            expect(prismaMock.conteudo.update).toBeCalledWith({
                where: { id: conteudo.id },
                data: {
                    titulo: tituloEventoValido,
                    descricao: descricaoEventoValida,
                    categoria: "categoria teste",
                    autor: "Deivid Pontes", // Adicione as propriedades necessárias
                    banner: "https://aajajajjaja.com", // Adicione as propriedades necessárias
                    publicadoEm: conteudoPrisma.publicadoEm, // Mantenha a propriedade
                    atualizadoEm: new Date(), // Atualize com a data atual
                    viewCount: conteudoPrisma.viewCount // Mantenha a contagem de visualizações
                }
            });


        });

    });

    describe('Deletar Conteudo', () => {

        test('Deve Deletar Um Conteudo por UUID', async () => {

            const conteudoPrisma = {
                id: UUIDValido,
                titulo: tituloEventoValido,
                descricao: descricaoEventoValida,
                categoria: "categoria teste",
                autor: "Deivid Pontes",
                banner: "https://aajajajjaja.com",
                publicadoEm: new Date(), // Adicione a data de publicação
                atualizadoEm: new Date(), // Adicione a data de atualização
                viewCount: 0 // Adicione a contagem de visualizações
            };

            prismaMock.conteudo.delete.mockResolvedValue(conteudoPrisma);

            const conteudo: Conteudo = ConteudoMap.toDomain(conteudoPrisma);

            const conteudoDeletado = await conteudoRepositorio.deletar(conteudo.id);

            expect(conteudoDeletado).toBeTruthy();
            expect(prismaMock.conteudo.delete).toHaveBeenCalledTimes(1);
            expect(prismaMock.conteudo.delete).toBeCalledWith({
                where: { id: conteudo.id }
            });


        });

    });

});