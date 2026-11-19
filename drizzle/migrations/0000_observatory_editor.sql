create type public.app_role as enum ('admin', 'user');

create table public.user_roles (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references auth.users(id) on delete cascade not null,
  role public.app_role not null,
  unique (user_id, role)
);
grant select on public.user_roles to authenticated;
grant all on public.user_roles to service_role;
alter table public.user_roles enable row level security;
create policy "Users can read their own roles" on public.user_roles
  for select to authenticated using (user_id = auth.uid());

create or replace function public.has_role(_user_id uuid, _role public.app_role)
returns boolean language sql stable security definer set search_path = public as $$
  select exists (select 1 from public.user_roles where user_id = _user_id and role = _role)
$$;

-- The first account ever created becomes the editor. Later sign-ups get no role.
create or replace function public.assign_first_editor()
returns trigger language plpgsql security definer set search_path = public as $$
begin
  perform pg_advisory_xact_lock(4242001);
  if not exists (select 1 from public.user_roles where role = 'admin') then
    insert into public.user_roles (user_id, role) values (new.id, 'admin');
  end if;
  return new;
end;
$$;
create trigger on_auth_user_created_assign_editor
  after insert on auth.users for each row execute function public.assign_first_editor();

create type public.publication_status as enum ('draft', 'review', 'published');

create table public.publications (
  id uuid primary key default gen_random_uuid(),
  slug text not null unique check (slug ~ '^[a-z0-9]+(-[a-z0-9]+)*$'),
  pub_type text not null default 'omega-thesis' check (pub_type in ('omega-thesis', 'editorial')),
  status public.publication_status not null default 'draft',
  title_en text not null,
  title_de text not null default '',
  subtitle_en text not null default '',
  subtitle_de text not null default '',
  abstract_en text not null default '',
  abstract_de text not null default '',
  body_en text not null default '',
  body_de text not null default '',
  collections text[] not null default '{}',
  tags text[] not null default '{}',
  refs jsonb not null default '[]'::jsonb,
  related_entries text[] not null default '{}',
  cover_url text,
  cover_alt_en text not null default '',
  cover_alt_de text not null default '',
  cover_credit text not null default '',
  author_line text not null default 'OMEGA Editorial',
  editorial_note_en text not null default '',
  editorial_note_de text not null default '',
  ai_assisted boolean not null default false,
  featured boolean not null default false,
  published_at timestamptz,
  created_by uuid,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);
grant select on public.publications to anon;
grant select, insert, update, delete on public.publications to authenticated;
grant all on public.publications to service_role;
alter table public.publications enable row level security;

create policy "Anyone can read published publications" on public.publications
  for select to anon, authenticated using (status = 'published');
create policy "Editors can read all publications" on public.publications
  for select to authenticated using (public.has_role(auth.uid(), 'admin'));
create policy "Editors can create publications" on public.publications
  for insert to authenticated with check (public.has_role(auth.uid(), 'admin'));
create policy "Editors can update publications" on public.publications
  for update to authenticated using (public.has_role(auth.uid(), 'admin')) with check (public.has_role(auth.uid(), 'admin'));
create policy "Editors can delete publications" on public.publications
  for delete to authenticated using (public.has_role(auth.uid(), 'admin'));

create or replace function public.publications_touch()
returns trigger language plpgsql set search_path = public as $$
begin
  new.updated_at := now();
  if new.status = 'published' and new.published_at is null then
    new.published_at := now();
  end if;
  return new;
end;
$$;
create trigger publications_touch before insert or update on public.publications
  for each row execute function public.publications_touch();

create index publications_status_idx on public.publications (status, published_at desc);