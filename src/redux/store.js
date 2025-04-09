import { configureStore } from '@reduxjs/toolkit'
import {coinReducer} from '../features/coinSlice.jsx'
import exchangeReducer from '../features/exchangeSlice.jsx'
import newsreducer from '../features/newsSlice.jsx'

export const store = configureStore({
  reducer: {
    coin : coinReducer,
    exchange : exchangeReducer,
    news : newsreducer,
  },
})