import { beforeAll, describe, expect, test } from 'vitest';
import { Evento } from './evento.entity';
import { DescricaoEventoTamanhoMaximoInvalido, DescricaoEventoTamanhoMinimoInvalido, LocalEventoTamanhoMaximoInvalido, LocalEventoTamanhoMinimoInvalido, TituloEventoTamanhoMaximoInvalido, TituloEventoTamanhoMinimoInvalido } from './evento.exception';
import { CriarEventoProps, EditarEventoProps } from './evento.types';
import {faker} from '@faker-js/faker'

let TituloValido: string;
let TituloTamanhoMinimoInvalido: string;
let TituloTamanhoMaximoInvalido: string;
let DescricaoValida: string;
let DescricaoTamanhoMinimoInValido: string;
let DescricaoTamanhoMaximoInvalido: string;
let LocalValido: string;
let LocalTamanhoMinimoInvalido: string;
let LocalTamanhoMaximoInvalido: string;
let DataValida: string;
let DataFormatoInvalido: string;
let HorarioValido: string;
let HorarioFormatoInvalido: string;

beforeAll(async() => {
    TituloValido = faker.string.alpha({length:{min:3,max:50}});
    TituloTamanhoMinimoInvalido = faker.string.alpha({length:{min:0,max:2}});
    TituloTamanhoMaximoInvalido = faker.string.alpha({length:{min:51,max:51}});
    DescricaoValida = faker.string.alpha({length:{min:30,max:500}});
    DescricaoTamanhoMinimoInValido = faker.string.alpha({length:{min:0,max:29}});
    DescricaoTamanhoMaximoInvalido = faker.string.alpha({length:{min:501,max:501}});
    LocalValido = faker.string.alpha({length:{min:8,max:50}});
    LocalTamanhoMinimoInvalido = faker.string.alpha({length:{min:0,max:7}});
    LocalTamanhoMaximoInvalido = faker.string.alpha({length:{min:51,max:51}});
})

