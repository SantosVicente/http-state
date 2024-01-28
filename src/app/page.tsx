"use client";

import { QueryClientProvider, useQuery } from "@tanstack/react-query";
import { queryClient } from "@/lib/react-query";
import Dashboard from "@/components/Dashboard";

export default function Home() {
  return (
    <QueryClientProvider client={queryClient}>
      <Dashboard />
    </QueryClientProvider>
  );
}
