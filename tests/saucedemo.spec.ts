import { test, expect } from '@fixtures/testFixtures';
import { faker } from '@faker-js/faker';
import loginData from '@data/login.json';

test.describe('SauceDemo E2E Tests', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('TC01 - Login Exitoso', async ({ loginPage }) => {
    await test.step('Navigate to login page', async () => {
      await loginPage.navigate();
    });

    await test.step('Login with standard_user', async () => {
      await loginPage.login(
        loginData.users.standard_user.username,
        loginData.users.standard_user.password
      );
    });

    await test.step('Verify successful login', async () => {
      await loginPage.verifySuccessfulLogin();
    });
  });

  test('TC02 - Login con Error', async ({ loginPage }) => {
    await test.step('Navigate to login page', async () => {
      await loginPage.navigate();
    });

    await test.step('Login with locked_out_user', async () => {
      await loginPage.login(
        loginData.users.locked_out_user.username,
        loginData.users.locked_out_user.password
      );
    });

    await test.step('Verify error message', async () => {
      await loginPage.verifyErrorMessage(loginData.errorMessages.lockedOut);
    });
  });

  test('TC03 - Flujo Principal de Compra (E2E)', async ({ loginPage, inventoryPage, cartPage, checkoutPage }) => {
    await test.step('Login with standard_user', async () => {
      await loginPage.login(
        loginData.users.standard_user.username,
        loginData.users.standard_user.password
      );
    });

    await test.step('Verify inventory page loaded', async () => {
      await inventoryPage.verifyPageLoaded();
    });

    await test.step('Add 2 products to cart', async () => {
      await inventoryPage.addProductToCart(0);
      await inventoryPage.addProductToCart(1);
    });

    await test.step('Navigate to cart', async () => {
      await inventoryPage.navigateToCart();
    });

    await test.step('Verify cart page loaded', async () => {
      await cartPage.verifyPageLoaded();
    });

    await test.step('Verify cart has 2 items', async () => {
      const itemCount = await cartPage.getCartItemCount();
      expect(itemCount).toBe(2);
    });

    await test.step('Proceed to checkout', async () => {
      await cartPage.proceedToCheckout();
    });

    await test.step('Verify checkout step one loaded', async () => {
      await checkoutPage.verifyCheckoutStepOneLoaded();
    });

    await test.step('Fill checkout information with random data', async () => {
      const firstName = faker.person.firstName();
      const lastName = faker.person.lastName();
      const postalCode = faker.location.zipCode();
      
      await checkoutPage.fillCheckoutInformation(firstName, lastName, postalCode);
    });

    await test.step('Continue to checkout step two', async () => {
      await checkoutPage.continueToCheckoutStepTwo();
    });

    await test.step('Verify checkout step two loaded', async () => {
      await checkoutPage.verifyCheckoutStepTwoLoaded();
    });

    await test.step('Finish order', async () => {
      await checkoutPage.finishOrder();
    });

    await test.step('Verify order complete', async () => {
      await checkoutPage.verifyOrderComplete();
    });
  });

  test('TC04 - Ordenamiento por Precio', async ({ loginPage, inventoryPage }) => {
    await test.step('Login with standard_user', async () => {
      await loginPage.login(
        loginData.users.standard_user.username,
        loginData.users.standard_user.password
      );
    });

    await test.step('Verify inventory page loaded', async () => {
      await inventoryPage.verifyPageLoaded();
    });

    await test.step('Sort by price (low to high)', async () => {
      await inventoryPage.sortByPriceLowToHigh();
    });

    await test.step('Verify prices are sorted ascending', async () => {
      await inventoryPage.verifyPricesSortedAscending();
    });
  });
});
