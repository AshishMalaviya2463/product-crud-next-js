import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchProducts = createAsyncThunk(
  "products/fetch",
  async (search: string) => {
    const res = await axios.get(
      `https://dummyjson.com/products/search?q=${search}`
    );
    return res.data.products;
  }
);

export const deleteProduct = createAsyncThunk(
  "products/delete",
  async (id: number) => {
    await axios.delete(`https://dummyjson.com/products/${id}`);
    return id;
  }
);

const productSlice = createSlice({
  name: "products",
  initialState: {
    list: [] as any[],
    loading: false,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchProducts.fulfilled, (state, action) => {
      state.list = action.payload;
    });
    builder.addCase(deleteProduct.fulfilled, (state, action) => {
      state.list = state.list.filter((p) => p.id !== action.payload);
    });
  },
});

export default productSlice.reducer;
