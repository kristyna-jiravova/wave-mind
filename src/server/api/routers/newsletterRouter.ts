import { z } from "zod";
import { TRPCError } from "@trpc/server";

import { supabase } from "@/lib/supabase";
import { createTRPCRouter, publicProcedure } from "../trpc";

const SUPABASE_ERROR = { UNIQUE_VIOLATION: "23505" } as const;

export const newsletterRouter = createTRPCRouter({
  subscribe: publicProcedure.input(z.object({ email: z.email() })).mutation(async ({ input }) => {
    const { error } = await supabase.from("newsletter_subscribers").insert({ email: input.email });

    if (error) {
      if (error.code === SUPABASE_ERROR.UNIQUE_VIOLATION) {
        throw new TRPCError({
          code: "CONFLICT",
          message: "Email already subscribed",
        });
      }

      throw new TRPCError({
        code: "INTERNAL_SERVER_ERROR",
        message: "Unable to subscribe",
      });
    }

    return { success: true };
  }),
});
