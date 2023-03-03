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
  connectionLoading: false,
  connectionError: false,
  connectionSuccess: false,
  dataSuccess: false,
}
export const dataSlice = createSlice({
  name: 'data',
  initialState: dataState,
  reducers: {
      //Запускает загрузку, использую для анимаций и своевременного отображения контента
      connecting: (state) => {
          state.connectionLoading = true
      },
      //Выключает анимацию загрузки, отрисовывает контент
      connectingSuccess: (state) => {
          state.connectionLoading = false
          state.connectionSuccess = true
      },
      //Записывает данные в хранилище
      getDataSuccess: (state, { payload }) => {
          state.data = payload
          // state.data1 = payload.orders
          state.dataSuccess = true
          state.connectionLoading = false
          state.connectionSuccess = true
      },
      //Записывает данные в хранилище
      getList: (state, { payload }) => {
          state.data = payload
          state.dataSuccess = true
          state.connectionLoading = false
          state.connectionSuccess = true
      },
      //Выводит ошибку
      ConnectingFail: (state) => {
          state.connectionLoading = false
          state.connectionSuccess = false
          state.dataSuccess = false
          state.connectionError = true
      },
      //Добавить запись
      addToList: (state, { payload }) => {
        state.listOfOrders.push(payload)
      },

    }
})

export const {
  connecting, connectingSuccess, getDataSuccess, ConnectingFail, addToList
} = dataSlice.actions

export const dataSelector = (state: { data: any; }) => state.data

export default dataSlice.reducer