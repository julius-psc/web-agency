-- ============================================
-- Migration: Add status and drop contacted
-- Run this in the Supabase SQL Editor
-- ============================================

-- 1. Add the new status column if it doesn't exist
ALTER TABLE leads ADD COLUMN IF NOT EXISTS status text DEFAULT 'pending';

-- 2. Migrate existing 'contacted' leads to the new 'contacted' status
-- Note: the user requested to identify and update leads that were previously set to "completed" directly,
-- without intermediary statuses, and are now back to "pending." The user wants these leads to be set to "contacted."
-- Since the old schema used the `contacted` boolean, we map `contacted = true` to `status = 'contacted'`.
UPDATE leads 
SET status = 'contacted' 
WHERE contacted = true AND status = 'pending';

-- 3. Create index for the new status column
CREATE INDEX IF NOT EXISTS idx_leads_status ON leads (status);

-- 4. Drop the old contacted column and its index
DROP INDEX IF EXISTS idx_leads_contacted;
ALTER TABLE leads DROP COLUMN IF EXISTS contacted;
