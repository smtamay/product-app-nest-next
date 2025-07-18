import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import Cookies from "js-cookie";
import { Product } from "../../types/product";

// This file is used to define the API endpoints for the frontend application
const API = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001";

export const frontendApi = createApi({
  reducerPath: "frontendApi",
  baseQuery: fetchBaseQuery({
    baseUrl: API,
    credentials: "include",
    prepareHeaders: (headers) => {
      const token = Cookies.get("token");
      if (token) {
        headers.set("Authorization", `Bearer ${token}`);
      }
      return headers;
    },
  }),
  tagTypes: ["Products"],
  endpoints: (builder) => ({
    // User authentication endpoints
    login: builder.mutation({
      query: (credentials) => ({
        url: "/auth/login",
        method: "POST",
        body: credentials,
      }),
    }),
    getCurrentUser: builder.query({
      query: () => ({
        url: "/auth/me",
        method: "GET",
      }),
    }),
    register: builder.mutation({
      query: (newUser) => ({
        url: "/users",
        method: "POST",
        body: newUser,
      }),
    }),
    // Product management endpoints
    createProduct: builder.mutation({
      query: (newProduct) => ({
        url: "/products",
        method: "POST",
        body: newProduct,
      }),
      invalidatesTags: ["Products"],
    }),
    getProductsByUser: builder.query<
      { products: Product[]; total: number },
      { userId: number; page?: number; limit?: number }
    >({
      query: ({ userId, page, limit = 5 }) => ({
        url: `/products/user/${userId}?page=${page}&limit=${limit}`,
        method: "GET",
      }),
      providesTags: ["Products"],
    }),
  }),
});

export const {
  useLoginMutation,
  useRegisterMutation,
  useCreateProductMutation,
  useGetCurrentUserQuery,
  useGetProductsByUserQuery,
} = frontendApi;
