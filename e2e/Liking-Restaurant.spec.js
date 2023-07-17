const assert = require('assert');

Feature('Liking-Restaurant');

Scenario('add a restaurant to favorite list', async ({ I }) => {
  I.amOnPage('/');
  I.waitForElement('resto-item', 3);
  I.seeElement('resto-item');

  I.click(locate('resto-item').first());
  I.click(locate('resto-item').first());

  I.waitForElement('resto-detail');
  I.seeElement('resto-detail');
  const firstId = await I.grabAttributeFrom('resto-detail', 'id');
  I.usePuppeteerTo('click like button', async ({ page }) => {
    const element = await page.waitForSelector('resto-detail >>> fav-button');
    element.click();
  });

  I.wait(3);

  I.amOnPage('/#/favorite');

  I.waitForElement('resto-item', 3);
  I.seeElement('resto-item');

  const secondeId = await I.grabAttributeFrom('resto-item', 'id');

  assert.strictEqual(firstId, secondeId);
});

Scenario('remove a restaurant from favorite list', ({ I }) => {
  I.amOnPage('/#/favorite');

  I.waitForElement('resto-item', 3);
  I.seeElement('resto-item');

  I.click('resto-item');
  I.click('resto-item');

  I.waitForElement('resto-detail', 3);
  I.seeElement('resto-detail');
  I.usePuppeteerTo('click unlike button', async ({ page }) => {
    const element = await page.waitForSelector('resto-detail >>> fav-button');
    element.click();
  });

  I.wait(3);

  I.amOnPage('/#/favorite');

  I.dontSeeElement('resto-item');
});
