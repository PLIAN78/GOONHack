# Setup Guide for Fantasy Founders

## Environment Variables Setup

To use the registration and login features, you need to configure Supabase environment variables.

### Step 1: Create a `.env.local` file

Create a file named `.env.local` in the root of your project:

```bash
touch .env.local
```

### Step 2: Add your Supabase credentials

Add the following to your `.env.local` file:

```env
SUPABASE_URL=your_supabase_project_url
SUPABASE_KEY=your_supabase_anon_key
JWT_SECRET=your_secret_key_for_jwt_tokens
```

### Step 3: Get your Supabase credentials

1. Go to [https://supabase.com](https://supabase.com)
2. Sign up or log in
3. Create a new project (or use an existing one)
4. Go to Project Settings > API
5. Copy the following:
   - **Project URL** → `SUPABASE_URL`
   - **anon/public key** → `SUPABASE_KEY`

### Step 4: Create the database table

In your Supabase project, go to the SQL Editor and run this SQL:

```sql
CREATE TABLE player_userdata (
    Id_serial SERIAL PRIMARY KEY,
    username VARCHAR(100) NOT NULL UNIQUE,
    email VARCHAR(100) NOT NULL UNIQUE,
    password_hash VARCHAR(255) NOT NULL,
    first_name VARCHAR(50),
    last_name VARCHAR(50),
    profile_picture_url VARCHAR(255),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

### Step 5: Restart your development server

After adding the environment variables, restart your Next.js server:

```bash
# Stop the server (Ctrl+C)
# Then start it again
npm run dev
```

## Troubleshooting

### Error: "Server configuration error: Supabase credentials not set"

- Make sure you created `.env.local` in the root directory
- Make sure the file contains `SUPABASE_URL` and `SUPABASE_KEY`
- Restart your development server after adding environment variables

### Error: "Database error: relation 'player_userdata' does not exist"

- Make sure you created the `player_userdata` table in Supabase
- Check that the table name matches exactly (case-sensitive)

### Error: "Failed to create user: [error message]"

- Check your Supabase table structure matches the expected schema
- Make sure the columns exist and have the correct data types
- Check the Supabase logs in the Supabase dashboard

### Check the browser console and terminal

- Open browser DevTools (F12) and check the Console tab for errors
- Check your terminal where `npm run dev` is running for server-side errors

## Testing Registration

1. Make sure your `.env.local` file is configured
2. Make sure the Supabase table exists
3. Visit `http://localhost:3000/register`
4. Fill out the registration form
5. Check the error message if it fails - it should now be more specific!

