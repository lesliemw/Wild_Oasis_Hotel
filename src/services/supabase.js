import { createClient } from "@supabase/supabase-js";

export const supabaseUrl = "https://labwvkenvddcehdsrknk.supabase.co";
const supabaseKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImxhYnd2a2VudmRkY2VoZHNya25rIiwicm9sZSI6ImFub24iLCJpYXQiOjE2OTg1OTU2ODQsImV4cCI6MjAxNDE3MTY4NH0.iOWGbGsKY5qtLUXmuhQPkJnDPEa9yg3KS3A9Lc4wMQg";
const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase;
