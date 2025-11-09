/**
 * User Data Schema and API Reference
 * 
 * This file documents the user data structure and API endpoints for player registration.
 * The actual implementation is in Next.js API routes.
 * 
 * Database Schema (Supabase table: player_userdata):
 * - Id_serial: SERIAL PRIMARY KEY
 * - username: VARCHAR(100) NOT NULL
 * - email: VARCHAR(100) NOT NULL
 * - password_hash: VARCHAR(255) NOT NULL
 * - first_name: VARCHAR(50)
 * - last_name: VARCHAR(50)
 * - profile_picture_url: VARCHAR(255)
 * - created_at: TIMESTAMP DEFAULT CURRENT_TIMESTAMP
 * 
 * API Endpoints:
 * - POST /api/players/register - Register a new user
 *   Body: { username, email, password, firstName?, lastName? }
 *   Returns: { message, token, user: { id, username, email } }
 * 
 * - POST /api/login - Login existing user
 *   Body: { email, password }
 *   Returns: { message, token }
 * 
 * Frontend Pages:
 * - /register - Registration page
 * - /login - Login page
 */

export interface PlayerUserData {
  Id_serial: number;
  username: string;
  email: string;
  password_hash: string;
  first_name?: string | null;
  last_name?: string | null;
  profile_picture_url?: string | null;
  created_at: string;
}

export interface RegisterRequest {
  username: string;
  email: string;
  password: string;
  firstName?: string;
  lastName?: string;
}

export interface RegisterResponse {
  message: string;
  token: string;
  user: {
    id: number;
    username: string;
    email: string;
  };
}
