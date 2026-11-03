-- アプリ用のユーザーは Neon にだけ作ってある。
-- 手元（Docker）や CI の DB にはいないので、いるときだけ権限を付ける
DO $$
BEGIN
  IF EXISTS (SELECT 1 FROM pg_roles WHERE rolname = 'portfolio_app') THEN
    GRANT USAGE ON SCHEMA public TO portfolio_app;
    GRANT SELECT ON works TO portfolio_app;
    GRANT INSERT ON contact_messages TO portfolio_app;
    GRANT SELECT (id, created_at) ON contact_messages TO portfolio_app;
  END IF;
END $$;