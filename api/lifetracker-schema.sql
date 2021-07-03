CREATE TABLE users (
  id          SERIAL PRIMARY KEY,
  email       TEXT NOT NULL UNIQUE CHECK (POSITION('@' IN email) > 1),
  password    TEXT NOT NULL,
  username    TEXT NOT NULL UNIQUE,
  first_name  TEXT NOT NULL,
  last_name   TEXT NOT NULL,
  created_at  TIMESTAMP NOT NULL DEFAULT NOW()
);

CREATE TABLE exercises (
  id          SERIAL PRIMARY KEY,
  name        TEXT NOT NULL,
  image_url   TEXT NOT NULL,
  category    TEXT,
  duration    INTEGER,
  intensity   INTEGER,
  user_id     INTEGER REFERENCES users(id) ON DELETE CASCADE,
  created_at  TIMESTAMP NOT NULL DEFAULT NOW()
);

CREATE TABLE nutrition (
  id          SERIAL PRIMARY KEY,
  name        TEXT NOT NULL,
  image_url   TEXT NOT NULL,
  category    TEXT,
  quantity    INTEGER,
  calories    INTEGER,
  user_id     INTEGER REFERENCES users(id) ON DELETE CASCADE,
  created_at  TIMESTAMP NOT NULL DEFAULT NOW()
);

