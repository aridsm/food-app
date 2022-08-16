import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
  name: 'cart',
  initialState: { itens: [], totalItens: 0 },
  reducers: {
    addItemToCart(state, action) {

      const itemJaExisteNaLista = state.itens.find(item => item.id === action.payload.id);
      state.totalItens++
      if (itemJaExisteNaLista) {
        itemJaExisteNaLista.quantidade++;
      } else {
        state.itens.push(action.payload)
      }

    }
  }
})

export default cartSlice;
export const cartActions = cartSlice.actions;