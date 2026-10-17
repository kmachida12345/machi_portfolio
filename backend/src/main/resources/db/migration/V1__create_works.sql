CREATE TABLE works (
  id          BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  title       TEXT NOT NULL,
  description TEXT NOT NULL,
  tech        TEXT[] NOT NULL DEFAULT '{}',
  url         TEXT,
  created_at  TIMESTAMPTZ NOT NULL DEFAULT now()
);