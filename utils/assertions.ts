import { Page, Locator, expect } from '@playwright/test';

export class AssertionsHelper {
  constructor(private page: Page) {}

  async shouldBeVisible(locator: Locator, stepName: string): Promise<void> {
    await expect(locator).toBeVisible();
    await this.attachScreenshot(stepName);
  }

  async shouldHaveText(locator: Locator, expectedText: string, stepName: string): Promise<void> {
    await expect(locator).toHaveText(expectedText);
    await this.attachScreenshot(stepName);
  }

  async shouldContainText(locator: Locator, expectedText: string, stepName: string): Promise<void> {
    await expect(locator).toContainText(expectedText);
    await this.attachScreenshot(stepName);
  }

  async shouldHaveValue(locator: Locator, expectedValue: string, stepName: string): Promise<void> {
    await expect(locator).toHaveValue(expectedValue);
    await this.attachScreenshot(stepName);
  }

  async shouldBeHidden(locator: Locator, stepName: string): Promise<void> {
    await expect(locator).toBeHidden();
    await this.attachScreenshot(stepName);
  }

  async shouldHaveUrl(expectedUrl: string, stepName: string): Promise<void> {
    await expect(this.page).toHaveURL(expectedUrl);
    await this.attachScreenshot(stepName);
  }

  async attachScreenshot(stepName: string): Promise<void> {
    const screenshot = await this.page.screenshot({ fullPage: false });
    const testInfo = this.page.context().testInfo;
    if (testInfo) {
      await testInfo.attach(stepName, { body: screenshot, contentType: 'image/png' });
    }
  }
}
