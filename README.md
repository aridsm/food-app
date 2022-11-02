# FoodApp

Projeto de um restaurante fast food com 4 rotas navegáveis além de uma rota 404. Feito com React js, React Redux, Redux toolkit, React Router e CSS. Prototipagem feita pelo Figma.

![página catálogo](https://github.com/aridsm/food-app/blob/master/public/FoodApp.png)

## Rotas

1. Home: página principal do website com link para o cardápio.
2. Cardapio: página com os itens disponíveis, filtragem por categorias e modal para adicionar item ao carrinho.
3. Finalizar compra: página com formulário de endereço com validação e fetch de endereço por meio do CEP. 
4. Compra finalizada: página mostrando os itens comprados.
5. Rota 404: página caso tente navegar para uma rota inexistente ou uma rota indisponível no momento (Finalizar compra ou compra finalizada).

### Plus

O projeto conta também com o modal de cada item do cardápio, possibilidade de adicionar ao carrinho, retirar produto do carrinho e esvaziar lista. Além disso, possui um alerta para as açoes dos usuários (adicionar produto ao carrinho, retirar produto, formulário inválido...).

### Objetivo

O projeto teve como principal objetivo o emprego do Redux para criação de estados globais (carrinho e alertas).

Acesse: https://aridsm.github.io/food-app/
