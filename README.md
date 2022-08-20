# FoodApp

Projeto de um restaurante fast food com 4 rotas navegaveis além de uma rota 404. Feito com React js, React Redux, Redux toolkit, React Router e CSS. Prototipagem feita pelo Figma.

## Rotas

1. Home: pagina principal do website com link para o cardapio.
2. Cardapio: pagina com os itens disponiveis, filtragem por categorias e modal para adicionar item ao carrinho.
3. Finalizar compra: pagina com formulario de endereço com validaçao e fetch de endereço por meio do CEP. 
4. Compra finalizada: pagina mostrando os itens comprados.
5. Rota 404: pagina caso tente navegar para uma rota inexistente ou uma rota indisponivel no momento (Finalizar compra ou compra finalizada).

### Plus

O projeto conta também com o modal de cada item do cardapio, possibilidade de adicionar ao carrinho, retirar produto do carrinho e esvaziar lista. Além disso, possui um alerta para as açoes dos usuarios (adicionar produto ao carrinho, retirar produto, formulario invalido...).

### Objetivo

O projeto teve como principal objetivo o emprego do Redux para criaçao de estados globais (carrinho e alertas).
