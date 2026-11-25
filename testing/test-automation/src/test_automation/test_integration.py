from test_automation.base_gray_test import BaseGrayBoxTest


class ERPLandingPage(BaseGrayBoxTest):
    def setUp(self) -> None:
        super().setUp()
        self.driver.get("http://fresh-client:5173")

    def test_landing_page(self):
        assert self.driver.title == "ERP System | Logistic Management"
