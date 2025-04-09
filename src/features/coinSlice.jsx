import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'

/*
  🔥 Thunk to fetch crypto data from an external API
  - createAsyncThunk accepts:
      1. A unique action type string
      2. An async function that performs the fetch
  - It automatically creates three action types:
      a. pending
      b. fulfilled
      c. rejected
  - These action types are used to handle the API call's lifecycle.
*/

// for fetching complete stats
export const coinData = createAsyncThunk('coinData/fetchData', async () => {
  const options = {
    method: 'GET',
    url: 'https://coinranking1.p.rapidapi.com/coins',
    params: {
      referenceCurrencyUuid: 'yhjMzLPhuIDl',
      timePeriod: '24h',
      tiers: '1',
      orderBy: 'marketCap',
      orderDirection: 'desc',
      limit: '100',
      offset: '0'
    },
    headers: {
      'x-rapidapi-key': 'bbdddc0633msh0fcdc02a19a59b7p133078jsn917ebb5c31cb',
      'x-rapidapi-host': 'coinranking1.p.rapidapi.com'
    }
  }
  const response = await axios.request(options);
  console.log("coinData", response.data);
  return response.data;
})


// for fetching coins by id
export const coinId = createAsyncThunk('coinId/fetchCoin', async (uuid) => {
  const options = {
    method: 'GET',
    url: `https://coinranking1.p.rapidapi.com/coin/${uuid}`,
    params: {
      referenceCurrencyUuid: 'yhjMzLPhuIDl',
      timePeriod: '24h'
    },
    headers: {
      'x-rapidapi-key': 'bbdddc0633msh0fcdc02a19a59b7p133078jsn917ebb5c31cb',
      'x-rapidapi-host': 'coinranking1.p.rapidapi.com'
    }
  };
  
    const response = await axios.request(options);
    console.log("CoinId", response.data);
    return response.data;
    
})

export const coinHistory = createAsyncThunk('coinHistory/fetchHistory', async ({ uuid, timePeriod }) => {
  const options = {
    method: 'GET',
    url: `https://coinranking1.p.rapidapi.com/coin/${uuid}/history`,
    params: {
      referenceCurrencyUuid: 'yhjMzLPhuIDl', // You can make this dynamic too if needed
      timePeriod: timePeriod, // Use the timePeriod passed from the action payload
    },
    headers: {
      'x-rapidapi-key': 'bbdddc0633msh0fcdc02a19a59b7p133078jsn917ebb5c31cb',
      'x-rapidapi-host': 'coinranking1.p.rapidapi.com',
    },
  };
    const response = await axios.request(options);
    console.log("CoinHistory",response.data);
    return response.data; // Return the response data as expected by the reducer
});


/*
  📦 Redux Slice for Crypto
  - Defines the initial state of the store
  - Contains reducers (if needed for synchronous updates)
  - Uses extraReducers to handle async actions from createAsyncThunk
*/
const coinSlice = createSlice({
  name: 'coin',
  initialState: {
    isLoading: false,   // tracks loading state
    isError: false,     // tracks if there's an error during fetch
    data: null,         // stores fetched data from the API
    coinDetails: null,
    coinHistoryDetails: null,
  },

  // 🔁 Reducers (for actions like add/remove/update if needed)
  reducers: {},

  /*
    ⚙️ extraReducers
    - Handles different states of the async thunk (pending, fulfilled, rejected)
    - builder.addCase lets us respond to those action types
  */
  extraReducers: (builder) => {
    builder
      // Reducers for coin data
      .addCase(coinData.pending, (state) => {
        state.isLoading = true
        state.isError = false
      })
      // When the API call is successful
      .addCase(coinData.fulfilled, (state, action) => {
        state.isLoading = false
        state.data = action.payload
      })
      // When the API call fails
      .addCase(coinData.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        console.error('Error:', action.error.message)
      })
      
      // Reducers for coinID
      .addCase(coinId.fulfilled, (state, action) => {
        state.isLoading = false;
        state.coinDetails = action.payload;
      })
      .addCase(coinId.pending, (state) => {
        state.isLoading = true;
        state.isError = false;
      })
      .addCase(coinId.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        console.log(action.error.message)
      })

      //Reducer for coin history
      .addCase(coinHistory.fulfilled, (state, action) => {
        state.isLoading = false;
        state.coinHistoryDetails = action.payload;
      })
      .addCase(coinHistory.pending, (state) => {
        state.isLoading = true;
        state.isError = false;
      })
      .addCase(coinHistory.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        console.log(action.error.message)
      })
  },
})


export const coinReducer =  coinSlice.reducer
