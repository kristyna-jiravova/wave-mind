"use client";

import React from "react";
import Image from "next/image";
import { useMutation } from "@tanstack/react-query";

import en from "../../i18n/local/en.json";
import { Button } from "./Button";
import { useTRPC } from "@/trpc/client";

export const NewsLetter = () => {
  const trpc = useTRPC();

  const [email, setEmail] = React.useState("");

  const subscribe = useMutation(trpc.newsletter.subscribe.mutationOptions());
  const handleSubmit = (event: React.SubmitEvent<HTMLFormElement>) => {
    event.preventDefault();

    subscribe.mutate(
      { email },
      {
        onSuccess: () => setEmail(""),
        onError: () => setEmail(""),
      },
    );
  };

  return (
    <section className="relative grid min-h-47.5 w-full place-items-center overflow-hidden px-6 py-8 text-center text-white max-sm:min-h-52.5 sm:min-h-52.5">
      <Image
        src="/images/newsletter-background.webp"
        alt={en.newsletter.backgroundImageAlt}
        fill
        sizes="100vw"
        className="object-cover"
      />
      <div className="bg absolute inset-0 bg-black/60" aria-hidden="true" />
      <div className="relative mx-auto flex w-full max-w-105 flex-col items-center justify-center text-center">
        <h2 className="text-[28px] font-light tracking-[-0.02em]">{en.newsletter.title}</h2>
        <p className="mt-1 mb-3 text-[11px]">{en.newsletter.description}</p>
        <form onSubmit={handleSubmit}>
          <input
            name="email"
            type="email"
            value={email}
            onChange={(event) => {
              setEmail(event.target.value);
              subscribe.reset();
            }}
            placeholder={en.newsletter.emailPlaceholder}
            required
            className="h-10 min-w-0 flex-1 bg-white px-4 text-[11px] text-[#526474] outline-none placeholder:text-[#7a858d]"
          />
          <Button type="submit">{en.newsletter.subscribeButton}</Button>
        </form>
        {subscribe.isError && (
          <p role="alert">
            {subscribe.error.data?.code === "CONFLICT"
              ? en.newsletter.alreadySubscribedMessage
              : en.newsletter.errorMessage}
          </p>
        )}
        {subscribe.isSuccess && <p>{en.newsletter.successMessage}</p>}
      </div>
    </section>
  );
};
