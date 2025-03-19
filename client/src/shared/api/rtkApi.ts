import { createApi } from "@reduxjs/toolkit/query";
import { API_URL } from "@shared/const/api_url";

export const rtkApi = createApi({
    reducerPath: 'api',
    baseQuery: fetchBaseQuery({
        baseUrl: API_URL,
        
    }),
    endpoints: () => {}
})