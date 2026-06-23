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
  message: z.string().min(10, "A few words"),
});
type FormData = z.infer<typeof schema>;

export const Route = createFileRoute("/_site/book")({
  head: () => ({
    meta: [
      { title: "Book — Mary" },
      { name: "description", content: "Request a session. Portrait, sensual, street. Lisbon, Paris, or travel." },
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
      toast.success("Sent. I'll write back within 48h.");
    } catch (e: any) {
      toast.error(e?.message ?? "Couldn't send.");
    }
  };

  if (sent) {
    return (
      <div className="mx-auto max-w-3xl px-6 py-32 md:py-48 text-center">
        <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground mb-6">— Received</p>
        <h1 className="font-display text-[clamp(3rem,10vw,9rem)] font-light tracking-[-0.05em] leading-[0.9]">Thank you.</h1>
        <p className="mt-8 text-lg text-muted-foreground">I read every request myself. Reply within 48 hours.</p>
      </div>
    );
  }

  return (
    <>
      <section className="border-b border-border">
        <div className="mx-auto max-w-[1600px] px-6 md:px-10 pt-16 md:pt-24 pb-12">
          <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground mb-8">— Book a session</p>
          <h1 className="font-display text-[clamp(3rem,11vw,11rem)] font-light tracking-[-0.05em] leading-[0.9]">
            Tell me<br /><span className="text-muted-foreground">what you want</span><br />to make.
          </h1>
        </div>
      </section>

      <article className="mx-auto max-w-[1600px] px-6 md:px-10 py-16 md:py-24 grid md:grid-cols-12 gap-12">
        <div className="md:col-span-5 space-y-10">
          <Block t="Sensual / Boudoir" sub="90 min · indoor · from €450" />
          <Block t="Portrait" sub="60 min · your city · from €300" />
          <Block t="Street portrait" sub="2h · outdoor · from €350" />
          <Block t="Couple / Intimate" sub="2h · your location · from €600" />
          <p className="text-xs text-muted-foreground leading-relaxed pt-6 border-t border-border">
            All sessions include 25+ edited photographs, delivered in a private gallery within 14 days. Prints available.
          </p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="md:col-span-7 space-y-8">
          <Field label="Name" error={errors.name?.message}>
            <input {...register("name")} className={inputCls} />
          </Field>
          <div className="grid md:grid-cols-2 gap-8">
            <Field label="Email" error={errors.email?.message}>
              <input type="email" {...register("email")} className={inputCls} />
            </Field>
            <Field label="Phone (optional)">
              <input {...register("phone")} className={inputCls} />
            </Field>
          </div>
          <Field label="Session type">
            <select {...register("session_type")} className={inputCls}>
              <option value="sensual">Sensual / Boudoir</option>
              <option value="street_portrait">Portrait</option>
              <option value="couple">Couple / Intimate</option>
              <option value="other">Something else</option>
            </select>
          </Field>
          <div className="grid md:grid-cols-2 gap-8">
            <Field label="Preferred date">
              <input type="date" {...register("preferred_date")} className={inputCls} />
            </Field>
            <Field label="Location">
              <input {...register("location")} placeholder="City or 'your studio'" className={inputCls} />
            </Field>
          </div>
          <Field label="A few words" error={errors.message?.message}>
            <textarea rows={5} {...register("message")} className={inputCls} />
          </Field>
          <button
            type="submit"
            disabled={isSubmitting}
            className="text-sm font-semibold px-8 py-4 rounded-full bg-foreground text-background hover:bg-foreground/80 disabled:opacity-50 transition-colors"
          >
            {isSubmitting ? "Sending…" : "Send request →"}
          </button>
        </form>
      </article>
    </>
  );
}

const inputCls = "w-full bg-transparent border-b border-border focus:border-foreground outline-none py-3 text-base transition-colors";

function Field({ label, error, children }: { label: string; error?: string; children: React.ReactNode }) {
  return (
    <label className="block">
      <span className="text-xs uppercase tracking-[0.15em] text-muted-foreground block mb-2">{label}</span>
      {children}
      {error && <span className="text-destructive text-xs mt-1 block">{error}</span>}
    </label>
  );
}

function Block({ t, sub }: { t: string; sub: string }) {
  return (
    <div className="border-l-2 border-foreground pl-5">
      <p className="font-display text-3xl md:text-4xl font-light tracking-tight">{t}</p>
      <p className="text-sm text-muted-foreground mt-2">{sub}</p>
    </div>
  );
}
