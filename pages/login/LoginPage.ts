import { Page, Locator } from '@playwright/test';
import { ActionsHelper } from '@utils/actions';
import { AssertionsHelper } from '@utils/assertions';

export class LoginPage {
  readonly usernameInput: Locator;
  readonly passwordInput: Locator;
  readonly loginButton: Locator;
  readonly errorMessage: Locator;

  private actions: ActionsHelper;
  private assertions: AssertionsHelper;

  constructor(page: Page) {
    this.usernameInput = page.locator('[data-test="username"]');
    this.passwordInput = page.locator('[data-test="password"]');
    this.loginButton = page.locator('[data-test="login-button"]');
    this.errorMessage = page.locator('[data-test="error"]');

    this.actions = new ActionsHelper(page);
    this.assertions = new AssertionsHelper(page);
  }

  async navigate(): Promise<void> {
    await this.actions.navigateTo('/', 'Navigate to login page');
  }

  async login(username: string, password: string): Promise<void> {
    await this.actions.fill(this.usernameInput, username, 'Enter username');
    await this.actions.fill(this.passwordInput, password, 'Enter password');
    await this.actions.click(this.loginButton, 'Click login button');
  }

  async verifyErrorMessage(expectedMessage: string): Promise<void> {
    await this.assertions.shouldHaveText(this.errorMessage, expectedMessage, 'Verify error message');
  }

  async verifySuccessfulLogin(): Promise<void> {
    await this.assertions.shouldHaveUrl(/.*inventory.html/, 'Verify redirect to inventory page');
  }
}
