#!/usr/bin/env python
import os
import sys


def create_db_if_missing():
    """Connect to MySQL without a database and create one if it doesn't exist."""
    from pathlib import Path
    from dotenv import load_dotenv
    import pymysql

    load_dotenv(Path(__file__).resolve().parent / '.env')

    db_name = os.getenv('DB_NAME', 'portfolio_db')
    try:
        conn = pymysql.connect(
            host=os.getenv('DB_HOST', 'localhost'),
            port=int(os.getenv('DB_PORT', '3306')),
            user=os.getenv('DB_USER', 'root'),
            password=os.getenv('DB_PASS', ''),
        )
        with conn.cursor() as cur:
            cur.execute(
                f"CREATE DATABASE IF NOT EXISTS `{db_name}` "
                f"CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci"
            )
        conn.close()
    except Exception as e:
        print(f"[Warning] Could not auto-create database: {e}")


def main():
    os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'portfolio_project.settings')
    try:
        from django.core.management import execute_from_command_line
    except ImportError as exc:
        raise ImportError(
            "Couldn't import Django. Are you sure it's installed and "
            "available on your PYTHONPATH environment variable? Did you "
            "forget to activate a virtual environment?"
        ) from exc

    create_db_if_missing()
    execute_from_command_line(sys.argv)


if __name__ == '__main__':
    main()
