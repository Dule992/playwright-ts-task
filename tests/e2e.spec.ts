import { test, expect } from '@playwright/test';
import { HomePage } from '../pages/home.page';
import { CareersPage } from '../pages/careers.page';
import { SupportedBrowsers } from '../support';
import fs from 'fs';


let homePage: HomePage;
let careersPage: CareersPage;

test.describe('E2E flow', () => {

  test.beforeEach(async ({ browser }) => {
    console.log(`Running ${test.info().title}`);
    const userAgent = SupportedBrowsers.UserAgentString;
    const context = await browser.newContext({ userAgent });
    const page = await context.newPage();
    homePage = new HomePage(page);
    careersPage = new CareersPage(page);
    await homePage.open('/');
    if (await careersPage.isCookieBannerVisible()) {
      await careersPage.clickButton(homePage.locators.cookiesAllowAllButton());
    }
  });

  test('Verify if the Home page has title Tech Solutions to scale', async () => {
    expect(await homePage.assertTitle("Tech Solutions to scale")).toBeTruthy();
  });

  test('Verify if the position of Senior QA Specialist is EtonDigital', async () => {
    await careersPage.open('/careers');
    await careersPage.clickOnFilterButton('QA');

    while (!await careersPage.isFilterButtonActive('QA')) {
      await careersPage.clickOnFilterButton('QA');
      if (await careersPage.isCardsOfPositionVisible()) {
        await careersPage.assertTeamName('Senior QA Specialist', 'EtonDigital');
      }
    }
  });

  test('Verify saving all positions for Serbia in the text file', async () => {
    await careersPage.open('/careers');
    await careersPage.clickOnFilterButton('Serbia');
    while(!await careersPage.isFilterButtonActive('Serbia')) {
      await careersPage.clickOnFilterButton('Serbia');
    }
    expect(await careersPage.isFilterButtonActive('Serbia')).toBeTruthy();
    expect(await careersPage.isCardsOfPositionVisible()).toBeTruthy();
      const positions = await careersPage.getPositionsTitles();
      fs.writeFile('positions.txt', positions.join('\n'), (err: any) => {
        if (err) {
          console.error(err);
          return;
        }
        console.log("File has been created");
      });
  });
});