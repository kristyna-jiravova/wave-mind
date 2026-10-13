"use client";

import { useQuery } from "@tanstack/react-query";

import { useTRPC } from "@/trpc/client";

export const TrpcTest = () => {
  const trpc = useTRPC();

  const { data, isLoading, error } = useQuery(trpc.test.greet.queryOptions({ name: "Kristyna" }));

  if (isLoading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error: {error.message}</p>;
  }

  return <p>{data?.message}</p>;
};
