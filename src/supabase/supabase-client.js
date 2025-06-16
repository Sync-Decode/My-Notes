import { createClient } from '@supabase/supabase-js'
import { supabaseAPIKey } from '@/app/keys/supabaseAPIKey'
import { supabaseURL } from '@/app/keys/supabaseAPIKey'

export const supabase = createClient(supabaseURL, supabaseAPIKey)
