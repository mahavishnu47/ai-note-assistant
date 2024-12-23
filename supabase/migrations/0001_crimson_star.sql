/*
  # Initial Schema Setup for AI Assistant

  1. New Tables
    - categories
      - id (uuid, primary key)
      - name (text)
      - user_id (uuid, references auth.users)
      - created_at (timestamp)
    
    - notes
      - id (uuid, primary key)
      - content (text)
      - category_id (uuid, references categories)
      - user_id (uuid, references auth.users)
      - created_at (timestamp)

  2. Security
    - Enable RLS on both tables
    - Add policies for authenticated users to manage their own data
*/

-- Create categories table
CREATE TABLE categories (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  user_id uuid NOT NULL REFERENCES auth.users(id),
  created_at timestamptz DEFAULT now()
);

-- Create notes table
CREATE TABLE notes (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  content text NOT NULL,
  category_id uuid REFERENCES categories(id),
  user_id uuid NOT NULL REFERENCES auth.users(id),
  created_at timestamptz DEFAULT now()
);

-- Enable RLS
ALTER TABLE categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE notes ENABLE ROW LEVEL SECURITY;

-- Categories policies
CREATE POLICY "Users can manage their own categories"
  ON categories
  FOR ALL
  TO authenticated
  USING (auth.uid() = user_id);

-- Notes policies
CREATE POLICY "Users can manage their own notes"
  ON notes
  FOR ALL
  TO authenticated
  USING (auth.uid() = user_id);