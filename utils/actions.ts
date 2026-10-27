import { Page, Locator } from '@playwright/test';

export class ActionsHelper {
  constructor(private page: Page) {}

  async click(locator: Locator, stepName: string): Promise<void> {
    await locator.click();
    await this.attachScreenshot(stepName);
  }

  async fill(locator: Locator, value: string, stepName: string): Promise<void> {
    await locator.fill(value);
    await this.attachScreenshot(stepName);
  }

  async selectOption(locator: Locator, value: string, stepName: string): Promise<void> {
    await locator.selectOption(value);
    await this.attachScreenshot(stepName);
  }

  async navigateTo(url: string, stepName: string): Promise<void> {
    await this.page.goto(url);
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
