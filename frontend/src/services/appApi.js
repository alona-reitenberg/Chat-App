import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
//this is for make queries to our db
const appApi = createApi({
  reducerPath: "appApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:5001",
  }),

  endpoints: (builder) => ({
    // creating the user
    signupUser: builder.mutation({
      query: (user) => ({
        url: "/users",
        method: "POST",
        body: user,
      }),
    }),

    // login
    loginUser: builder.mutation({
      query: (user) => ({
        url: "/users/login",
        method: "POST",
        body: user,
      }),
    }),

    //update
    updateUser: builder.mutation({
      query: (user) => ({
        url: "/users/settings",
        method: "PUT",
        body: user,
      }),
    }),

    // logout

    logoutUser: builder.mutation({
      query: (payload) => ({
        url: "/logout",
        method: "DELETE",
        body: payload,
      }),
    }),
  }),
});

export const {
  useSignupUserMutation,
  useLoginUserMutation,
  useUpdateUserMutation,
  useLogoutUserMutation,
} = appApi;

export default appApi;
