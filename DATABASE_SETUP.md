# Database Setup Guide

This guide will help you set up the Supabase database for the MILAN 26' ticket booking system.

## Prerequisites

1. Supabase project already created with the credentials in `.env`
2. Node.js and npm installed
3. Supabase CLI installed locally (already done)

## Environment Variables

Your `.env` file should contain:

```env
# Supabase Configuration
NEXT_PUBLIC_SUPABASE_URL=https://mzgbitcwtsjpxhwgkylw.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key-here
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key-here
```

## Database Schema

The database includes the following tables:

- **events**: Stores information about events (pro shows, workshops, etc.)
- **tickets**: Individual tickets for each event
- **profiles**: User profiles (extends Supabase auth.users)
- **bookings**: Ticket bookings made by users

### Key Features

- Row Level Security (RLS) enabled on all tables
- Proper relationships between tables
- Sample data for Thaman and Thriple pro shows
- Automatic timestamp updates

## Running the Migration

### Recommended: Using Supabase Dashboard

1. Go to your [Supabase project dashboard](https://supabase.com/dashboard/project/mzgbitcwtsjpxhwgkylw)
2. Navigate to the **SQL Editor** tab
3. Copy and paste the contents of `supabase/migrations/20241204031400_initial_schema.sql`
4. Click **Run** to execute the migration

The migration will create:
- All necessary tables (events, tickets, profiles, bookings)
- Row Level Security policies
- Indexes for performance
- Sample data for the pro shows

### Alternative: Using Supabase CLI

If you have the Supabase CLI authenticated:

```bash
npx supabase db push
```

**Note**: The API route approach has limitations due to Supabase's security model and is not recommended for production setup.

## Sample Data

The migration includes sample data for:

- **Thaman Live in Concert**: 5000 tickets (VIP, Gold, Silver sections)
- **Thriple Live Performance**: 5000 tickets (VIP, Gold, Silver sections)

## API Usage

Once the database is set up, you can use the Supabase client in your components:

```typescript
import { supabase } from '@/lib/supabase';

// Get all events
const { data: events } = await supabase
  .from('events')
  .select('*')
  .eq('is_active', true);

// Get tickets for an event
const { data: tickets } = await supabase
  .from('tickets')
  .select('*')
  .eq('event_id', eventId)
  .eq('status', 'available');
```

## Authentication

The system uses Supabase Auth for user management. Users will need to:

1. Sign up/Sign in
2. Complete their profile with college information
3. Book tickets through the system

## Security

- Row Level Security policies ensure users can only access their own data
- Service role key is used for admin operations
- Public anon key is used for client-side operations

## Next Steps

After setting up the database:

1. Implement user authentication
2. Create ticket booking components
3. Add payment integration
4. Implement admin dashboard for managing events/tickets

## Troubleshooting

- If the API route doesn't work, ensure you're in development mode
- Check Supabase dashboard for any errors during migration
- Verify all environment variables are set correctly
- Ensure the Supabase project is accessible and not paused
