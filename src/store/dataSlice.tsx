import { createSlice } from '@reduxjs/toolkit';
import Decimal from 'decimal.js';
import { Count } from '../Models/Base'

export const dataState: Count = {
  data: {
    offer: {
      cny_rub: 10.69,
      eur_rub: 80.05,
      usd_rub: 75.47,
      try_rub: 4.00,
      byn_rub: 26.66,
      eur_usd: 1.06,
  }, bid: {
      cny_rub: 10.50,
      eur_rub: 79.95,
      usd_rub: 75.27,
      try_rub: 3.86,
      byn_rub: 26.52,
      eur_usd: 1.04,
  },
  },
  listOfOrders: [{ id:1,
    creationTime:"05/03/2023 21:27",
    changeTime:"05/03/2023 21:27",
    status:2,
    side:2,
    price: 10.50,
    amount:1,
    instrument:1}],
}



export const dataSlice = createSlice({
  name: 'data',
  initialState: dataState,
  reducers: {
    addToList: (state, { payload }) => {
      state.listOfOrders = payload
  },
    removeOrder: (state, {payload}) => {
      state.listOfOrders = state.listOfOrders.filter((el) => el.id !== payload)
    }
  }
})

export const {
  addToList,
  removeOrder
} = dataSlice.actions

export const dataSelector = (state: { data: any; }) => state.data

export default dataSlice.reducer