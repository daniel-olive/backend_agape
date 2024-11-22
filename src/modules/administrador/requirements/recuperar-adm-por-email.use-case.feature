Feature: Recuperar Administrador Por Email
        Como um <Administrador>
        Eu quero <recuperar um administrador por e-mail>
        De modo que <os dados do administrador estejam disponivéis para uso>
       
    Scenario: E-mail Válido e Registrado (Padrão)
    Dado (Given) [E-mail Válido e Registrado]
    Quando (When) [Solicitar a recuperação do administrador por email]
    Então (Then) [O administrador deve ser recuperado corretamente]