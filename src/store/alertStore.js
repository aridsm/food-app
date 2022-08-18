import { createSlice } from "@reduxjs/toolkit";

const alertSlice = createSlice({
  name: 'alert',
  initialState: { message: '', alertIsShown: false, type: '' },
  reducers: {
    changeMessage(state, action) {
      state.message = action.payload.message;
      state.alertIsShown = true;
      state.type = action.payload.type
    },
    hideAlert(state) {
      state.alertIsShown = false;
    }
  }
})

const alertAction = alertSlice.actions
let alertTimeOut;

export const alertVisibility = (message, type) => {

  return (dispatch) => {
    clearTimeout(alertTimeOut)

    dispatch(alertAction.changeMessage({ message, type }));

    alertTimeOut = setTimeout(() => {
      dispatch(alertAction.hideAlert());
    }, 1500)

  }
}

export default alertSlice;
