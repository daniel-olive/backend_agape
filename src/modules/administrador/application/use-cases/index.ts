import { AutenticarAdmUseCase } from "./autenticar-administrador/autenticar-administrador.use-case";
import { administradorRepositorio } from "../../infra/database";
import { RegistrarAdmUseCase } from "./registrar-administrador/registrar-administrador.use-case";
import { AtualizarAdmUseCase } from "./atualizar-administrador/atualizar-administrador.use-case";
import { DeletarAdmUseCase } from "./deletar-administrador/deletar-administrador.use-case";
import { RecuperarTodosAdmUseCase } from "./recuperar-todos-adm/recuperar-todos-adm.use-case";
import { RecuperarAdmPorIdUseCase } from "./recuperar-administrador-por-id/recuperar-administrador-por-id.use-case";


const registrarAdministradorUseCase = new RegistrarAdmUseCase(administradorRepositorio)
const autenticarAdministradorUseCase = new AutenticarAdmUseCase(administradorRepositorio);
const atualizarAdministradorUseCase = new AtualizarAdmUseCase(administradorRepositorio)
const deletarAdministradorUseCase = new DeletarAdmUseCase(administradorRepositorio)
const recuperarTodosAdmUseCase = new RecuperarTodosAdmUseCase(administradorRepositorio)
const recuperarAdmPorIdUseCase = new RecuperarAdmPorIdUseCase(administradorRepositorio)


export {
    autenticarAdministradorUseCase,
    registrarAdministradorUseCase,
    atualizarAdministradorUseCase,
    deletarAdministradorUseCase,
    recuperarTodosAdmUseCase,
    recuperarAdmPorIdUseCase
}