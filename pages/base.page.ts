import { Locator, Page, selectors } from "@playwright/test";

export abstract class BasePage {
    protected page: Page;

    constructor(page: Page) {
        this.page = page;
        selectors.setTestIdAttribute("data-qa");
    }
    
    async open(url: string) {
        await this.page.goto(url);
    }

    async getUrl() {
        return this.page.url();
    }

    async clickButton(locator: Locator) {
        await locator.click();
    }

    async getText(locator: string) {
        await this.page.textContent(locator);
    }

    async isCookieBannerVisible(): Promise<boolean> {
        return await this.page.getByRole('dialog').isVisible();
    }
}