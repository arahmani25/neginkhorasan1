const { test, expect } = require('@playwright/test');

const sizes = [
  { width: 1350, height: 643 },
  { width: 1440, height: 900 },
  { width: 1024, height: 768 },
  { width: 768, height: 1024 },
  { width: 430, height: 932 },
  { width: 390, height: 844 },
  { width: 375, height: 812 },
  { width: 360, height: 740 },
  { width: 320, height: 568 }
];

for (const size of sizes) {
  test(`hero and search remain readable at ${size.width}x${size.height}`, async ({ page }) => {
    await page.setViewportSize(size);
    await page.emulateMedia({ reducedMotion: 'reduce' });
    await page.goto('/');
    const hero = page.getByRole('region', { name: 'Discover Afghanistan' });
    const heading = hero.getByRole('heading', { level: 1 });
    const description = hero.getByText(size.width < 768 ? 'Locally led journeys. Unforgettable places.' : 'Extraordinary landscapes.', { exact: false });
    const plan = hero.getByRole('link', { name: /Plan (your journey|a trip)/ });
    const search = page.getByRole('search', { name: 'Find your journey' });
    await expect(heading).toBeVisible();
    await expect(page.locator('.whatsapp-float')).toBeHidden();
    await expect(hero.locator('img')).toHaveCount(1);
    await expect(hero.getByRole('button', { name: /slideshow/i })).toHaveCount(0);
    expect(await page.evaluate(() => document.documentElement.scrollWidth)).toBeLessThanOrEqual(size.width);
    const boxes = await Promise.all([page.getByRole('banner'), heading, description, plan, search].map(locator => locator.boundingBox()));
    const [headerBox, headingBox, descriptionBox, planBox, searchBox] = boxes;
    expect(headingBox.y).toBeGreaterThanOrEqual(headerBox.y + headerBox.height);
    expect(headingBox.y + headingBox.height).toBeLessThanOrEqual(descriptionBox.y);
    expect(descriptionBox.y + descriptionBox.height).toBeLessThanOrEqual(planBox.y);
    expect(planBox.y + planBox.height).toBeLessThan(searchBox.y);
    const heroBox = await hero.boundingBox();
    const fullPhoto = await hero.locator('figure').boundingBox();
    expect(fullPhoto.width).toBeGreaterThanOrEqual(heroBox.width - 44);
    expect(headingBox.y).toBeGreaterThanOrEqual(fullPhoto.y);
    expect(headingBox.y + headingBox.height).toBeLessThan(fullPhoto.y + fullPhoto.height);
    if (size.width < 768) {
      const photo = await hero.locator('figure').boundingBox();
      expect(photo.y).toBeLessThanOrEqual(headerBox.height + 1);
      expect(photo.height).toBeGreaterThanOrEqual(500);
      expect(searchBox.y).toBeGreaterThanOrEqual(photo.y + photo.height - 1);
      expect(planBox.y + planBox.height).toBeLessThanOrEqual(size.height);
      const whatsapp = await hero.getByRole('link', { name: 'WhatsApp', exact: true }).boundingBox();
      expect(Math.abs(whatsapp.y - planBox.y)).toBeLessThan(1);
    }
    for (const control of [search.getByRole('combobox'), search.getByRole('textbox')]) {
      expect(await control.evaluate(element => parseFloat(getComputedStyle(element).fontSize))).toBeGreaterThanOrEqual(16);
      expect((await control.boundingBox()).height).toBeGreaterThanOrEqual(50);
    }
    if (size.width >= 1101 && size.height < 760) {
      const submit = await search.getByRole('button', { name: 'Explore journeys' }).boundingBox();
      expect(submit.y + submit.height).toBeLessThanOrEqual(size.height);
    }
    if (size.width === 1440) {
      for (const image of await page.locator('.home-landing img').all()) {
        await image.scrollIntoViewIfNeeded();
        await image.evaluate(element => element.decode().catch(() => {}));
      }
      await page.evaluate(() => scrollTo(0, 0));
      await page.screenshot({ path: 'artifacts/landing-bold-full.png', fullPage: true });
    }
    await page.screenshot({ path: `artifacts/hero-${size.width}x${size.height}.png` });
    await plan.click();
    const scrolledSearch = await search.boundingBox();
    expect(scrolledSearch.y).toBeGreaterThanOrEqual(headerBox.height - 1);
  });
}

