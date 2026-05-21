-- Kirar Timhirt — Supabase Schema
-- Run this in the Supabase SQL editor

-- Enable Row Level Security globally
-- Users table extends Supabase auth.users
create table if not exists public.profiles (
  id uuid references auth.users(id) on delete cascade primary key,
  email text not null,
  subscription_status text not null default 'free' check (subscription_status in ('free', 'active', 'lifetime', 'cancelled')),
  stripe_customer_id text,
  created_at timestamptz not null default now()
);

alter table public.profiles enable row level security;

create policy "Users can view own profile"
  on public.profiles for select
  using (auth.uid() = id);

create policy "Users can update own profile"
  on public.profiles for update
  using (auth.uid() = id);

-- Auto-create profile on signup
create or replace function public.handle_new_user()
returns trigger language plpgsql security definer as $$
begin
  insert into public.profiles (id, email)
  values (new.id, new.email);
  return new;
end;
$$;

create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();

-- Levels
create table if not exists public.levels (
  id serial primary key,
  title text not null,
  description text,
  order_index integer not null unique
);

alter table public.levels enable row level security;

create policy "Anyone can view levels"
  on public.levels for select
  using (true);

-- Lessons
create table if not exists public.lessons (
  id serial primary key,
  level_id integer references public.levels(id) on delete cascade not null,
  title text not null,
  description text,
  video_url text,
  pattern_gif_url text,
  challenge_text text,
  order_index integer not null,
  is_free boolean not null default false,
  created_at timestamptz not null default now(),
  unique (level_id, order_index)
);

alter table public.lessons enable row level security;

create policy "Anyone can view free lessons"
  on public.lessons for select
  using (is_free = true);

create policy "Subscribers can view all lessons"
  on public.lessons for select
  using (
    exists (
      select 1 from public.profiles
      where id = auth.uid()
      and subscription_status in ('active', 'lifetime')
    )
  );

-- User Progress
create table if not exists public.user_progress (
  user_id uuid references public.profiles(id) on delete cascade not null,
  lesson_id integer references public.lessons(id) on delete cascade not null,
  completed boolean not null default false,
  completed_at timestamptz,
  primary key (user_id, lesson_id)
);

alter table public.user_progress enable row level security;

create policy "Users can view own progress"
  on public.user_progress for select
  using (auth.uid() = user_id);

create policy "Users can insert own progress"
  on public.user_progress for insert
  with check (auth.uid() = user_id);

create policy "Users can update own progress"
  on public.user_progress for update
  using (auth.uid() = user_id);

-- Seed: Levels
insert into public.levels (title, description, order_index) values
  ('Foundations', 'Holding, tuning, and basic plucking', 1),
  ('Patterns', 'Repeating patterns, speed, and transitions', 2),
  ('Real Music', 'Simple traditional melodies and Mezmur', 3),
  ('Expression', 'Improvisation and feel', 4)
on conflict do nothing;

-- Seed: Sample Lessons (placeholder URLs — replace with real content)
insert into public.lessons (level_id, title, description, video_url, pattern_gif_url, challenge_text, order_index, is_free) values
  (1, 'How to Hold the Kirar', 'Learn the correct posture and hand position.', 'https://www.youtube.com/embed/placeholder', null, 'Hold the Kirar in playing position for 2 minutes without discomfort.', 1, true),
  (1, 'String Names & Tuning', 'Learn the 6 strings and how to tune by ear.', 'https://www.youtube.com/embed/placeholder', null, 'Tune all 6 strings from memory.', 2, true),
  (1, 'Basic Plucking', 'Single-finger pluck on each string.', 'https://www.youtube.com/embed/placeholder', 'https://placeholder.com/pluck-pattern.gif', 'Pluck each string cleanly 10 times.', 3, false),
  (2, 'The Root Pattern', 'The foundational repeating pattern.', 'https://www.youtube.com/embed/placeholder', 'https://placeholder.com/root-pattern.gif', 'Play this pattern for 3 minutes without stopping.', 1, false),
  (3, 'Tizita — First Phrase', 'Learn the opening phrase of a classic Ethiopian melody.', 'https://www.youtube.com/embed/placeholder', 'https://placeholder.com/tizita.gif', 'Play the first phrase 5 times cleanly at half speed.', 1, false)
on conflict do nothing;
