"use client";

import { useState, SubmitEvent } from "react";
import { useMutation } from "@tanstack/react-query";

import en from "../../i18n/local/en.json";
import { Button } from "./Button";
import { useTRPC } from "@/trpc/client";

export const NewsletterForm = () => {
  const trpc = useTRPC();

  const [email, setEmail] = useState("");

  const subscribe = useMutation(trpc.newsletter.subscribe.mutationOptions());
  const handleSubmit = (event: SubmitEvent<HTMLFormElement>) => {
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
    <>
      <form onSubmit={handleSubmit}>
        <input
          name="email"
          type="text"
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
    </>
  );
};