test('search labels and controls meet readable contrast', async ({ page }) => {
  await page.goto('/');
  const contrast = await page.getByRole('region', { name: 'Discover Afghanistan' }).evaluate(hero => {
    const rgb = value => value.match(/[\d.]+/g).slice(0, 3).map(Number);
    const luminance = color => rgb(color).map(value => { value /= 255; return value <= .04045 ? value / 12.92 : ((value + .055) / 1.055) ** 2.4; }).reduce((sum, value, index) => sum + value * [.2126, .7152, .0722][index], 0);
    const ratio = (text, background) => { const a = luminance(text), b = luminance(background); return (Math.max(a, b) + .05) / (Math.min(a, b) + .05); };
    const backgroundFor = element => {
      for (let parent = element; parent; parent = parent.parentElement) {
        const background = getComputedStyle(parent).backgroundColor;
        if (background !== 'rgba(0, 0, 0, 0)' && background !== 'transparent') return background;
      }
      return 'rgb(255,255,255)';
    };
    return [...hero.querySelectorAll('form label,form input,form select,form button')].filter(element => element.getClientRects().length).map(element => ({ text: element.textContent.slice(0, 45), ratio: ratio(getComputedStyle(element).color, backgroundFor(element)) }));
  });
  for (const result of contrast) expect(result.ratio, result.text).toBeGreaterThanOrEqual(4.5);
});

test('trip search accepts a destination and submits by keyboard', async ({ page }) => {
  await page.goto('/');
  const search = page.getByRole('search', { name: 'Find your journey' });
  await search.getByRole('combobox', { name: 'Destination', exact: true }).selectOption('herat');
  await search.getByRole('textbox', { name: 'Your interests' }).fill('Herat');
  await search.getByRole('textbox', { name: 'Your interests' }).press('Enter');
  await expect(page).toHaveURL(/destination=herat&q=Herat/);
  await expect(page.locator('.package-card')).toHaveCount(1);
  await expect(page.locator('.package-card')).toContainText('Herat Heritage Tour');
});

test('phone search fields are usable without zooming or sideways scrolling', async ({ browser, baseURL }) => {
  const context = await browser.newContext({ baseURL, viewport: { width: 375, height: 812 }, isMobile: true, hasTouch: true, deviceScaleFactor: 1, reducedMotion: 'reduce' });
  try {
    const page = await context.newPage();
    await page.goto('/');
    expect(await page.evaluate(() => innerWidth)).toBe(375);
    await expect(page.locator('meta[name="viewport"]')).toHaveAttribute('content', /width=device-width/);
    await page.screenshot({ path: 'artifacts/hero-phone-touch.png' });
    await page.getByRole('link', { name: 'Plan a trip' }).tap();
    const search = page.getByRole('search', { name: 'Find your journey' });
    const interest = search.getByRole('textbox', { name: 'Your interests' });
    expect(await interest.evaluate(element => parseFloat(getComputedStyle(element).fontSize))).toBeGreaterThanOrEqual(16);
    await search.getByRole('combobox', { name: 'Destination', exact: true }).selectOption('bamyan');
    await interest.tap();
    await interest.fill('lakes');
    await Promise.all([
      page.waitForURL(/destination=bamyan&q=lakes/, { waitUntil: 'domcontentloaded', timeout: 30000 }),
      search.getByRole('button', { name: 'Explore journeys' }).tap()
    ]);
    await expect(page).toHaveURL(/destination=bamyan&q=lakes/);
    await expect(page.locator('.package-card')).toHaveCount(1);
    expect(await page.evaluate(() => document.documentElement.scrollWidth)).toBeLessThanOrEqual(375);
  } finally { await context.close(); }
});

test('floating WhatsApp appears after leaving the hero and clears the search at the top', async ({ page }) => {
  await page.emulateMedia({ reducedMotion: 'reduce' });
  await page.goto('/');
  await expect(page.locator('.whatsapp-float')).toBeHidden();
  await page.locator('#discover').scrollIntoViewIfNeeded();
  await expect(page.locator('.whatsapp-float')).toBeVisible();
  await page.evaluate(() => scrollTo(0, 0));
  await expect(page.locator('.whatsapp-float')).toBeHidden();
});
