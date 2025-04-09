import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const newsData = createAsyncThunk('news/fetchData', async () => {
  
  const options = {
    method: 'GET',
    url: 'https://cryptocurrency-news2.p.rapidapi.com/v1/theguardian',
    headers: {
      'x-rapidapi-key': 'bbdddc0633msh0fcdc02a19a59b7p133078jsn917ebb5c31cb',
      'x-rapidapi-host': 'cryptocurrency-news2.p.rapidapi.com'
    }
  };
  
    const response = await axios.request(options);
    console.log("Api Response",response.data);
    return response.data;
});

const newsSlice = createSlice({
  name: 'news',
  initialState: {
    isLoading: false,
    isError: false,
    data: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(newsData.pending, (state) => {
        state.isLoading = true;
        state.isError = false;
      })
      .addCase(newsData.fulfilled, (state, action) => {
        state.isLoading = false;
        state.data = action.payload;
      })
      .addCase(newsData.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        console.error('Error:', action.error.message);
      });
  },
});

export default newsSlice.reducer;
