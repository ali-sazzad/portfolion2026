"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { portfolio } from "@/data/portfolio";

const schema = z.object({
  name: z.string().min(2, "Enter your name."),
  email: z.string().email("Enter a valid email address."),
  message: z.string().min(20, "Tell me a bit more, at least 20 characters."),
});
type Values = z.infer<typeof schema>;

const field =
  "mt-2 w-full rounded-xl border border-ink/30 bg-white px-4 py-3 text-base outline-none transition-colors focus:border-cobalt aria-[invalid=true]:border-red-600";

export function ContactForm() {
  const [sent, setSent] = useState(false);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<Values>({ resolver: zodResolver(schema) });

  // Sample site: no backend. Swap this for a server action or route handler.
  const onSubmit = async () => {
    await new Promise((r) => setTimeout(r, 500));
    setSent(true);
    reset();
  };

  if (sent) {
    return (
      <div role="status" className="rounded-2xl bg-butter p-8 text-ink">
        <p className="display text-3xl font-semibold">Message sent</p>
        <p className="mt-3 max-w-[40ch]">
          Thanks for getting in touch. This is a sample form, so nothing was delivered. A live version would reply
          within two working days.
        </p>
        <button type="button" className="mt-6 font-medium underline underline-offset-4" onClick={() => setSent(false)}>
          Send another message
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate className="on-paper space-y-5">
      <div>
        <label htmlFor="name" className="font-medium">Your name</label>
        <input
          id="name"
          autoComplete="name"
          className={field}
          aria-invalid={!!errors.name}
          aria-describedby={errors.name ? "name-err" : undefined}
          {...register("name")}
        />
        {errors.name && <p id="name-err" className="mt-1 text-sm text-red-700">{errors.name.message}</p>}
      </div>
      <div>
        <label htmlFor="email" className="font-medium">Email</label>
        <input
          id="email"
          type="email"
          autoComplete="email"
          className={field}
          aria-invalid={!!errors.email}
          aria-describedby={errors.email ? "email-err" : undefined}
          {...register("email")}
        />
        {errors.email && <p id="email-err" className="mt-1 text-sm text-red-700">{errors.email.message}</p>}
      </div>
      <div>
        <label htmlFor="message" className="font-medium">What are you building?</label>
        <textarea
          id="message"
          rows={5}
          className={field}
          aria-invalid={!!errors.message}
          aria-describedby={errors.message ? "message-err" : undefined}
          {...register("message")}
        />
        {errors.message && <p id="message-err" className="mt-1 text-sm text-red-700">{errors.message.message}</p>}
      </div>
      <div className="flex flex-wrap items-center gap-4">
        <button
          type="submit"
          disabled={isSubmitting}
          className="rounded-full bg-ink px-7 py-3 font-medium text-white transition-colors hover:bg-cobalt disabled:opacity-60"
        >
          {isSubmitting ? "Sending..." : "Send message"}
        </button>
        <a href={`mailto:${portfolio.profile.email}`} className="text-sm text-mute underline underline-offset-4">
          or email {portfolio.profile.email}
        </a>
      </div>
    </form>
  );
}
