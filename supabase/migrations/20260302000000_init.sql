-- Enable UUID extension
create extension if not exists "uuid-ossp";

-- PROFILES
create table public.profiles (
  id uuid references auth.users on delete cascade primary key,
  full_name text,
  avatar_url text,
  plan text check (plan in ('free', 'pro', 'team')) default 'free',
  created_at timestamptz default now()
);

alter table public.profiles enable row level security;

create policy "Users can read own profile"
  on public.profiles for select using (auth.uid() = id);

create policy "Users can update own profile"
  on public.profiles for update using (auth.uid() = id);

-- Trigger to create profile on sign up
create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer set search_path = public
as $$
begin
  insert into public.profiles (id, full_name, avatar_url)
  values (new.id, new.raw_user_meta_data->>'full_name', new.raw_user_meta_data->>'avatar_url');
  return new;
end;
$$;

create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();


-- USER_PASSPORTS
create table public.user_passports (
  id uuid primary key default uuid_generate_v4(),
  user_id uuid references public.profiles(id) on delete cascade not null,
  country_code varchar(2) not null,
  country_name text not null,
  is_primary boolean default false,
  created_at timestamptz default now()
);

alter table public.user_passports enable row level security;

create policy "Users can read own passports"
  on public.user_passports for select using (auth.uid() = user_id);
create policy "Users can insert own passports"
  on public.user_passports for insert with check (auth.uid() = user_id);
create policy "Users can update own passports"
  on public.user_passports for update using (auth.uid() = user_id);
create policy "Users can delete own passports"
  on public.user_passports for delete using (auth.uid() = user_id);


-- SAVED_ROUTES
create table public.saved_routes (
  id uuid primary key default uuid_generate_v4(),
  user_id uuid references public.profiles(id) on delete cascade not null,
  name text,
  passport_country varchar(2) not null,
  destinations jsonb not null,
  optimized_order jsonb not null,
  optimization_goal text not null,
  created_at timestamptz default now()
);

alter table public.saved_routes enable row level security;

create policy "Users can manage own routes"
  on public.saved_routes for all using (auth.uid() = user_id);


-- VISA_CACHE
create table public.visa_cache (
  id uuid primary key default uuid_generate_v4(),
  passport_code varchar(2) not null,
  destination_code varchar(2) not null,
  data jsonb not null,
  fetched_at timestamptz default now(),
  expires_at timestamptz not null,
  unique(passport_code, destination_code)
);

alter table public.visa_cache enable row level security;

create policy "Anyone can read visa cache"
  on public.visa_cache for select using (true);

-- Only service role can write, we enforce this by not having an insert/update policy for public users.
-- Actually, the server action using service role will bypass RLS anyway.


-- ALERT_SUBSCRIPTIONS
create table public.alert_subscriptions (
  id uuid primary key default uuid_generate_v4(),
  user_id uuid references public.profiles(id) on delete cascade not null,
  passport_code varchar(2) not null,
  destination_code varchar(2) not null,
  is_active boolean default true,
  created_at timestamptz default now()
);

alter table public.alert_subscriptions enable row level security;

create policy "Users can manage own alerts"
  on public.alert_subscriptions for all using (auth.uid() = user_id);


-- CONVERSATIONS
create table public.conversations (
  id uuid primary key default uuid_generate_v4(),
  user_id uuid references public.profiles(id) on delete cascade not null,
  title text not null,
  messages jsonb default '[]'::jsonb,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

alter table public.conversations enable row level security;

create policy "Users can manage own conversations"
  on public.conversations for all using (auth.uid() = user_id);
