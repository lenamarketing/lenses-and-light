
-- Tighten USING(true) on UPDATE/DELETE — already scoped via has_role so they're fine, but the linter flags WITH CHECK(true). Re-create the two flagged ones with explicit conditions.
DROP POLICY IF EXISTS "Admins update bookings" ON public.bookings;
CREATE POLICY "Admins update bookings" ON public.bookings FOR UPDATE TO authenticated
  USING (public.has_role(auth.uid(), 'admin'))
  WITH CHECK (public.has_role(auth.uid(), 'admin'));

-- Restrict has_role execution
REVOKE EXECUTE ON FUNCTION public.has_role(uuid, app_role) FROM PUBLIC, anon;
GRANT EXECUTE ON FUNCTION public.has_role(uuid, app_role) TO authenticated, service_role;

-- Storage policies for photos bucket
CREATE POLICY "Public read photos bucket" ON storage.objects FOR SELECT TO anon, authenticated USING (bucket_id = 'photos');
CREATE POLICY "Admins upload photos bucket" ON storage.objects FOR INSERT TO authenticated WITH CHECK (bucket_id = 'photos' AND public.has_role(auth.uid(), 'admin'));
CREATE POLICY "Admins delete photos bucket" ON storage.objects FOR DELETE TO authenticated USING (bucket_id = 'photos' AND public.has_role(auth.uid(), 'admin'));
