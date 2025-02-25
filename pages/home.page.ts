import { expect, Locator, Page } from '@playwright/test';
import { BasePage } from './base.page';
export class HomePage extends BasePage {

    constructor(public readonly page: Page) {
        super(page);
    }

    
    locators = {
        title: (text:string) => {return this.page.getByRole('heading', { name: text})},
    };

    async assertTitle(text:string) {
        expect(this.locators.title(text)).toBeVisible()
    }

}