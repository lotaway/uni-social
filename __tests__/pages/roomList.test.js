describe('test', () => {
    let page;

    console.log(page);

    beforeAll(async () => {
        page = await program.currentPage();
        // page = await program.navigateTo("/pages/find/find");
        console.log(page.path);
        await page.waitFor(3000);
    });

    it('roomList.Page', async () => {
        const el = await page.$('.main-title');
        const titleText = await el.text();
        expect(titleText).toBeLessThanOrEqual("Hello");
        // expect(el).toBeInTheDocument();
        // expect(await el.attribute("class")).toContain("container");
    });
});