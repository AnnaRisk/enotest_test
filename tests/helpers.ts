import { Page, expect } from '@playwright/test';

export async function login(page: Page) {
  await page.goto('https://enotes.pointschool.ru/login');
  await page.fill('#loginform-username', 'test');
  await page.fill('#loginform-password', 'test');
  await page.evaluate(() => {
    const button = document.querySelector('button[name="login-button"]');
    if (button) button.removeAttribute('disabled');
  });
  await page.click('button[name="login-button"]');
  await expect(page).toHaveURL('https://enotes.pointschool.ru/');
  await expect(page.locator('#dropdownBasket')).toBeVisible();
}

export async function clearCartIfNotEmpty(page: Page) {
  const itemCount = await page.locator('span.basket-count-items.badge.badge-primary').innerText();
  if (itemCount !== "" && itemCount !== "0") {
    await page.locator('#dropdownBasket').click();
    await expect(page.locator('#dropdownBasket')).toHaveAttribute('aria-expanded', 'true');
    await expect(page.locator('a.btn.btn-danger.btn-sm.mr-auto')).toBeVisible();
    await page.click('a.btn.btn-danger.btn-sm.mr-auto');
  }
}

export async function verifyCartItemCount(page: Page, expectedCount: string) {
  const itemCount = await page.locator('span.basket-count-items.badge.badge-primary').innerText();
  console.log(`Текущее количество товаров в корзине: ${itemCount}`);
  await expect(page.locator('span.basket-count-items.badge.badge-primary')).toHaveText(new RegExp(`^(${expectedCount})?$`));
  if (itemCount === expectedCount) {
    console.log(`Количество товаров в корзине соответствует ожиданиям: ${expectedCount}`);
  } else {
    console.log(`Количество товаров в корзине не соответствует ожиданиям: ожидается ${expectedCount}, но найдено ${itemCount}`);
  }
}

export async function checkDiscount(page: Page) {
  await page.goto('https://enotes.pointschool.ru/');
  await expect(page).toHaveURL('https://enotes.pointschool.ru/');
  const discountCheckbox = page.locator('#gridCheck');
  await discountCheckbox.check({ force: true });
  const isChecked = await discountCheckbox.isChecked();
  expect(isChecked).toBe(true);
}

export async function addDiscountedItemToCart(page: Page, quantity: number) {
  const discountedItem = page.locator('.note-item.card.h-100.hasDiscount[data-product="1"]');
  await discountedItem.waitFor({ state: 'visible', timeout: 10000 });
  const quantityInput = discountedItem.locator('input.form-control');
  await quantityInput.fill(quantity.toString());
  await expect(quantityInput).toHaveValue(quantity.toString());
  const buyButton = discountedItem.locator('button.actionBuyProduct.btn.btn-primary.mt-3');
  await buyButton.click();
  await page.waitForTimeout(10000);
}

export async function addNotDiscountedItemToCart(page: Page, quantity: number) {
  const item = page.locator('.note-item.card.h-100').first();
  await item.waitFor({ state: 'visible', timeout: 10000 });
  const quantityInput = item.locator('input.form-control');
  await quantityInput.fill(quantity.toString());
  await expect(quantityInput).toHaveValue(quantity.toString());
  const buyButton = item.locator('button.actionBuyProduct.btn.btn-primary.mt-3');
  await buyButton.click();
  await page.waitForTimeout(10000);
}