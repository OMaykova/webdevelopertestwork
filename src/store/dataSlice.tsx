import { createSlice } from '@reduxjs/toolkit';
import { Count } from '../Models/Base'

export const dataState: Count = {
  data: {
    rateSell: {
      chn_rub: 10.69,
      eur_rub: 78.05,
      usd_rub: 72.79,
      try_rub: 3.87,
      byn_rub: 26.31,
      usd_eur: 26.31,
  }, rateBuy: {
      chn_rub: 10.50,
      eur_rub: 74.95,
      usd_rub: 72.59,
      try_rub: 3.67,
      byn_rub: 26.21,
      usd_eur: 26.21,
  },
  },
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