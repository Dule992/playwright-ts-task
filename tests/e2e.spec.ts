import { test, selectors } from '@playwright/test';
import { describe } from 'node:test';
import { HomePage } from '../pages/home.page';
import { CareersPage } from '../pages/careers.page';


let homePage: HomePage;
let careersPage: CareersPage;

describe('E2E flow', () => {

  test.beforeEach(async ({ browser }) => {
    selectors.setTestIdAttribute("data-qa");
    const page = await browser.newPage();
    homePage = new HomePage(page);
    careersPage = new CareersPage(page);
  });
});

test('Verify if Home page has title Tech Solutions to scale', async ({ page }) => {
  await homePage.open('/');
  await homePage.assertTitle("Tech Solutions to scale");
});

test('Verify if the position of Senior QA Specialist is EtonDigital', async ({ page }) => {
  await careersPage.open('/careers');
});
