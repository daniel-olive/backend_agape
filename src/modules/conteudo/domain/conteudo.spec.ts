import { beforeAll, describe, expect, test } from 'vitest';
import { Conteudo } from './conteudo.entity';
import { TituloConteudoTamanhoMinimoInvalido, TituloConteudoTamanhoMaximoInvalido, DescricaoConteudoTamanhoMinimoInvalido, DescricaoConteudoTamanhoMaximoInvalido } from './conteudo.exception';
import { CriarConteudoProps, EditarConteudoProps } from './conteudo.types';
import { faker } from '@faker-js/faker/locale/af_ZA'; 

let TituloValido: string;
let TituloTamanhoMinimoInvalido: string;
let TituloTamanhoMaximoInvalido: string;
let DescricaoValida: string;
let DescricaoTamanhoMinimoInValido: string;
let DescricaoTamanhoMaximoInvalido: string;

beforeAll(async() => {
    TituloValido = faker.string.alpha({length:{min:3,max:50}});
    TituloTamanhoMinimoInvalido = faker.string.alpha({length:{min:0,max:2}});
    TituloTamanhoMaximoInvalido = faker.string.alpha({length:{min:51,max:51}});
    DescricaoValida = faker.string.alpha({length:{min:30,max:500}});
    DescricaoTamanhoMinimoInValido = faker.string.alpha({length:{min:0,max:29}});
    DescricaoTamanhoMaximoInvalido = faker.string.alpha({length:{min:501,max:501}});
})

