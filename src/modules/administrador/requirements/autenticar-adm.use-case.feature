Feature: Autenticar Usuário
        Como um <Administrador>
        Eu quero <me autenticar no site da comunidade cátolica ágape>
        De modo que <eu possa ter acesso a gerenciar o site>
       
    Scenario: Autenticação Válida (Padrão)
    Dado (Given) [Credenciais (email e senha) válidas]
    Quando (When) [Solicitar a autenticação do administrador]
    Então (Then) [O administrador deve poder ter acesso a gerenciar o site]

    Scenario: Autenticação Inválida
    Dado (Given) [Credenciais (email e/ou senha) inválidas]
    Quando (When) [Solicitar a autenticação do administrador]
    Então (Then) [Um erro informando que as credenciais são inválidas e a autenticação falhou deve ser apresentado]