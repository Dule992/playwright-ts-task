import { Page } from '@playwright/test';
import { BasePage } from './base.page';
export class CareersPage extends BasePage {

    constructor(public readonly page: Page) {
        super(page);
    }

    navigtionMap : { [key: string]: string } = {
        signup_login: 'Signup / Login',
        cart: 'Cart',
        loggedInAsUser: 'Logged in as',
        deleteAccount: 'Delete Account',
        logout: 'Logout',
    };

    locators = {
        linkNavigation: (link: string) => {return this.page.getByRole('link', { name: `${link}` })},
        loggedInUser: (user: string) => {return this.page.getByText(`Logged in as ${user}`)}
    };

    async navigateToLink(link: string) {
        await this.locators.linkNavigation(this.navigtionMap[link]).click();
    }

    async linkNavigationIsVisible(link: string){
        return await this.locators.linkNavigation(this.navigtionMap[link]).isVisible();
    }

    async loggedInUserIsVisible(user: string){
        return await this.locators.loggedInUser(user).isVisible();
    }
}