import { Conteudo } from "../../../../modules/conteudo/domain/conteudo.entity";
import { IConteudoRepository } from "../../../../modules/conteudo/domain/conteudo.repository.interface";
import { PrismaRepository } from "../../../../shared/infra/database/prisma.repository";
import { ConteudoMap } from "../mappers/conteudo.map";
import { Prisma } from "@prisma/client";

class ConteudoPrismaRepository extends PrismaRepository implements IConteudoRepository<Conteudo> {

    async recuperarPorUuid(uuid: string): Promise<Conteudo | null> {
        const conteudoRecuperado = await this._datasource.conteudo.findUnique(
            {
                where: {
                    id: uuid
                },

                include: Prisma.validator<Prisma.ConteudoInclude>()(
                    {
                        category: true
                    }
                )
            }
        )
        if (conteudoRecuperado) {
            return ConteudoMap.fromPrismaModelToDomain(conteudoRecuperado as Prisma.ConteudoCreateInput);
        }
        return null;
    }

    async recuperarTodos(): Promise<Array<Conteudo>> {
        const conteudosRecuperados = await this._datasource.conteudo.findMany(
            {
                include: Prisma.validator<Prisma.ConteudoInclude>()(
                    {
                        category: true
                    }
                )
            }
        );
        const conteudos = conteudosRecuperados.map(
            (conteudo) => ConteudoMap.fromPrismaModelToDomain(conteudo as Prisma.ConteudoCreateInput)
        );
        return conteudos;
    }

    async existe(uuid: string): Promise<boolean> {
        const conteudoExistente = await this.recuperarPorUuid(uuid);
        if (conteudoExistente) { return true; }
        return false;
    }

    async inserir(conteudo: Conteudo): Promise<Conteudo> {
        const conteudoInserido = await this._datasource.conteudo.create(
            {
                data: {
                    id: conteudo.id,
                    titulo: conteudo.titulo,
                    descricao: conteudo.descricao,
                    categoria: conteudo.categoria,
                    autor: conteudo.autor,
                    banner: conteudo.banner

                }
            }
        );
        return conteudo;
    }

    async atualizar(uuid: string, conteudo: Conteudo): Promise<boolean> {
        const conteudoAtualizado = await this._datasource.conteudo.update(
            {
                where: { id: uuid },
                data: {
                    titulo: conteudo.titulo,
                    descricao: conteudo.descricao,
                    autor: conteudo.autor,
                    banner: conteudo.banner
                }
            }
        );
        if (conteudoAtualizado) { return true };
        return false;
    }

    async deletar(uuid: string): Promise<boolean> {
        const conteudoDeletado = await this._datasource.conteudo.delete(
            {
                where: {
                    id: uuid
                }
            }
        );
        if (conteudoDeletado.id) { return true; }
        return false;
    }
}

export { ConteudoPrismaRepository }