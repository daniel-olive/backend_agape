 Feature: Criar Administrador
        Como um <Administrador>
        Eu quero <Criar um Administrador no site comunidade cátolica ágape>
        De modo que <O Administrador criado possa ter acesso a gerenciar o site>
       
    Scenario: Criar um Novo Administrador (Padrão)
    Dado (Given) [A criação de um Novo Administrador]
    Quando (When) [Solicitar a criação do administrador]
    Então (Then) [O administrador e seus dados deve ser registrado corretamente]