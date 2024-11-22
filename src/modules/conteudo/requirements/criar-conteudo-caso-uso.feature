Feature: Criar Conteúdo
    Como um <Administrador>
    Eu quero <Criar um Conteúdo>
    De modo que <O conteúdo fique a disposição do usuario> 

Scenario: Criar Conteúdo válido (Padrão)
    Dado (Given) [Um Conteúdo válido]
    Quando (When) [Solicitar a Criação de um Conteúdo]
    Então (Then) [O Conteúdo deve ser criado corretamente]

Scenario: Criar Conteúdo inválido - Titulo do Conteúdo é nulo ou indefinido
    Dado [Um Conteúdo com titulo nulo ou indefinido]
	Quando [Solicitar a Criação de um Conteúdo]
	Então [Um erro informando que o titulo do conteúdo é nulo ou indefinido deve ser apresentado]

Scenario: Criar Conteúdo inválido - Titulo do Conteúdo não atende o tamanho mínino (Execeção)
    Dado [Um Conteúdo com titulo que não atende ao tamanho mínimo]
	Quando [Solicitar a Criação de um Conteúdo]
	Então [Um erro informado que o titulo do conteúdo não possui um tamanho mínimo válido deve ser apresentado]

Scenario: Criar Conteúdo inválido - Titulo do Conteúdo não atende o tamanho máximo (Execeção)			
    Dado [Um Conteúdo com titulo que não atende ao tamanho máximo]
    Quando [Solicitar a Criação de um Conteúdo]
    Então [Um erro informando que o titulo do conteúdo não possui um tamanho máximo válido deve ser apresentado] 

Scenario: Criar Conteúdo inválido - Descrição do Conteúdo é nula ou indefinida
    Dado [Um Conteúdo com descrição nula ou indefinida]
	Quando [Solicitar a Criação de um Conteúdo]
	Então [Um erro informando que a descrição do conteúdo é nula ou indefinida deve ser apresentado]

Scenario: Criar Conteúdo inválido - Descrição do Conteúdo não atende o tamanho mínino (Execeção)
    Dado [Um Conteúdo com descrição que não atende ao tamanho mínimo]
	Quando [Solicitar a Criação de um Conteúdo]
	Então [Um erro informando que a descrição do conteúdo não possui um tamanho mínimo válido deve ser apresentado]

Scenario: Criar Conteúdo inválido - Descrição do Conteúdo não atende o tamanho máximo (Execeção)			
    Dado [Um Conteúdo com descrição que não atende ao tamanho máximo]
    Quando [Solicitar a Criação de um Conteúdo]
    Então [Um erro informando que a descrição do conteúdo não possui um tamanho máximo válido deve ser apresentado] 


