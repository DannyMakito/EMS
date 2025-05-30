import { createClient } from "@supabase/supabase-js";

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseKey = import.meta.env.VITE_SUPABASE_KEY;

if (!supabaseUrl || !supabaseKey) {
  throw new Error('Missing Supabase environment variables. Please check your .env file.');
}

const supabase = createClient(supabaseUrl, supabaseKey, {
  auth: {
    persistSession: true,
    autoRefreshToken: true,
    detectSessionInUrl: true
  },
  realtime: {
    params: {
      eventsPerSecond: 10
    }
  },
  global: {
    headers: {
      'x-application-name': 'gas-ems'
    }
  }
});

// Create a channel for connection monitoring
const connectionChannel = supabase.channel('connection-monitor');

// Set up connection monitoring
connectionChannel
  .on('system', { event: 'disconnected' }, () => {
    console.log('WebSocket disconnected. Attempting to reconnect...');
  })
  .on('system', { event: 'connected' }, () => {
    console.log('WebSocket reconnected successfully');
  })
  .subscribe();

export default supabase;