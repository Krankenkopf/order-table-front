import { createClient, fetchExchange } from "urql";
console.log(process.env.API_URL);

const client = createClient({
  url: process.env.REACT_APP_API_URL || "http://localhost:5000/graphql",
  fetchOptions: () => {
    // Token?
    return {
      headers: {
        "API-KEY": process.env.REACT_APP_API_KEY!,
      },
    };
  },
  exchanges: [fetchExchange],
});

export default client;
