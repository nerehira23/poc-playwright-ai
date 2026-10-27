import { Page, Locator } from '@playwright/test';
import { ActionsHelper } from '@utils/actions';
import { AssertionsHelper } from '@utils/assertions';

export class CartPage {
  readonly cartTitle: Locator;
  readonly cartItems: Locator;
  readonly checkoutButton: Locator;
  readonly continueShoppingButton: Locator;

  private actions: ActionsHelper;
  private assertions: AssertionsHelper;

  constructor(page: Page) {
    this.cartTitle = page.locator('.title');
    this.cartItems = page.locator('.cart_item');
    this.checkoutButton = page.locator('[data-test="checkout"]');
    this.continueShoppingButton = page.locator('[data-test="continue-shopping"]');

    this.actions = new ActionsHelper(page);
    this.assertions = new AssertionsHelper(page);
  }

  async verifyPageLoaded(): Promise<void> {
    await this.assertions.shouldBeVisible(this.cartTitle, 'Verify cart title is visible');
    await this.assertions.shouldHaveText(this.cartTitle, 'Your Cart', 'Verify cart title text');
  }

  async getCartItemCount(): Promise<number> {
    return await this.cartItems.count();
  }

  async proceedToCheckout(): Promise<void> {
    await this.actions.click(this.checkoutButton, 'Proceed to checkout');
  }

  async continueShopping(): Promise<void> {
    await this.actions.click(this.continueShoppingButton, 'Continue shopping');
  }
}
