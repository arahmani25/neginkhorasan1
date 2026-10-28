const {test,expect}=require('@playwright/test');
test('public pages and local image assets load',async({page,request})=>{
 const errors=[];page.on('pageerror',e=>errors.push(e.message));
 for(const path of ['/','/packages','/services','/gallery','/about','/blog','/news','/contact','/login','/admin','/blog/seed-b1','/news/seed-n1']){
  const response=await page.goto(path);expect(response.status(),path).toBe(200);
  await expect(page.locator('h1').first()).toBeVisible();
  const sources=await page.locator('img').evaluateAll(imgs=>[...new Set(imgs.map(img=>img.src).filter(src=>src.startsWith(location.origin)))]);
  for(const source of sources) expect((await request.get(source)).ok(),source).toBe(true);
 }
 expect(errors).toEqual([]);
});
test('stable hero, destination search, and FAQ work',async({page})=>{
 await page.goto('/');
 await expect(page.getByAltText('Negin Khorasan — Afghanistan DMC & Tourism').first()).toHaveAttribute('src','/brand/logo.png');
 const hero=page.getByRole('region',{name:'Discover Afghanistan'});
 await expect(hero.locator('img')).toHaveCount(1);
 await expect(hero.getByRole('heading',{level:1})).toHaveText('Go beyond the ordinary.');
 await page.getByRole('combobox',{name:'Destination',exact:true}).selectOption('bamyan');
 await page.getByRole('button',{name:'Explore journeys'}).click();
 await expect(page).toHaveURL(/destination=bamyan/);
 await expect(page.locator('.package-card')).toHaveCount(1);
 await expect(page.locator('.package-card')).toContainText('Bamyan');
 await page.goto('/');
 await page.locator('.faq-list summary').first().click();
 await expect(page.locator('.faq-list details').first()).toHaveAttribute('open','');
});
test('package search and detail pages work',async({page})=>{
 await page.goto('/packages');
 await page.getByRole('textbox',{name:'Search journeys'}).fill('Herat');
 await expect(page.locator('.package-card')).toHaveCount(1);
 await page.locator('.package-card').click();
 await expect(page.locator('h1')).toHaveText('Herat Heritage Tour');
 await expect(page.getByRole('button',{name:'Prepare email request'})).toBeVisible();
 const missing=await page.goto('/packages/does-not-exist');expect(missing.status()).toBe(404);
});
test('unconfigured forms prepare email drafts without claiming delivery',async({page})=>{
 await page.goto('/packages/seed-p1');
 await page.getByLabel('Full name *',{exact:true}).fill('Test Traveller');
 await page.getByLabel('Email *',{exact:true}).fill('traveller@example.com');
 await page.getByRole('button',{name:'Prepare email request'}).click();
 await expect(page.getByText('Your email draft is ready.')).toBeVisible();
 await expect(page.getByRole('link',{name:'Open email draft'})).toHaveAttribute('href',/^mailto:/);
 await page.goto('/contact');
 await page.getByLabel('Your name *').fill('Test Traveller');
 await page.getByLabel('Email *').fill('traveller@example.com');
 await page.getByLabel('Your message *').fill('I would like to plan a trip.');
 await page.getByRole('button',{name:'Prepare email message'}).click();
 await expect(page.getByText('Nothing has been submitted online.',{exact:false})).toBeVisible();
 await expect(page.getByRole('link',{name:'Open email draft'})).toHaveAttribute('href',/I%20would%20like/);
});
test('gallery lightbox opens and closes with Escape',async({page})=>{
 await page.goto('/gallery');
 await page.getByRole('button',{name:'Village beneath the Hindu Kush'}).click();
 await expect(page.getByRole('dialog')).toBeVisible();
 await page.keyboard.press('Escape');
 await expect(page.getByRole('dialog')).toHaveCount(0);
});
test('mobile navigation and layout fit small screens',async({page})=>{
 await page.setViewportSize({width:390,height:844});
 for(const path of ['/','/packages','/services','/about','/gallery','/contact']){
  await page.goto(path);
  expect(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth),path).toBe(true);
 }
 await page.goto('/');
 await page.getByRole('button',{name:'Open menu'}).click();
 await expect(page.getByRole('navigation',{name:'Mobile navigation'})).toBeVisible();
 await page.getByRole('navigation',{name:'Mobile navigation'}).getByRole('link',{name:'Contact'}).click();
 await expect(page).toHaveURL(/contact/);
 await expect(page.getByRole('navigation',{name:'Mobile navigation'})).toHaveCount(0);
});

test('desktop and mobile design screenshots',async({page})=>{
 await page.setViewportSize({width:1440,height:1000});await page.goto('/');
 await page.screenshot({path:'artifacts/home-desktop.png'});
 for(let y=0;y<await page.evaluate(()=>document.body.scrollHeight);y+=700){await page.evaluate(y=>scrollTo(0,y),y);await page.waitForTimeout(60);}
 await page.evaluate(()=>scrollTo(0,0));await page.waitForTimeout(900);
 await page.screenshot({path:'artifacts/home-full.png',fullPage:true});
 await page.setViewportSize({width:390,height:844});await page.screenshot({path:'artifacts/home-mobile.png'});
});
