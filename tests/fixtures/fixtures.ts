import { test as base } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import invalidCredentials from '../data/invalid-credentials.json'

type UserData = {
    validUser: { username: string, password: string };
    invalidUser: Array<{ username: string, password: string, error: string }>;
}

export const test = base.extend<{ userData: UserData, loginPage:LoginPage }>({

    userData: async ({ }, use) => {
        const data: UserData = {
            validUser: {
                username: process.env.VALID_USERNAME!,
                password: process.env.VALID_USERNAME!,
            },
            invalidUser: invalidCredentials,
        };
        await use(data);
    },

    loginPage: async({page}, use) => {
        const loginPage = new LoginPage(page);
        await use(loginPage);
    }
});

export { expect } from '@playwright/test';