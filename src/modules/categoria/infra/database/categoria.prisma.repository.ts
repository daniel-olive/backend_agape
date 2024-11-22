import { PrismaRepository } from "../../../../shared/infra/database/prisma.repository";
import bcrypt from "bcrypt"
import { Categoria } from "../../../../modules/categoria/domain/categoria.entity";
import { CategoriaMap } from "../mappers/categoria.map";

class CategoriaPrismaRepository extends PrismaRepository {

    
    async recuperarPorUuid(uuid: string): Promise<Categoria | null> {
        const categoriaRecuperada = await this._datasource.categoria.findUnique(
            {
                where: {
                    id: uuid
                }
            }
        )
        if (categoriaRecuperada) {
            return CategoriaMap.fromPrismaModelToDomain(categoriaRecuperada);
        }
        return null;
    }

    async recuperarTodos(): Promise<Array<Categoria>> {
        const categoriasRecuperadas = await this._datasource.categoria.findMany();
        const categorias = categoriasRecuperadas.map(
            (categoria) => CategoriaMap.fromPrismaModelToDomain(categoria)
        );
        return categorias;
    }

    async existe(uuid: string): Promise<boolean> {
        const categoriaExistente = await this.recuperarPorUuid(uuid);
		if (categoriaExistente)  {return true;}
		return false;
    }


    async inserir(categoria: Categoria): Promise<Categoria> {
        const categoriaInserida = await this._datasource.categoria.create(
            {
                data: {
                    id: categoria.id,
                    nome: categoria.nome
                }
            }
        );
        return categoria;
    }

    async atualizar(uuid: string, categoria: Categoria): Promise<boolean> {
        const categoriaAtualizada = await this._datasource.categoria.update(
            {
                where: {id : uuid},
                data: {
                    nome: categoria.nome
                }
            }
        );
        if (categoriaAtualizada) {return true};
        return false;
    }

    async deletar(uuid: string): Promise<boolean> {
        const categoriaDeletada = await this._datasource.categoria.delete(
            {
                where: {
                    id: uuid
                }        
            }
        );
        if (categoriaDeletada.id) {return true;}
        return false;
    }
}

export {CategoriaPrismaRepository}