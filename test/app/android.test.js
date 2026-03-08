describe("Android tests", () => {
  it("should add two numbers", () => {
    expect(2 + 2).toEqual(4);
  });

  // it("check element", async () => {
  // const abc = await $('android=new UiSelector().text("My Currency Exchange")');
  // expect(await abc.isDisplayed()).toBe(true, "My Currency Exchange not found.");
  // });

  // it("andriod button test", async () => {
  //   await browser.pause(1000);
  //   const abc = await $(`android=new UiSelector().textContains("ADD")`);
  //   expect(await abc.isDisplayed()).toBe(true, "Push notification not found.");
  // });

  // it("should navigate to Google and verify title", async () => {
  //   await browser.url("https://www.google.com");
  //   await browser.pause(1000);
  //   await expect(browser).toHaveTitle("Google");
  //   const searchBox = await $('textarea[name="q"]');
  //   await searchBox.setValue("WebdriverIO");
  //   await browser.keys("Enter");

  //   // Wait for results and verify
  //   // await browser.waitUntil(async () => {
  //   //   const title = await browser.getTitle();
  //   //   return title.includes('WebdriverIO');
  //   // }, { timeout: 5000, timeoutMsg: 'Search results page did not load' });

  //   // await browser.pause(1000);
  //   expect(2 + 2).toEqual(4);
  // });

  // it('should open Google and search for WebdriverIO', async () => {
  // 1. Navigate to Google
  // await browser.url('https://www.google.com');

  // expect(2+2).toEqual(5);
  // await browser.pause(1000);

  // // 2. Accept cookies if the prompt appears (common on mobile)
  // try {
  //   const agreeBtn = await $('button=Accept all');
  //   if (await agreeBtn.isDisplayed()) {
  //     await agreeBtn.click();
  //   }
  // } catch {
  //   // ignore if no cookie prompt
  // }

  // // 3. Type search term into the search box
  // // const searchBox = await $('input[name="q"]');
  // const searchBox = await $('textarea[name="q"]');

  // await searchBox.setValue('WebdriverIO');
  // await browser.pause(1000);

  // // 4. Press Enter on the keyboard
  // await browser.keys('Enter');
  // await browser.pause(1000);

  // // 5. Wait for the title to update with our search term
  // await browser.waitUntil(
  //   async () => (await browser.getTitle()).includes('WebdriverIO'),
  //   {
  //     timeout: 10000,
  //     timeoutMsg: 'Title never contained "WebdriverIO"',
  //   }
  // );

  // // 6. Optional: take a screenshot for the report
  // await browser.saveScreenshot('./webdriverio-search-results.png');

  // // 7. Simple assertion
  // expect(await browser.getTitle()).toContain('WebdriverIO');
  // });
});
