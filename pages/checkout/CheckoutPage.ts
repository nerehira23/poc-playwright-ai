import { Page, Locator } from '@playwright/test';
import { ActionsHelper } from '@utils/actions';
import { AssertionsHelper } from '@utils/assertions';

export class CheckoutPage {
  readonly checkoutTitle: Locator;
  readonly firstNameInput: Locator;
  readonly lastNameInput: Locator;
  readonly postalCodeInput: Locator;
  readonly continueButton: Locator;
  readonly cancelButton: Locator;
  readonly finishButton: Locator;
  readonly completeHeader: Locator;
  readonly completeMessage: Locator;
  readonly backHomeButton: Locator;

  private actions: ActionsHelper;
  private assertions: AssertionsHelper;

  constructor(page: Page) {
    this.checkoutTitle = page.locator('.title');
    this.firstNameInput = page.locator('[data-test="firstName"]');
    this.lastNameInput = page.locator('[data-test="lastName"]');
    this.postalCodeInput = page.locator('[data-test="postalCode"]');
    this.continueButton = page.locator('[data-test="continue"]');
    this.cancelButton = page.locator('[data-test="cancel"]');
    this.finishButton = page.locator('[data-test="finish"]');
    this.completeHeader = page.locator('.complete-header');
    this.completeMessage = page.locator('.complete-text');
    this.backHomeButton = page.locator('[data-test="back-to-products"]');

    this.actions = new ActionsHelper(page);
    this.assertions = new AssertionsHelper(page);
  }

  async verifyCheckoutStepOneLoaded(): Promise<void> {
    await this.assertions.shouldBeVisible(this.checkoutTitle, 'Verify checkout title is visible');
    await this.assertions.shouldHaveText(this.checkoutTitle, 'Checkout: Your Information', 'Verify checkout step one title');
  }

  async fillCheckoutInformation(firstName: string, lastName: string, postalCode: string): Promise<void> {
    await this.actions.fill(this.firstNameInput, firstName, 'Enter first name');
    await this.actions.fill(this.lastNameInput, lastName, 'Enter last name');
    await this.actions.fill(this.postalCodeInput, postalCode, 'Enter postal code');
  }

  async continueToCheckoutStepTwo(): Promise<void> {
    await this.actions.click(this.continueButton, 'Continue to checkout step two');
  }

  async verifyCheckoutStepTwoLoaded(): Promise<void> {
    await this.assertions.shouldBeVisible(this.checkoutTitle, 'Verify checkout title is visible');
    await this.assertions.shouldHaveText(this.checkoutTitle, 'Checkout: Overview', 'Verify checkout step two title');
  }

  async finishOrder(): Promise<void> {
    await this.actions.click(this.finishButton, 'Finish order');
  }

  async verifyOrderComplete(): Promise<void> {
    await this.assertions.shouldBeVisible(this.completeHeader, 'Verify order complete header is visible');
    await this.assertions.shouldContainText(this.completeHeader, 'Thank you for your order!', 'Verify order complete message');
  }

  async backToProducts(): Promise<void> {
    await this.actions.click(this.backHomeButton, 'Navigate back to products');
  }
}