describe('Entidade de Dominio: Conteudo', () => {
    
    describe('Entidade de Domínio: Criar Conteúdo', () => {

        //Teste define um conjunto de expectativas relacionadas. 
        test('Deve Criar Um Conteúdo Válido'), async () => {
    
            //Dado (Given)
            const conteudoValido: CriarConteudoProps = {
                titulo: TituloValido,
                descricao: 'aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa',
                categoria: "categoria teste",
                autor:"Deivid Pontes",
                banner:"https://aajajajjaja.com"
            };
    
            //Quando (When) e Então (Then)
            expect(Conteudo.criar(conteudoValido))
                .to.be.instanceof(Conteudo);
        }
    
        test('Não Deve Criar Conteúdo Com Titulo Inválido (Tamanho Mínimo)', async () => {
    
            //Dado (Given)
            //Nome menor que três caracteres
            const conteudoTituloInvalido: CriarConteudoProps = {
                titulo: TituloTamanhoMinimoInvalido,
                descricao: "aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
                categoria: "categoria teste",
                autor:"Deivid Pontes",
                banner:"https://aajajajjaja.com"
            };
    
            //Quando (When) e Então (Then)
            expect(() => Conteudo.criar(conteudoTituloInvalido))
                .toThrowError(TituloConteudoTamanhoMinimoInvalido);
    
        });
    
        test('Não Deve Criar Conteúdo Com Nome Inválido (Tamanho Máximo)', async () => {
    
            //Dado (Given)
            //Nome maior que 50 caracteres
            const conteudoTituloInvalido: CriarConteudoProps = {
                titulo: TituloTamanhoMaximoInvalido,
                descricao: 'aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa',
                categoria: "categoria teste",
                autor:"Deivid Pontes",
                banner:"https://aajajajjaja.com"
    
            };
    
            //Quando (When) e Então (Then)
            expect(() => Conteudo.criar(conteudoTituloInvalido))
                .toThrowError(TituloConteudoTamanhoMaximoInvalido);
    
        });
    
        test('Não Deve Criar Conteúdo Com Descrição Inválida (Tamanho Mínimo)', async () => {
    
            //Dado (Given)
            //Nome menor que três caracteres
            const conteudoDescricaoInvalida: CriarConteudoProps = {
                titulo: DescricaoTamanhoMinimoInValido,
                descricao: 'aa',
                categoria: "categoria teste",
                autor:"Deivid Pontes",
                banner:"https://aajajajjaja.com"
    
            };
    
            //Quando (When) e Então (Then)
            expect(() => Conteudo.criar(conteudoDescricaoInvalida))
                .toThrowError(DescricaoConteudoTamanhoMinimoInvalido);
    
        });
    
        test('Não Deve Criar Conteúdo Com Descrição Inválida (Tamanho Máximo)', async () => {
    
            //Dado (Given)
            //Nome maior que 50 caracteres
            const conteudoDescricaoInvalida: CriarConteudoProps = {
                titulo: TituloValido,
                descricao: DescricaoTamanhoMaximoInvalido,
                categoria: "categoria teste",
                autor:"Deivid Pontes",
                banner:"https://aajajajjaja.com"
    
            };
    
            //Quando (When) e Então (Then)
            expect(() => Conteudo.criar(conteudoDescricaoInvalida))
                .toThrowError(DescricaoConteudoTamanhoMaximoInvalido);
    
        });
    
    
    
        });

    describe('Entidade de Domínio: Editar Conteúdo', () => {

            //Teste define um conjunto de expectativas relacionadas. 
            test('Deve Editar Um Conteúdo Válido'), async () => {
    
                //Dado (Given)
                const conteudoValido: EditarConteudoProps = {
                    titulo: TituloValido,
                    descricao: 'aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa',
                    categoria: "categoria teste",
                    autor:"Deivid Pontes",
                banner:"https://aajajajjaja.com"
                };
    
                //Quando (When) e Então (Then)
                expect(Conteudo.editar(conteudoValido))
                    .to.be.instanceof(Conteudo);
            }
    
            test('Não Deve Editar Conteúdo Com Titulo Inválido (Tamanho Mínimo)', async () => {
    
                //Dado (Given)
                //Nome menor que três caracteres
                const conteudoTituloInvalido: EditarConteudoProps = {
                    titulo: TituloTamanhoMinimoInvalido,
                    descricao: 'aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa',
                    categoria: "categoria teste",
                    autor:"Deivid Pontes",
                banner:"https://aajajajjaja.com"
                };
    
                //Quando (When) e Então (Then)
                expect(() => Conteudo.editar(conteudoTituloInvalido))
                    .toThrowError(TituloConteudoTamanhoMinimoInvalido);
    
            });
    
            test('Não Deve Editar Conteúdo Com Nome Inválido (Tamanho Máximo)', async () => {
    
                //Dado (Given)
                //Nome maior que 50 caracteres
                const conteudoTituloInvalido: EditarConteudoProps = {
                    titulo: TituloTamanhoMaximoInvalido,
                    descricao: 'aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa',
                    categoria: "categoria teste",
                    autor:"Deivid Pontes",
                banner:"https://aajajajjaja.com"
    
                };
    
                //Quando (When) e Então (Then)
                expect(() => Conteudo.editar(conteudoTituloInvalido))
                    .toThrowError(TituloConteudoTamanhoMaximoInvalido);
    
            });
    
            test('Não Deve Editar Conteúdo Com Descrição Inválida (Tamanho Mínimo)', async () => {
    
                //Dado (Given)
                //Nome menor que três caracteres
                const conteudoDescricaoInvalida: EditarConteudoProps = {
                    titulo: DescricaoTamanhoMinimoInValido,
                    descricao: 'aa',
                    categoria: "categoria teste",
                    autor:"Deivid Pontes",
                banner:"https://aajajajjaja.com"
    
                };
    
                //Quando (When) e Então (Then)
                expect(() => Conteudo.editar(conteudoDescricaoInvalida))
                    .toThrowError(DescricaoConteudoTamanhoMinimoInvalido);
    
            });
    
            test('Não Deve Criar Conteúdo Com Descrição Inválida (Tamanho Máximo)', async () => {
    
                //Dado (Given)
                //Nome maior que 50 caracteres
                const conteudoDescricaoInvalida: EditarConteudoProps = {
                    titulo: TituloValido,
                    descricao: DescricaoTamanhoMaximoInvalido,
                    categoria: "categoria teste",
                    autor:"Deivid Pontes",
                banner:"https://aajajajjaja.com"
    
                };
    
                //Quando (When) e Então (Then)
                expect(() => Conteudo.editar(conteudoDescricaoInvalida))
                    .toThrowError(DescricaoConteudoTamanhoMaximoInvalido);
    
            });
    
    
    
        });

})


