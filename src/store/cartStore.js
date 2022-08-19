import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
  name: 'cart',
  initialState: { itens: [], totalItens: 0, valorTotal: 0 },
  reducers: {
    addItemToCart(state, action) {

      const itemJaExisteNaLista = state.itens.find(item => item.id === action.payload.id);
      state.totalItens += action.payload.quantidade;
      state.valorTotal += Number(action.payload.preco) * action.payload.quantidade;

      if (itemJaExisteNaLista) {
        itemJaExisteNaLista.quantidade += action.payload.quantidade;
      } else {
        state.itens.push(action.payload)
      }

    },
    addOneItemToCart(state, action) {
      const itemJaExisteNaLista = state.itens.find(item => item.id === action.payload);
      state.totalItens++;
      itemJaExisteNaLista.quantidade++;
      state.valorTotal += Number(itemJaExisteNaLista.preco);
    },
    removeOneItemToCart(state, action) {

      const id = action.payload
      const itemJaExisteNaLista = state.itens.find(item => item.id === id);
      state.totalItens--;
      itemJaExisteNaLista.quantidade--;
      state.valorTotal -= Number(itemJaExisteNaLista.preco);

      if (itemJaExisteNaLista.quantidade === 0) {
        state.itens = state.itens.filter(item => item.id !== id)
      }

    },
    removeAll(state) {
      state.itens = [];
      state.totalItens = 0;
      state.valorTotal = 0
    }
  }
})

export default cartSlice;
export const cartActions = cartSlice.actions;