import { createFileRoute } from "@tanstack/react-router";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useState } from "react";
import { toast } from "sonner";
import { sendContactMessage } from "@/lib/contact.functions";
import { useServerFn } from "@tanstack/react-start";
import { useLang } from "@/lib/lang-context";

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
      { name: "description", content: "Write to Mary. Sessions, editorial, prints, hellos." },
    ],
  }),
  component: Contact,
});

function Contact() {
  const { T } = useLang();
  const [sent, setSent] = useState(false);
  const send = useServerFn(sendContactMessage);
  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<Data>({ resolver: zodResolver(schema) });
  const onSubmit = async (v: Data) => {
    try { await send({ data: v }); setSent(true); toast.success(T.contact.toastSent); }
    catch (e: any) { toast.error(e?.message ?? T.contact.toastErr); }
  };

  return (
    <>
      <section className="border-b border-border">
        <div className="mx-auto max-w-[1600px] px-6 md:px-10 pt-16 md:pt-24 pb-12">
          <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground mb-8">{T.contact.badge}</p>
          <h1 className="font-display text-[clamp(3rem,12vw,12rem)] font-light tracking-[-0.05em] leading-[0.88]">
            {T.contact.h1a}<br /><span className="text-muted-foreground">{T.contact.h1b}</span> {T.contact.h1c}
          </h1>
        </div>
      </section>

      <article className="mx-auto max-w-[1600px] px-6 md:px-10 py-16 md:py-24 grid md:grid-cols-12 gap-12">
        <div className="md:col-span-5 space-y-8">
          <p className="text-lg leading-relaxed">{T.contact.intro}</p>
          <div className="space-y-4 pt-4">
            <a href="mailto:hello@maryhadalittlelens.com" className="block font-display text-2xl md:text-3xl font-light tracking-tight link-underline w-fit">
              hello@maryhadalittlelens.com
            </a>
            <a href="https://www.instagram.com/maryhadalittlelens/" target="_blank" rel="noreferrer" className="block font-display text-2xl md:text-3xl font-light tracking-tight link-underline w-fit">
              @maryhadalittlelens ↗
            </a>
          </div>
          <div className="pt-8 border-t border-border space-y-3 text-sm">
            <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground mb-4">{T.contact.alsoOn}</p>
            <p><a href="https://www.behance.net/" target="_blank" rel="noreferrer" className="link-underline">{T.contact.behance}</a></p>
            <p><a href="https://maryhadalittlelens.darkroom.com/" target="_blank" rel="noreferrer" className="link-underline">{T.contact.darkroom}</a></p>
          </div>
        </div>

        {sent ? (
          <div className="md:col-span-7 flex items-start">
            <div>
              <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground">{T.contact.sentBadge}</p>
              <h2 className="mt-6 font-display text-7xl font-light tracking-[-0.05em]">{T.contact.thanks}</h2>
              <p className="mt-6 text-muted-foreground">{T.contact.sentBody}</p>
            </div>
          </div>
        ) : (
          <form onSubmit={handleSubmit(onSubmit)} className="md:col-span-7 space-y-8">
            <Field label={T.contact.name} err={errors.name?.message}><input {...register("name")} className={inputCls} /></Field>
            <Field label={T.contact.email} err={errors.email?.message}><input type="email" {...register("email")} className={inputCls} /></Field>
            <Field label={T.contact.message} err={errors.message?.message}><textarea rows={7} {...register("message")} className={inputCls} /></Field>
            <button type="submit" disabled={isSubmitting} className="text-sm font-semibold px-8 py-4 rounded-full bg-foreground text-background hover:bg-foreground/80 disabled:opacity-50">
              {isSubmitting ? T.contact.sending : T.contact.send}
            </button>
          </form>
        )}
      </article>
    </>
  );
}

const inputCls = "w-full bg-transparent border-b border-border focus:border-foreground outline-none py-3 text-base transition-colors";

function Field({ label, err, children }: { label: string; err?: string; children: React.ReactNode }) {
  return (
    <label className="block">
      <span className="text-xs uppercase tracking-[0.15em] text-muted-foreground block mb-2">{label}</span>
      {children}
      {err && <span className="text-destructive text-xs mt-1 block">{err}</span>}
    </label>
  );
}
