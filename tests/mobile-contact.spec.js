const { test, expect } = require('@playwright/test');

test('WhatsApp contacts use the supplied number and journey context', async ({ page }) => {
  await page.goto('/');
  await expect(page.locator('.whatsapp-float')).toHaveAttribute('href', /^https:\/\/wa.me\/93781608702\?text=/);
  await expect(page.locator('.nav-cta')).toHaveAttribute('href', /^https:\/\/wa.me\/93781608702\?text=/);
  await page.goto('/packages/seed-p1');
  const link = new URL(await page.locator('.booking-whatsapp').getAttribute('href'));
  expect(link.pathname).toBe('/93781608702');
  expect(link.searchParams.get('text')).toContain('Kabul Adventure');
  await page.goto('/contact');
  await expect(page.locator('.contact-whatsapp')).toContainText('+93 781 608 702');
  await page.goto('/admin');
  await expect(page.locator('.whatsapp-float')).toHaveCount(0);
});

test('both real films play locally and the dialog restores focus', async ({ page }) => {
  await page.goto('/gallery');
  await expect(page.locator('.film-card')).toHaveCount(2);
  for (let index = 0; index < 2; index++) {
    const card = page.locator('.film-card').nth(index);
    await card.click();
    await expect(page.getByRole('dialog')).toBeVisible();
    const video = page.locator('.gallery-dialog video');
    await expect(video).toHaveAttribute('playsinline', '');
    await expect.poll(() => video.evaluate(element => element.readyState)).toBeGreaterThanOrEqual(1);
    await video.evaluate(element => { element.muted = true; return element.play(); });
    await expect.poll(() => video.evaluate(element => element.currentTime)).toBeGreaterThan(0.1);
    await page.keyboard.press('Escape');
    await expect(page.getByRole('dialog')).toHaveCount(0);
    await expect(card).toBeFocused();
  }
  expect(await page.locator('a[href*="dQw4w9WgXcQ"]').count()).toBe(0);
});

test('phone layouts have readable text, usable inputs, and no horizontal scrolling', async ({ page }) => {
  test.setTimeout(120000);
  for (const width of [320, 390, 768]) {
    await page.setViewportSize({ width, height: 844 });
    for (const route of ['/', '/gallery', '/contact', '/packages/seed-p1']) {
      await page.goto(route);
      expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth), `${width}px ${route}`).toBe(true);
    }
  }
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto('/');
  expect(await page.locator('.hero-description').evaluate(element => parseFloat(getComputedStyle(element).fontSize))).toBeGreaterThanOrEqual(17);
  const controls = await page.locator('.hero-controls').boundingBox();
  const chat = await page.locator('.whatsapp-float').boundingBox();
  expect(controls.y + controls.height).toBeLessThan(chat.y);
  await page.screenshot({ path: 'artifacts/home-mobile-new.png' });
  await page.goto('/contact');
  expect(await page.locator('input[type="email"]').first().evaluate(element => parseFloat(getComputedStyle(element).fontSize))).toBeGreaterThanOrEqual(16);
  await page.screenshot({ path: 'artifacts/contact-mobile-new.png', fullPage: true });
  await page.goto('/gallery#videos');
  await page.screenshot({ path: 'artifacts/films-mobile-new.png', fullPage: false });
});
