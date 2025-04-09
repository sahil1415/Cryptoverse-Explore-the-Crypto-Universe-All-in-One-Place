import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'

// Thunk to fetch exchange data
export const exchangeData = createAsyncThunk('exchange/fetchData', async () => {
 
  const response = await axios.get("https://api.coingecko.com/api/v3/exchanges");
  console.log('API Response:', response.data); 
  return response.data; 
})

const exchangeSlice = createSlice({
  name: 'exchange',
  initialState: {
    isLoading: false, // tracks loading state
    isError: false,   // tracks if there's an error during fetch
    data: [],         // stores fetched data (we'll store it as an array)
    errorMessage: ''  // store the error message
  },

  reducers: {},

  extraReducers: (builder) => {
    builder
      // When the API call starts
      .addCase(exchangeData.pending, (state) => {
        state.isLoading = true
        state.isError = false
        state.errorMessage = ''
        console.log('Loading data...');
      })
      // When the API call is successful
      .addCase(exchangeData.fulfilled, (state, action) => {
        state.isLoading = false
        // Convert the response object into an array (we're extracting the values)
        state.data = action.payload;
        console.log('Exchange data received:', state.data); // Log the data in state
      })
      // When the API call fails
      .addCase(exchangeData.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.errorMessage = action.error.message // Storing the error message
        console.error('Error:', action.error.message);
      })
  },
})

export default exchangeSlice.reducer
