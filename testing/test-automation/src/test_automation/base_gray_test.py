import os
from typing import Any, Dict, List, Optional, Tuple
import unittest

from dotenv import load_dotenv
import mysql.connector
from mysql.connector import Error as MySQLError
from mysql.connector.types import MySQLConvertibleType
from selenium import webdriver
from selenium.webdriver.chrome.options import Options as ChromeOptions
from selenium.webdriver.common.options import BaseOptions
from selenium.webdriver.edge.options import Options as EdgeOptions
from selenium.webdriver.firefox.options import Options as FirefoxOptions
from selenium.webdriver.remote.webdriver import WebDriver

from test_automation.db_conn import MySQLConnType


class BaseGrayBoxTest(unittest.TestCase):
    driver: WebDriver
    _db_conns: Dict[str, MySQLConnType] = {}

    @classmethod
    def setUpClass(cls) -> None:
        super().setUpClass()
        load_dotenv()
        cls._db_conns = {}
        cls.driver = cls._init_webdriver()

    @classmethod
    def get_db_conn(cls, service: str) -> MySQLConnType:
        """Lazily initialize and return a MySQL connection for the given service prefix."""
        key = service.strip().upper()
        conn = cls._db_conns.get(key)
        if conn is not None and conn.is_connected():
            return conn

        host = os.getenv(f"{key}_DB_HOST") or os.getenv("MYSQL_HOST", "localhost")
        port_raw = os.getenv(f"{key}_DB_PORT") or os.getenv("MYSQL_PORT", "3306")
        database = os.getenv(f"{key}_DB_NAME") or os.getenv(f"MYSQL_{key}_DATABASE")
        user = os.getenv(f"{key}_DB_USER") or os.getenv("MYSQL_USER")
        password = os.getenv(f"{key}_DB_PASSWORD")
        if password is None:
            password = os.getenv("MYSQL_PASSWORD", "")

        if not database:
            raise ValueError(
                f"No database name configured for service '{key}'. "
                f"Set {key}_DB_NAME in .env."
            )

        try:
            raw_conn: MySQLConnType = mysql.connector.connect(
                host=host,
                port=int(port_raw),
                database=database,
                user=user,
                password=password,
                autocommit=False,
            )
            if not raw_conn.is_connected():
                raise MySQLError(f"Failed to connect to MySQL for service '{key}'.")
            cls._db_conns[key] = raw_conn
            return raw_conn
        except MySQLError as exc:
            raise RuntimeError(
                f"MySQL connection failed for service '{key}': {exc}"
            ) from exc

    @classmethod
    def _build_browser_options(cls, browser: str, headless: bool) -> BaseOptions:
        """Build browser options for either local or remote WebDriver execution."""
        if browser == "firefox":
            ff_options = FirefoxOptions()
            if headless:
                ff_options.add_argument("-headless")
            return ff_options

        if browser == "edge":
            edge_options = EdgeOptions()
            if headless:
                edge_options.add_argument("--headless=new")
            edge_options.add_argument("--no-sandbox")
            edge_options.add_argument("--disable-dev-shm-usage")
            return edge_options

        chrome_options = ChromeOptions()
        if headless:
            chrome_options.add_argument("--headless=new")
        chrome_options.add_argument("--no-sandbox")
        chrome_options.add_argument("--disable-dev-shm-usage")
        return chrome_options

    @classmethod
    def _init_webdriver(cls) -> WebDriver:
        remote_url = (os.getenv("SELENIUM_REMOTE_URL") or "").strip()
        browser = os.getenv("BROWSER", "chrome").strip().lower()
        headless = os.getenv("HEADLESS", "true").strip().lower() in ("1", "true", "yes")
        implicit_wait = int(os.getenv("IMPLICIT_WAIT", "10"))

        options = cls._build_browser_options(browser=browser, headless=headless)
        driver = webdriver.Remote(command_executor=remote_url, options=options)
        driver.implicitly_wait(implicit_wait)
        driver.maximize_window()

        return driver

    @classmethod
    def close_all_db_conns(cls) -> None:
        """Close all lazily opened service database connections."""
        for key, conn in list(cls._db_conns.items()):
            try:
                if conn is not None and conn.is_connected():
                    conn.close()
            except MySQLError as exc:
                print(f"Warning: Error closing MySQL connection for '{key}': {exc}")
            finally:
                cls._db_conns.pop(key, None)

    @classmethod
    def tearDownClass(cls) -> None:
        if cls.driver is not None:
            try:
                cls.driver.quit()
            except Exception as exc:
                print(f"Warning: Error closing WebDriver: {exc}")

        cls.close_all_db_conns()
        super().tearDownClass()

    def fetch_one(
        self,
        service: str,
        query: str,
        params: Optional[Tuple[MySQLConvertibleType, ...]] = None,
    ) -> Optional[Tuple[object, ...]]:
        """Execute a SELECT query against a service's database and return one row."""
        conn = self.get_db_conn(service)
        cursor = conn.cursor()
        try:
            cursor.execute(query, params or ())
            row = cursor.fetchone()
            return tuple(row) if row is not None else None
        finally:
            cursor.close()

    def fetch_all(
        self,
        service: str,
        query: str,
        params: Optional[Tuple[MySQLConvertibleType, ...]] = None,
    ) -> List[Tuple[object, ...]]:
        """Execute a SELECT query against a service's database and return all matching rows."""
        conn = self.get_db_conn(service)
        cursor = conn.cursor()
        try:
            cursor.execute(query, params or ())
            rows = cursor.fetchall()
            return [tuple(r) for r in rows]
        finally:
            cursor.close()

    def execute_query(
        self,
        service: str,
        query: str,
        params: Optional[Tuple[MySQLConvertibleType, ...]] = None,
        commit: bool = True,
    ) -> int:
        """Execute an INSERT, UPDATE, or DELETE against a service's database."""
        conn = self.get_db_conn(service)
        cursor = conn.cursor()
        try:
            cursor.execute(query, params or ())
            if commit:
                conn.commit()
            return cursor.rowcount
        except Exception:
            conn.rollback()
            raise
        finally:
            cursor.close()
