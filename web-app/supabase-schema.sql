-- ============================================
-- LeadRadar — Supabase Database Schema
-- Run this in the Supabase SQL Editor
-- ============================================

-- Enable UUID generation
create extension if not exists "uuid-ossp";

-- Create the leads table
create table if not exists leads (
  id uuid default uuid_generate_v4() primary key,
  business_name text not null,
  phone_number text not null unique,
  address text,
  niche text not null,
  contacted boolean default false,
  created_at timestamptz default now()
);

-- Index for faster queries
create index if not exists idx_leads_niche on leads (niche);
create index if not exists idx_leads_contacted on leads (contacted);
create index if not exists idx_leads_created_at on leads (created_at desc);

-- Enable Row Level Security (RLS)
-- For now, allow all operations (you can lock this down later)
alter table leads enable row level security;

-- Policy: Allow all operations for anonymous users (since we're using anon key)
create policy "Allow all operations" on leads
  for all
  using (true)
  with check (true);
