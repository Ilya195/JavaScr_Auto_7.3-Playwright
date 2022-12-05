const { test, expect } = require("@playwright/test");
const data = require('../user');

test("test", async ({ page }) => {

  await page.goto('https://netology.ru/?modal=sign_in', {waitUntil: 'domcontentloaded', timeout: 50000});

  await page.locator('[placeholder = "Email"]').click();

  await page.locator('[placeholder = "Email"]').fill(data.myEmail);

  await page.locator('[placeholder = "Пароль"]').click();

  await page.locator('[placeholder = "Пароль"]').fill(data.myPassword);

  await page.click('[data-testid ="login-submit-btn"]');

  await expect(page).toHaveURL("https://netology.ru/profile");

  await expect(page.locator('h2')).toHaveText("Мои курсы и профессии");
});

test("negative test", async ({ page }) => {

  await page.goto("https://netology.ru/?modal=sign_in", {waitUntil: 'domcontentloaded', timeout: 50000});

  await page.locator('[placeholder = "Email"]').click();

  await page.locator('[placeholder = "Email"]').fill(data.mail);

  await page.locator('[placeholder = "Пароль"]').click();

  await page.locator('[placeholder = "Пароль"]').fill(data.password);

  await page.click('[data-testid ="login-submit-btn"]');

  await expect(page.locator('[data-testid = "login-error-hint"]'))
  .toHaveText("Вы ввели неправильно логин или пароль");
});