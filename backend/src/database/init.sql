
-- -- Create users table
-- CREATE TABLE IF NOT EXISTS users (
--   id UUID PRIMARY KEY,
--   username VARCHAR(50) UNIQUE NOT NULL,
--   email VARCHAR(100) UNIQUE NOT NULL,
--   password VARCHAR(100) NOT NULL,
--   full_name VARCHAR(100),
--   created_at TIMESTAMP NOT NULL,
--   updated_at TIMESTAMP NOT NULL
-- );

-- -- Create indexes on commonly queried fields
-- CREATE INDEX IF NOT EXISTS idx_users_email ON users(email);
-- CREATE INDEX IF NOT EXISTS idx_users_username ON users(username);