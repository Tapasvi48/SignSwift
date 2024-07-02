// lib/supabase.ts
import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://bxmmvowyynlggzhyuhid.supabase.co";
const supabaseKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJ4bW12b3d5eW5sZ2d6aHl1aGlkIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTcwOTcxODIzNSwiZXhwIjoyMDI1Mjk0MjM1fQ.rOfF5lgXV-AcTr_jGzX-oFhtsqFkh380w-kA6I1cmWE";

export const supabase = createClient(supabaseUrl, supabaseKey);
