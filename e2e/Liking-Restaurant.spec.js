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

// Scenario('Add a new review', ({ I }) => {
//   let lengthAfter;
//   let lengthBefore;
//   let nameInput;
//   let reviewInput;
//   let button;
//   I.amOnPage('/');

//   I.waitForElement('resto-item', 3);
//   I.seeElement('resto-item');

//   I.click('resto-item');

//   I.waitForElement('resto-detail', 3);
//   I.seeElement('resto-detail');
//   I.usePuppeteerTo('write new review', async ({ page }) => {
//     lengthBefore = await page.$$('resto-detail >>> input#name');
//     nameInput = await page.waitForSelector('resto-detail >>> input#name');
//     reviewInput = await page.waitForSelector('resto-detail >>> input#review');
//     button = await page.waitForSelector('resto-detail >>> #add-button');
//     nameInput.value = 'Daniel';
//     await page.$eval(nameInput, (el) => el.value = 'Daniel');
//     reviewInput.value = 'Makan di sini sangat memuaskan';
//     await page.$eval(reviewInput, (el) => el.value = 'Makan di sini sangat memuaskan');
//     button.click();
//   });

//   I.wait(6);
//   console.log(nameInput);
//   console.log(reviewInput);
//   console.log(button);
//   pause();

//   I.usePuppeteerTo('write new review', async ({ page }) => {
//     lengthAfter = await page.$$('resto-detail >>> input#name');
//   });

//   I.wait(3);
//   assert.notStrictEqual(lengthAfter, lengthBefore);
// });
