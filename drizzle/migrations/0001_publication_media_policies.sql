create policy "Editors can view publication media" on storage.objects
  for select to authenticated using (bucket_id = 'publication-media' and public.has_role(auth.uid(), 'admin'));
create policy "Editors can upload publication media" on storage.objects
  for insert to authenticated with check (bucket_id = 'publication-media' and public.has_role(auth.uid(), 'admin'));
create policy "Editors can update publication media" on storage.objects
  for update to authenticated using (bucket_id = 'publication-media' and public.has_role(auth.uid(), 'admin'));
create policy "Editors can delete publication media" on storage.objects
  for delete to authenticated using (bucket_id = 'publication-media' and public.has_role(auth.uid(), 'admin'));