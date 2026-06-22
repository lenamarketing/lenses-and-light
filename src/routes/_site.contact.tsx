import { createFileRoute } from "@tanstack/react-router";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useState } from "react";
import { toast } from "sonner";
import { sendContactMessage } from "@/lib/contact.functions";
import { useServerFn } from "@tanstack/react-start";
import { Instagram, Mail } from "lucide-react";

const schema = z.object({
  name: z.string().min(2),
  email: z.string().email(),
  message: z.string().min(10),
});
type Data = z.infer<typeof schema>;

export const Route = createFileRoute("/_site/contact")({
  head: () => ({
    meta: [
      { title: "Contact — Mary" },
      { name: "description", content: "Say hello to Mary. For sessions, editorial, prints, or just a kind word." },
      { property: "og:title", content: "Contact Mary" },
      { property: "og:description", content: "Say hello — sessions, editorial, prints." },
    ],
  }),
  component: Contact,
});

function Contact() {
  const [sent, setSent] = useState(false);
  const send = useServerFn(sendContactMessage);
  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<Data>({ resolver: zodResolver(schema) });
  const onSubmit = async (v: Data) => {
    try { await send({ data: v }); setSent(true); toast.success("Message sent."); }
    catch (e: any) { toast.error(e?.message ?? "Couldn't send."); }
  };

  return (
    <article className="mx-auto max-w-[1400px] px-6 md:px-10 py-16 md:py-24 grid md:grid-cols-12 gap-12">
      <div className="md:col-span-5">
        <p className="eyebrow text-muted-foreground">Say hello</p>
        <h1 className="mt-6 font-display text-[clamp(2.5rem,6vw,5rem)] leading-[0.95]">
          Write to <em className="italic text-accent">me</em>.
        </h1>
        <p className="mt-8 text-lg text-muted-foreground max-w-md">For editorial, prints, collaborations — or to ask anything at all.</p>

        <div className="mt-10 space-y-4">
          <a href="mailto:hello@maryhadalittlelens.com" className="flex items-center gap-3 text-base hover:text-accent">
            <Mail size={18} /> hello@maryhadalittlelens.com
          </a>
          <a href="https://www.instagram.com/maryhadalittlelens/" target="_blank" rel="noreferrer" className="flex items-center gap-3 text-base hover:text-accent">
            <Instagram size={18} /> @maryhadalittlelens
          </a>
        </div>

        <div className="mt-10 pt-10 border-t border-border space-y-3">
          <p className="eyebrow text-muted-foreground">Also on</p>
          <ul className="space-y-2 text-sm">
            <li><a href="https://www.behance.net/" target="_blank" rel="noreferrer" className="hover:text-accent">Behance — long-form projects</a></li>
            <li><a href="https://maryhadalittlelens.darkroom.com/" target="_blank" rel="noreferrer" className="hover:text-accent">Darkroom — buy prints</a></li>
          </ul>
        </div>
      </div>

      {sent ? (
        <div className="md:col-span-7 md:pl-8 md:border-l border-border flex items-center">
          <div>
            <p className="eyebrow text-accent">Received</p>
            <h2 className="mt-4 font-display text-5xl">Thank you.</h2>
            <p className="mt-4 text-muted-foreground">I'll write back within a few days.</p>
          </div>
        </div>
      ) : (
        <form onSubmit={handleSubmit(onSubmit)} className="md:col-span-7 md:pl-8 md:border-l border-border space-y-6">
          <Field label="Name" err={errors.name?.message}><input {...register("name")} className={input} /></Field>
          <Field label="Email" err={errors.email?.message}><input type="email" {...register("email")} className={input} /></Field>
          <Field label="Message" err={errors.message?.message}><textarea rows={7} {...register("message")} className={input} /></Field>
          <button type="submit" disabled={isSubmitting} className="eyebrow px-8 py-4 bg-foreground text-background hover:bg-accent disabled:opacity-50">
            {isSubmitting ? "Sending…" : "Send"}
          </button>
        </form>
      )}
    </article>
  );
}

const input = "w-full bg-transparent border-b border-foreground/30 focus:border-accent outline-none py-3 text-base transition-colors";

function Field({ label, err, children }: { label: string; err?: string; children: React.ReactNode }) {
  return (
    <label className="block">
      <span className="eyebrow text-muted-foreground block mb-1">{label}</span>
      {children}
      {err && <span className="text-destructive text-xs mt-1 block">{err}</span>}
    </label>
  );
}
