import { z } from "zod";
import { createTRPCRouter, publicProcedure } from "../trpc";
import { supabase } from "@/lib/supabase";

export const testRouter = createTRPCRouter({
  greet: publicProcedure.input(z.object({ name: z.string() })).query(({ input }) => {
    return {
      message: `Hello, ${input.name}!`,
    };
  }),

  checkDatabase: publicProcedure.query(async () => {
    const { data, error } = await supabase.from("connection_test").select("message").single();

    if (error) {
      throw new Error(error.message);
    }

    return data;
  }),
});
