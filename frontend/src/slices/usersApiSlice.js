// parent slice
// implementation is on LoginScreen
import { apiSlice } from './apiSlice.js';
const USERS_URL = '/api/users';
// inject into endpoints
export const usersApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        login: builder.mutation({
            query: (data) => ({
            // /api/users/auth
                url: `${USERS_URL}/auth`,
                method: 'POST',// by default 'get'
                body: data,
            })
        }),
        logout: builder.mutation({
          query: () => ({
        // /api/users/logout
             url: `${USERS_URL}/logout`,
             method: 'POST',
          })
        }),
        register: builder.mutation({
            query: (data) => ({
        // /api/users/
               url: `${USERS_URL}/`,
               method: 'POST',
               body: data,
            })
        }),
        updateUser: builder.mutation({
          query: (data) => ({
            url: `${USERS_URL}/profile`,
            method: 'PUT',
            body: data,
          })
        }),
    }),
});
//convention for export : use...Mutation(login,logout..etc)
export const { useLoginMutation,
     useLogoutMutation, useRegisterMutation,
     useUpdateUserMutation } = usersApiSlice;