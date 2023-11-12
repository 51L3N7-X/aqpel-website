"use client";

import React from "react";
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

export function ReactQueryProvider({ children }: React.PropsWithChildren) {
  // console.log(process.env.NODE_ENV);
  const [client] = React.useState(new QueryClient());

  return (
    <QueryClientProvider client={client}>
      {children}
      {process.env.NODE_ENV == "development" && (
        <ReactQueryDevtools initialIsOpen={false} />
      )}
    </QueryClientProvider>
  );
}
