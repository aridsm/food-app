const cardapio = {
  pizza: [
    {
      nome: 'Pizza',
      descricao: 'Massa fina e crocante feita no forno a lenha.',

      tamanho: [
        { cm: '40cm', nome: 'grande' }, { cm: '30cm', nome: 'média' }, { cm: '20cm', nome: 'pequena' }
      ],
      sabores: ['mussarela', 'calabresa', '4 queijos', 'portuguesa'],
      preco: '37.49',
      img: 'pizza1.webp'
    }
  ],
  hambúrguer: [
    {
      nome: 'Dupla carne',
      descricao: 'Alface, queijo, dupla camada de carne, cebola caramelizada, pao, tomate e molho especial.',
      preco: '35.99',
      img: 'burg1.webp'
    },
    {
      nome: 'Hambúrguer classico',
      descricao: 'Alface, queijo mussarela, carne, cebola em rodelas, pao, pickles, tomate e ketchup.',
      preco: '28.40',
      img: 'burg2.webp'
    },
    {
      nome: 'Chicken Burger',
      descricao: 'Queijo cheddar, frango empanado, cebola roxa, pao e maionese especial.',
      preco: '26.99',
      img: 'burg3.webp'
    },
    {
      nome: '3 Sabores',
      descricao: 'Alface, queijo mussarela, dupla camada de carne, calabresa, pao, bacon e ketchup.',
      preco: '42.80',
      img: 'burg4.webp'
    },
    {
      nome: 'Vegano',
      descricao: 'Alface, tomate, hambúrguer de grao de bico, pao e maionese vegana.',
      preco: '27.99',
      img: 'burg5.webp'
    },
  ],
  outros: [
    {
      nome: 'Frango frito',
      descricao: 'Frango frito empanado e crocante. Com tempero da casa.',
      preco: '29.99',
      img: 'out1.webp'
    },
    {
      nome: 'Aneis de cebola',
      descricao: 'Cebola em rodelas empanadas e frita. Acompanha molho.',
      preco: '22.30',
      img: 'out2.webp'
    },
    {
      nome: 'Cachorro quente',
      descricao: 'Salsicha, pao, romate, coentro, maionese, ketchup e mostarda.',
      preco: '20.49',
      img: 'out3.webp'
    },
    {
      nome: 'Batata frita',
      descricao: 'Porçao pequena de batata frita. Acompanha ketchup.',
      preco: '13.30',
      img: 'out4.webp'
    }
  ],
  bebidas: [
    {
      nome: 'Agua mineral',
      descricao: 'Garrafa de agua mineral de 500ml.',
      preco: '2.50',
      img: 'beb1.webp'
    },
    {
      nome: 'Coca-Cola zero',
      descricao: 'Lata de Coca-Cola de 220ml.',
      preco: '4.49',
      img: 'beb2.webp'
    },
    {
      nome: 'Suco de laranja',
      descricao: 'Suco de laranja (garrafa de 500ml).',
      preco: '8.99',
      img: 'beb3.webp'
    },
    {
      nome: 'Jarritos Limao',
      descricao: 'Refrigerante sabor Limao de 370ml.',
      preco: '5.59',
      img: 'beb4.webp'
    },
    {
      nome: 'Heineken',
      descricao: 'Garrafa de heineken de 330ml.',
      preco: '5.99',
      img: 'beb5.webp'
    },
  ]
}

export default cardapio;