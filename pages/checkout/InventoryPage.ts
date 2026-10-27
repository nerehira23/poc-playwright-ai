import { Page, Locator } from '@playwright/test';
import { ActionsHelper } from '@utils/actions';
import { AssertionsHelper } from '@utils/assertions';

export class InventoryPage {
  readonly productsTitle: Locator;
  readonly sortDropdown: Locator;
  readonly cartBadge: Locator;
  readonly cartIcon: Locator;

  private actions: ActionsHelper;
  private assertions: AssertionsHelper;
  private page: Page;

  constructor(page: Page) {
    this.page = page;
    this.productsTitle = page.locator('.title');
    this.sortDropdown = page.locator('[data-test="product-sort-container"]');
    this.cartBadge = page.locator('.shopping_cart_badge');
    this.cartIcon = page.locator('.shopping_cart_link');

    this.actions = new ActionsHelper(page);
    this.assertions = new AssertionsHelper(page);
  }

  async verifyPageLoaded(): Promise<void> {
    await this.assertions.shouldBeVisible(this.productsTitle, 'Verify products title is visible');
    await this.assertions.shouldHaveText(this.productsTitle, 'Products', 'Verify products title text');
  }

  async addProductToCart(productIndex: number): Promise<void> {
    const addToCartButton = this.page.locator('[data-test^="add-to-cart"]').nth(productIndex);
    await this.actions.click(addToCartButton, `Add product ${productIndex + 1} to cart`);
  }

  async removeProductFromCart(productIndex: number): Promise<void> {
    const removeFromCartButton = this.page.locator('[data-test^="remove"]').nth(productIndex);
    await this.actions.click(removeFromCartButton, `Remove product ${productIndex + 1} from cart`);
  }

  async navigateToCart(): Promise<void> {
    await this.actions.click(this.cartIcon, 'Navigate to cart');
  }

  async getCartItemCount(): Promise<number> {
    const badgeText = await this.cartBadge.textContent();
    return badgeText ? parseInt(badgeText, 10) : 0;
  }

  async sortByPriceLowToHigh(): Promise<void> {
    await this.actions.selectOption(this.sortDropdown, 'lohi', 'Sort by price (low to high)');
  }

  async getProductPrices(): Promise<number[]> {
    const priceElements = this.page.locator('.inventory_item_price');
    const count = await priceElements.count();
    const prices: number[] = [];

    for (let i = 0; i < count; i++) {
      const priceText = await priceElements.nth(i).textContent();
      if (priceText) {
        const price = parseFloat(priceText.replace('$', ''));
        prices.push(price);
      }
    }

    return prices;
  }

  async verifyPricesSortedAscending(): Promise<void> {
    const prices = await this.getProductPrices();
    const sortedPrices = [...prices].sort((a, b) => a - b);
    
    for (let i = 0; i < prices.length; i++) {
      if (prices[i] !== sortedPrices[i]) {
        throw new Error(`Price at index ${i} (${prices[i]}) is not sorted correctly. Expected ${sortedPrices[i]}`);
      }
    }
  }
}
