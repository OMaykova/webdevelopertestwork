import { createSlice } from '@reduxjs/toolkit';
import { Count } from '../Models/Base'

export const dataState: Count = {
  data: {
    rateBuy: {
      cny_rub: 10.69,
      eur_rub: 80.05,
      usd_rub: 75.47,
      try_rub: 4.00,
      byn_rub: 26.66,
      eur_usd: 1.06,
  }, rateSell: {
      cny_rub: 10.50,
      eur_rub: 79.95,
      usd_rub: 75.27,
      try_rub: 3.86,
      byn_rub: 26.52,
      eur_usd: 1.04,
  },
  },
  // quote_cny_rub {
  //   bid: 10.50,
  //   offer: 10.69,
  //   minAmount: 1,
  //   // maxAmount: 10,
  // },
  listOfOrders: [],
}



export const dataSlice = createSlice({
  name: 'data',
  initialState: dataState,
  reducers: {
    addToList: (state, { payload }) => {
      state.listOfOrders = payload
  },
  }
})

export const {
  addToList
} = dataSlice.actions

export const dataSelector = (state: { data: any; }) => state.data

export default dataSlice.reducer