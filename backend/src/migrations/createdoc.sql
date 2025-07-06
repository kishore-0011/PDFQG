-- Create documents table
CREATE TABLE IF NOT EXISTS documents (
  id UUID PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  source_type VARCHAR(50) NOT NULL,
  file_path VARCHAR(500),
  file_size BIGINT,
  content_text TEXT,
  status VARCHAR(50) NOT NULL,
  user_id VARCHAR(100) NOT NULL,
  created_at TIMESTAMP NOT NULL,
  updated_at TIMESTAMP NOT NULL
);

CREATE TABLE IF NOT EXISTS quizzes (
  id UUID PRIMARY KEY,
  title TEXT NOT NULL,
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  questions JSONB NOT NULL,
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP
);


-- Create index for faster querying by user_id
CREATE INDEX IF NOT EXISTS idx_documents_user_id ON documents(user_id);

-- Create index for status filtering
CREATE INDEX IF NOT EXISTS idx_documents_status ON documents(status);