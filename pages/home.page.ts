import { Page } from '@playwright/test';
import { BasePage } from './base.page';
export class HomePage extends BasePage {

    constructor(public readonly page: Page) {
        super(page);
    }

    locators = {
        title: (text:string) => {return this.page.getByRole('heading', { name: text })},
        cookiesAllowAllButton: () => this.page.getByRole('button', {name: "Allow all"}),
    };

    async assertTitle(text:string): Promise<boolean> {
        return await this.locators.title(text).isVisible();
    }
}