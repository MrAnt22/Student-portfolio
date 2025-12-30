import unittest
from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.edge.options import Options
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC


BASE = "http://localhost:3000"


class StudentPortfolioTests(unittest.TestCase):

    @classmethod
    def setUpClass(cls):
        options = Options()
        options.use_chromium = True
        cls.driver = webdriver.Edge(options=options)
        cls.driver.maximize_window()

    @classmethod
    def tearDownClass(cls):
        cls.driver.quit()

    def test_01_login(self):
        d = self.driver
        d.get(f"{BASE}/login")

        username = WebDriverWait(d, 10).until(
            EC.presence_of_element_located((By.XPATH, "//input[@placeholder='Username']"))
        )
        password = d.find_element(By.XPATH, "//input[@placeholder='Password']")
        btn = d.find_element(By.XPATH, "//button[contains(text(),'Login')]")

        username.send_keys("dream")
        password.send_keys("loveminors")
        btn.click()

        WebDriverWait(d, 10).until(
            EC.presence_of_element_located((By.XPATH, "//button[contains(text(),'Переглянути профіль')]"))
        )
        self.assertIn("/", d.current_url)

    def test_02_home_to_profile(self):
        d = self.driver
        d.get(BASE)

        profile_btn = WebDriverWait(d, 10).until(
            EC.element_to_be_clickable((By.XPATH, "//button[contains(text(),'Переглянути профіль')]"))
        )
        profile_btn.click()

        WebDriverWait(d, 10).until(EC.url_contains("/profile"))
        self.assertIn("/profile", d.current_url)

    def test_03_edit_profile(self):
        d = self.driver
        d.get(f"{BASE}/profile")

        github_input = WebDriverWait(d, 10).until(
            EC.presence_of_element_located((By.XPATH, "//input[@name='github_link']"))
        )

        github_input.clear()
        github_input.send_keys("https://github.com/test")

        save_btn = d.find_element(By.XPATH, "//button[contains(text(),'Зберегти зміни')]")
        save_btn.click()

        self.assertIn("/profile", d.current_url)

    def test_04_project_stats(self):
        d = self.driver
        d.get(f"{BASE}/profile")

        proj_btn = WebDriverWait(d, 10).until(
            EC.element_to_be_clickable((By.XPATH, "//button[contains(text(),'Мої проекти')]"))
        )
        proj_btn.click()

        WebDriverWait(d, 10).until(EC.url_contains("/project"))
        repo_list = d.find_elements(By.XPATH, "//ul/li")

        self.assertGreater(len(repo_list), 0)

    def test_05_summary_page(self):
        d = self.driver
        d.get(f"{BASE}/profile")

        summary_btn = WebDriverWait(d, 10).until(
            EC.element_to_be_clickable((By.XPATH, "//button[contains(text(),'Мій підсумок')]"))
        )
        summary_btn.click()

        WebDriverWait(d, 10).until(EC.url_contains("/summary"))

        img = d.find_element(By.TAG_NAME, "img")
        self.assertTrue(img.get_attribute("src"))

        bio = d.find_element(By.XPATH, "//p")
        self.assertGreater(len(bio.text), 0)


if __name__ == "__main__":
    unittest.main()
