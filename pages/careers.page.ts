import { Page } from '@playwright/test';
import { BasePage } from './base.page';
import { lstat } from 'fs';
export class CareersPage extends BasePage {

    constructor(public readonly page: Page) {
        super(page);
    }

    locators = {
        filterList: (filterName: string) => { return this.page.getByRole('button', { name: filterName }) },
        activeFilterButton: () => this.page.locator('.c-tag.is-active'),
        cardFeed: () => this.page.locator('#resources-feed .c-careercard'),
        positionsTitle: () => this.page.locator('#resources-feed h3').all(),
        titleOfPosition: (position: string) => { return this.page.getByRole('heading', { name: position }) },
        teamName: () => this.page.locator('span'),
        searchInput: () => this.page.locator('input#search-careers'),
        loadMoreButton: () => this.page.locator('.c-btn.load-more')
    };

    async enterSearchText(searchText: string) {
        await this.locators.searchInput().waitFor({ state: "visible" });
        await this.locators.searchInput().fill(searchText);
    }

    async clickOnFilterButton(filterName: string) {
        try {
            await this.locators.filterList(filterName).waitFor({ state: 'attached' });
            await this.locators.filterList(filterName).click();
        }
        catch (error) {
            console.log("Filter button not found", error);
        }
    }

    async isFilterButtonActive(filterName: string): Promise<boolean> {
        return await this.locators.activeFilterButton()
            .filter({ hasText: filterName })
            .isVisible();
    }

    async isCardsOfPositionVisible(): Promise<boolean> {
        return await (this.locators.cardFeed()).isVisible();
    }

    async assertTeamName(position: string, teamName: string): Promise<void> {
        const isVisible = await this.locators.teamName()
            .filter({ hasText: teamName })
            .filter({ has: this.locators.titleOfPosition(position) })
            .isVisible();

        if (!isVisible) {
            throw new Error(`The position "${position}" with team name "${teamName}" is not visible.`);
        }
    }

    async getPositionsTitles() {
        const positions = await this.locators.positionsTitle();
        const texts: string[] = [];
        await this.clickShowMoreUntilEnd()
        for (const locator of positions) {
            const text = await locator.textContent();
            if (text) {
                texts.push(text); 
            }
        }
    
        return texts;
    }

    async clickShowMoreUntilEnd() {
        while (true) {
            // Check if the "Show More" button exists and is visible
            const positionsTitles = await this.locators.positionsTitle();
            const showMoreButton = this.locators.loadMoreButton();
            const isVisible = await showMoreButton.isVisible();
    
            if (!isVisible) {
                console.log("No more 'Show More' button found, stopping.");
                break;
            }
    
            // Scroll into view and click the button
            await showMoreButton.scrollIntoViewIfNeeded();
            await showMoreButton.click();
    
            // Wait for new elements to appear
            await this.page.waitForTimeout(1000); // Can be replaced with a more dynamic wait
            (positionsTitles[positionsTitles.length-1].waitFor({ state: 'attached' }));
    
            console.log("Clicked 'Show More' and loaded more items.");
        }
    }
}
