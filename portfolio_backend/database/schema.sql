-- Run this once in MySQL before running Django migrations:
--   mysql -u root -p < database/schema.sql
-- Then run:  python manage.py migrate

CREATE DATABASE IF NOT EXISTS portfolio_db
  CHARACTER SET utf8mb4
  COLLATE utf8mb4_unicode_ci;