describe('Entidade de Dominio: Evento', () => {

    describe('Entidade de Domínio: Criar Evento', () => {

        //Teste define um conjunto de expectativas relacionadas. 
        test('Deve Criar Um Evento Válido'), async () => {
    
            //Dado (Given)
            const eventoValido: CriarEventoProps = {
                titulo: TituloValido,
                descricao: 'aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa',
                local: 'Rua Domingos Martins',
                data: '04/05/2024',
                horario: '151515',
                banner:"https://google.com"
            };
    
            //Quando (When) e Então (Then)
            expect(Evento.criar(eventoValido))
                .to.be.instanceof(Evento);
        }
    
        test('Não Deve Criar Evento Com Titulo Inválido (Tamanho Mínimo)', async () => {
    
            //Dado (Given)
            //Nome menor que três caracteres
            const eventoTituloInvalido: CriarEventoProps = {
                titulo: TituloTamanhoMinimoInvalido,
                descricao: 'aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa',
                local: 'Rua Domingos Martins',
                data: '04/05/2024',
                horario: '151515',
                banner:"https://google.com"
            };
    
            //Quando (When) e Então (Then)
            expect(() => Evento.criar(eventoTituloInvalido))
                .toThrowError(TituloEventoTamanhoMinimoInvalido);
    
        });
    
        test('Não Deve Criar Evento Com Nome Inválido (Tamanho Máximo)', async () => {
    
            //Dado (Given)
            //Nome maior que 50 caracteres
            const eventoTituloInvalido: CriarEventoProps = {
                titulo: TituloTamanhoMaximoInvalido,
                descricao: 'aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa',
                local: 'Rua Domingos Martins',
                data: '04/05/2024',
                horario: '151515',
                banner:"https://google.com"
            };
    
            //Quando (When) e Então (Then)
            expect(() => Evento.criar(eventoTituloInvalido))
                .toThrowError(TituloEventoTamanhoMaximoInvalido);
    
        });
    
        test('Não Deve Criar Evento Com Descrição Inválida (Tamanho Mínimo)', async () => {
    
            //Dado (Given)
            //Nome menor que três caracteres
            const eventoDescricaoInvalida: CriarEventoProps = {
                titulo: DescricaoTamanhoMinimoInValido,
                descricao: 'aa',
                local: 'Rua Domingos Martins',
                data: '04/05/2024',
                horario: '151515',
                banner:"https://google.com"
            };
    
            //Quando (When) e Então (Then)
            expect(() => Evento.criar(eventoDescricaoInvalida))
                .toThrowError(DescricaoEventoTamanhoMinimoInvalido);
    
        });
    
        test('Não Deve Criar Evento Com Descrição Inválida (Tamanho Máximo)', async () => {
    
            //Dado (Given)
            //Nome maior que 50 caracteres
            const eventoDescricaoInvalida: CriarEventoProps = {
                titulo: TituloValido,
                descricao: DescricaoTamanhoMaximoInvalido,
                local: 'Rua Domingos Martins',
                data: '04/05/2024',
                horario: '151515',
                banner:"https://google.com"
            };
    
            //Quando (When) e Então (Then)
            expect(() => Evento.criar(eventoDescricaoInvalida))
                .toThrowError(DescricaoEventoTamanhoMaximoInvalido);
    
        });
    
        test('Não Deve Criar Evento Com Local Inválido (Tamanho Mínimo)', async () => {
    
            //Dado (Given)
            //Nome menor que três caracteres
            const eventoLocalInvalido: CriarEventoProps = {
                titulo: TituloValido,
                descricao: DescricaoValida,
                local: LocalTamanhoMinimoInvalido,
                data: '04/05/2024',
                horario: '151515',
                banner:"https://google.com"
            };
    
            //Quando (When) e Então (Then)
            expect(() => Evento.criar(eventoLocalInvalido))
                .toThrowError(LocalEventoTamanhoMinimoInvalido);
    
        });
    
        test('Não Deve Criar Evento Com Local Inválido (Tamanho Máximo)', async () => {
    
            //Dado (Given)
            //Nome maior que 50 caracteres
            const eventoLocalInvalido: CriarEventoProps = {
                titulo: TituloValido,
                descricao: DescricaoValida,
                local: LocalTamanhoMaximoInvalido,
                data: '04/05/2024',
                horario: '151515',
                banner:"https://google.com"
            };
    
            //Quando (When) e Então (Then)
            expect(() => Evento.criar(eventoLocalInvalido))
                .toThrowError(LocalEventoTamanhoMaximoInvalido);
    
        });
    
    
    
    
        });

        describe('Entidade de Domínio: Editar Evento', () => {

            //Teste define um conjunto de expectativas relacionadas. 
            test('Deve Editar Um Evento Válido'), async () => {
        
                //Dado (Given)
                const eventoValido: EditarEventoProps = {
                    titulo: TituloValido,
                    descricao: 'aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa',
                    local: 'Rua Domingos Martins',
                    data: '04/05/2024',
                    horario: '151515',
                    banner:"https://google.com"
                };
        
                //Quando (When) e Então (Then)
                expect(Evento.editar(eventoValido))
                    .to.be.instanceof(Evento);
            }
        
            test('Não Deve Editar Evento Com Titulo Inválido (Tamanho Mínimo)', async () => {
        
                //Dado (Given)
                //Nome menor que três caracteres
                const eventoTituloInvalido: EditarEventoProps = {
                    titulo: TituloTamanhoMinimoInvalido,
                    descricao: 'aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa',
                    local: 'Rua Domingos Martins',
                    data: '04/05/2024',
                    horario: '151515',
                    banner:"https://google.com"
                };
        
                //Quando (When) e Então (Then)
                expect(() => Evento.editar(eventoTituloInvalido))
                    .toThrowError(TituloEventoTamanhoMinimoInvalido);
        
            });
        
            test('Não Deve Editar Evento Com Nome Inválido (Tamanho Máximo)', async () => {
        
                //Dado (Given)
                //Nome maior que 50 caracteres
                const eventoTituloInvalido: EditarEventoProps = {
                    titulo: TituloTamanhoMaximoInvalido,
                    descricao: 'aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa',
                    local: 'Rua Domingos Martins',
                    data: '04/05/2024',
                    horario: '151515',
                    banner:"https://google.com"
                };
        
                //Quando (When) e Então (Then)
                expect(() => Evento.editar(eventoTituloInvalido))
                    .toThrowError(TituloEventoTamanhoMaximoInvalido);
        
            });
    
            test('Não Deve Editar Evento Com Descrição Inválida (Tamanho Mínimo)', async () => {
    
                //Dado (Given)
                //Nome menor que três caracteres
                const eventoDescricaoInvalida: EditarEventoProps = {
                    titulo: TituloValido,
                    descricao: DescricaoTamanhoMinimoInValido,
                    local: 'Rua Domingos Martins',
                    data: '04/05/2024',
                    horario: '151515',
                    banner:"https://google.com"
                };
        
                //Quando (When) e Então (Then)
                expect(() => Evento.editar(eventoDescricaoInvalida))
                    .toThrowError(DescricaoEventoTamanhoMinimoInvalido);
        
            });
        
            test('Não Deve Editar Evento Com Descrição Inválida (Tamanho Máximo)', async () => {
        
                //Dado (Given)
                //Nome maior que 50 caracteres
                const eventoDescricaoInvalida: EditarEventoProps = {
                    titulo: TituloValido,
                    descricao: DescricaoTamanhoMaximoInvalido,
                    local: 'Rua Domingos Martins',
                    data: '04/05/2024',
                    horario: '151515',
                    banner:"https://google.com"
                };
        
                //Quando (When) e Então (Then)
                expect(() => Evento.editar(eventoDescricaoInvalida))
                    .toThrowError(DescricaoEventoTamanhoMaximoInvalido);
        
            });
        
            test('Não Deve Editar Evento Com Local Inválido (Tamanho Mínimo)', async () => {
        
                //Dado (Given)
                //Nome menor que três caracteres
                const eventoLocalInvalido: EditarEventoProps = {
                    titulo: TituloValido,
                    descricao: DescricaoValida,
                    local: LocalTamanhoMinimoInvalido,
                    data: '04/05/2024',
                    horario: '151515',
                    banner:"https://google.com"
                };
        
                //Quando (When) e Então (Then)
                expect(() => Evento.editar(eventoLocalInvalido))
                    .toThrowError(LocalEventoTamanhoMinimoInvalido);
        
            });
        
            test('Não Deve Editar Evento Com Local Inválido (Tamanho Máximo)', async () => {
        
                //Dado (Given)
                //Nome maior que 50 caracteres
                const eventoLocalInvalido: EditarEventoProps = {
                    titulo: TituloValido,
                    descricao: DescricaoValida,
                    local: LocalTamanhoMaximoInvalido,
                    data: '04/05/2024',
                    horario: '151515',
                    banner:"https://google.com"
                };
        
                //Quando (When) e Então (Then)
                expect(() => Evento.editar(eventoLocalInvalido))
                    .toThrowError(LocalEventoTamanhoMaximoInvalido);
        
            });
        
        
            });
            
})

