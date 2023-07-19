/* eslint-disable no-undef */
const assert = require('assert');

Feature('Liking-Restaurant');

Scenario('Like Restaurant', async ({ I }) => {
  I.amOnPage('/');
  I.waitForElement('resto-item', 3);
  I.seeElement('resto-item');

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

Scenario('Unlike Restaurant', ({ I }) => {
  I.amOnPage('/#/favorite');

  I.waitForElement('resto-item', 3);
  I.seeElement('resto-item');

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

Scenario('Add a new review', ({ I }) => {
  I.amOnPage('/');

  I.waitForElement('resto-item', 3);
  I.seeElement('resto-item');

  I.click('resto-item');

  I.waitForElement('resto-detail', 3);
  I.seeElement('resto-detail');
  I.usePuppeteerTo('write new review', async ({ page }) => {
    const submitButton = await page.waitForSelector('resto-detail >>> #add-button');
    await page.evaluate(() => {
      const name = document.querySelector('resto-detail').shadowRoot.querySelector('review-form').shadowRoot.querySelector('#name');
      name.value = 'Daniele';
    });
    await page.evaluate(() => {
      const name = document.querySelector('resto-detail').shadowRoot.querySelector('review-form').shadowRoot.querySelector('#review');
      name.value = 'Makan di sini sangat memuaskan';
    });
    submitButton.click();

    page.on('dialog', async (dialog) => {
      if ((await dialog.message()) !== 'Success sending review') {
        throw new Error('review failed');
      }
      console.log(await dialog.message());
      await dialog.accept();
    });
  });

  I.wait(10);
});
