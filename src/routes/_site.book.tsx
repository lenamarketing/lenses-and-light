import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { toast } from "sonner";
import { createBooking } from "@/lib/bookings.functions";
import { useServerFn } from "@tanstack/react-start";

const schema = z.object({
  name: z.string().min(2, "Your name, please"),
  email: z.string().email("A reachable email"),
  phone: z.string().optional(),
  session_type: z.enum(["sensual", "street_portrait", "couple", "other"]),
  preferred_date: z.string().optional(),
  location: z.string().optional(),
  message: z.string().min(10, "A few words about what you'd like"),
});

type FormData = z.infer<typeof schema>;

export const Route = createFileRoute("/_site/book")({
  head: () => ({
    meta: [
      { title: "Book a session — Mary" },
      { name: "description", content: "Request a sensual, boudoir, or portrait session with Mary. Lisbon, Paris, or travel." },
      { property: "og:title", content: "Book a session with Mary" },
      { property: "og:description", content: "Sensual, boudoir, and portrait sessions. Request your date." },
    ],
  }),
  component: BookPage,
});

function BookPage() {
  const [sent, setSent] = useState(false);
  const createFn = useServerFn(createBooking);
  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: { session_type: "sensual" },
  });

  const onSubmit = async (values: FormData) => {
    try {
      await createFn({ data: values });
      setSent(true);
      toast.success("Request sent. Mary will be in touch within 48h.");
    } catch (e: any) {
      toast.error(e?.message ?? "Couldn't send — try again?");
    }
  };

  if (sent) {
    return (
      <div className="mx-auto max-w-2xl px-6 py-32 text-center">
        <p className="eyebrow text-accent mb-6">Received</p>
        <h1 className="font-display text-5xl md:text-6xl leading-tight">Thank you.</h1>
        <p className="mt-6 text-lg text-muted-foreground">I read every request myself. Expect a reply within 48 hours.</p>
      </div>
    );
  }

  return (
    <article className="mx-auto max-w-[1400px] px-6 md:px-10 py-16 md:py-24 grid md:grid-cols-12 gap-12">
      <div className="md:col-span-5">
        <p className="eyebrow text-muted-foreground">Book a session</p>
        <h1 className="mt-6 font-display text-[clamp(2.5rem,6vw,5rem)] leading-[0.95]">
          Tell me what you'd like to <em className="italic text-accent">make</em>.
        </h1>
        <div className="mt-10 space-y-6 text-muted-foreground">
          <Block t="Sensual / Boudoir" d="90 min · indoor · from €450" />
          <Block t="Street portrait" d="2h · your city · from €350" />
          <Block t="Couple / intimate" d="2h · location of your choice · from €600" />
        </div>
        <p className="mt-10 text-xs text-muted-foreground leading-relaxed">All sessions include 25+ edited photographs, delivered in a private online gallery within 14 days. Prints available.</p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="md:col-span-7 space-y-6 md:pl-8 md:border-l border-border">
        <Field label="Name" error={errors.name?.message}>
          <input {...register("name")} className={input} />
        </Field>
        <div className="grid md:grid-cols-2 gap-6">
          <Field label="Email" error={errors.email?.message}>
            <input type="email" {...register("email")} className={input} />
          </Field>
          <Field label="Phone (optional)">
            <input {...register("phone")} className={input} />
          </Field>
        </div>
        <Field label="Session type">
          <select {...register("session_type")} className={input}>
            <option value="sensual">Sensual / Boudoir</option>
            <option value="street_portrait">Street portrait</option>
            <option value="couple">Couple / intimate</option>
            <option value="other">Something else</option>
          </select>
        </Field>
        <div className="grid md:grid-cols-2 gap-6">
          <Field label="Preferred date">
            <input type="date" {...register("preferred_date")} className={input} />
          </Field>
          <Field label="Location">
            <input {...register("location")} placeholder="City, or 'your studio'" className={input} />
          </Field>
        </div>
        <Field label="A few words about what you'd like" error={errors.message?.message}>
          <textarea rows={5} {...register("message")} className={input} />
        </Field>
        <button
          type="submit"
          disabled={isSubmitting}
          className="eyebrow px-8 py-4 bg-foreground text-background hover:bg-accent transition-colors disabled:opacity-50"
        >
          {isSubmitting ? "Sending…" : "Send request"}
        </button>
      </form>
    </article>
  );
}

const input = "w-full bg-transparent border-b border-foreground/30 focus:border-accent outline-none py-3 px-0 text-base placeholder:text-muted-foreground/60 transition-colors";

function Field({ label, error, children }: { label: string; error?: string; children: React.ReactNode }) {
  return (
    <label className="block">
      <span className="eyebrow text-muted-foreground block mb-1">{label}</span>
      {children}
      {error && <span className="text-destructive text-xs mt-1 block">{error}</span>}
    </label>
  );
}

function Block({ t, d }: { t: string; d: string }) {
  return (
    <div className="border-l-2 border-accent pl-4">
      <p className="font-display text-2xl text-foreground">{t}</p>
      <p className="text-sm">{d}</p>
    </div>
  );
}
