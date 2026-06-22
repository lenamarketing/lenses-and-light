import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";
import { getSupabaseServerClient } from "@/integrations/supabase/client.server";

const schema = z.object({
  name: z.string().min(2).max(120),
  email: z.string().email().max(200),
  phone: z.string().max(40).optional(),
  session_type: z.enum(["sensual", "street_portrait", "couple", "other"]),
  preferred_date: z.string().optional(),
  location: z.string().max(200).optional(),
  message: z.string().min(10).max(4000),
});

export const createBooking = createServerFn({ method: "POST" })
  .validator((d: unknown) => schema.parse(d))
  .handler(async ({ data }) => {
    const supabase = getSupabaseServerClient();
    const { error } = await supabase.from("bookings").insert({
      name: data.name,
      email: data.email,
      phone: data.phone ?? null,
      session_type: data.session_type,
      preferred_date: data.preferred_date ? new Date(data.preferred_date).toISOString() : null,
      location: data.location ?? null,
      message: data.message,
    });
    if (error) throw new Error(error.message);
    return { ok: true };
  });
