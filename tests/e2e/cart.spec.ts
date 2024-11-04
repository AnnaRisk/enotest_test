import { test } from '@playwright/test';
import { login, clearCartIfNotEmpty, checkDiscount, addDiscountedItemToCart, verifyCartItemCount,addNotDiscountedItemToCart } from '../helpers';

test.describe('Cart Functionality', () => {
  test.beforeEach(async ({ page }) => {
    await login(page);
    await clearCartIfNotEmpty(page);
    await verifyCartItemCount(page, "0");
  });
  
  test.afterEach(async ({ page }) => {    
    await clearCartIfNotEmpty(page);
    console.log('Корзина очищена после теста');
  });

  test('Add 9 discounted items to cart and verify cart details', async ({ page }) => {
    await checkDiscount(page);
    await addDiscountedItemToCart(page, 9);
    await verifyCartItemCount(page, "9");
  });

  test('Add 8 discounted items to cart and verify cart details', async ({ page }) => {
    await clearCartIfNotEmpty(page);
    await checkDiscount(page);
    await addDiscountedItemToCart(page, 1);
    await verifyCartItemCount(page, "1");
    await addDiscountedItemToCart(page, 8);
    await verifyCartItemCount(page, "9");
  });

  test('Add 1 discounted item to cart and verify cart details', async ({ page }) => {
    await checkDiscount(page);
    await addDiscountedItemToCart(page, 1);
    await verifyCartItemCount(page, "1");
  });

  test('Add 1 not discounted item to cart and verify cart details', async ({ page }) => {  
    await addNotDiscountedItemToCart(page, 1);
    await verifyCartItemCount(page, "1");
  });

  });
