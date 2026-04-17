import { Page, Locator } from '@playwright/test';


export class LoginPage {

    readonly page: Page;
    readonly usernameInput: Locator;
    readonly passwordInput: Locator;
    readonly loginButton: Locator;
    readonly successMessage: Locator;
    readonly errorMessage: Locator;
    readonly logoutLink: Locator;


    constructor(page: Page) {
        this.page = page;
        this.usernameInput = page.getByLabel('Username');
        this.passwordInput = page.getByLabel('Password');
        this.loginButton = page.getByRole('button', { name: 'Login' });
        this.successMessage = page.getByText('You logged into a secure area!');
        this.errorMessage = page.getByText(/invalid!/);
        this.logoutLink = page.locator('.button.secondary.radius');
    }

    async goto(url:string) {
        await this.page.goto(url);
    }

    async login(username: string, password: string) {
        await this.usernameInput.fill(username);
        await this.passwordInput.fill(password);
        await this.loginButton.click();
    }
}