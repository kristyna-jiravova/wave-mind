import { z } from "zod";
import { TRPCError } from "@trpc/server";

import { supabase } from "@/lib/supabase";
import { createTRPCRouter, publicProcedure } from "../trpc";

export const newsletterRouter = createTRPCRouter({
  subscribe: publicProcedure.input(z.object({ email: z.email() })).mutation(async ({ input }) => {
    const { error } = await supabase.from("newsletter_subscribers").insert({ email: input.email });

    if (error) {
      if (error.code === "23505") {
        throw new TRPCError({
          code: "CONFLICT",
          message: "Email already subscribed",
        });
      }

      throw new Error("Unable to subscribe");
    }

    return { success: true };
  }),
});
