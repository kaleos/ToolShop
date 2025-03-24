const { expect } = require ('@playwright/test')

class HomePage {
  constructor(page) {
    this.page = page

    this.locators = {
      //#region sidebar header locators
      headerSort: '//h4[contains(text(),"Sort")]',
      headerPriceRange: '//h4[contains(text(),"Price Range")]',
      headerSearch: '//h4[contains(text(),"Search")]',
      headerFilters: '//h4[contains(text(),"Filters")]',
      headerByCategory: '//h4[contains(text(),"By category:")]',
      headerByBrand: '//h4[contains(text(),"By brand:")]',
      //#endregion

      //#region Sidebar filter options locators
      filterHandTools: '//label[contains(text(),"Hand Tools")]',
      filterHammer: '//label[contains(text(),"Hammer")]',
      filterHandSaw: '//label[contains(text(),"Hand Saw")]',
      filterWrench: '//label[contains(text(),"Wrench")]',
      filterScrewdriver: '//label[contains(text(),"Screwdriver")]',
      filterPliers: '//label[contains(text(),"Pliers")]',
      filterChisels: '//label[contains(text(),"Chisels")]',
      filterMeasures: '//label[contains(text(),"Measures")]',
      filterPowerTools: '//label[contains(text(),"Power Tools")]',
      filterGrinder: '//label[contains(text(),"Grinder")]',
      filterSander: '//label[contains(text(),"Sander")]',
      filterSaw: '//label[normalize-space()="Hand Saw"]',
      filterDrill: '//label[contains(text(),"Drill")]',
      filterOther: '//label[contains(text(),"Other")]',
      filterToolBelts: '//label[contains(text(),"Tool Belts")]',
      filterStorageSolutions: '//label[contains(text(),"Storage Solutions")]',
      filterWorkbench: '//label[contains(text(),"Workbench")]',
      filterSafetyGear: '//label[contains(text(),"Safety Gear")]',
      filterFasteners: '//label[contains(text(),"Fasteners")]',
      filterForgeFlexTools: '//label[contains(text(),"ForgeFlex Tools")]',
      filterMightyCraftHardware: '//label[contains(text(),"MightyCraft Hardware")]',
      //#endregion

      //#region other locators
      sortFilter: '//select[@aria-label="sort"]',
      leftHandle: '//span[@aria-label="ngx-slider"]',
      rightHandle: '//span[@aria-label="ngx-slider-max"]',
      searchField: '//input[@id="search-query"]',
      searchCaption: '//h3[@data-test="search-caption"]',
      searchButton: '//button[contains(text(),"Search")]',
      xButton: '//button[contains(text(),"X")]',
      grinderCheckbox: '//label[contains(text(),"Grinder")]',
      nextPage: '//a[@aria-label="Next"]',
      previousPage: '//a[@aria-label="Previous"]',
      pagination: '//ul[@class="pagination"]',
      banner: '//img[@alt="Banner"]',
      toolShopLogo: '//a[contains(@title, "Practice Software Testing - Toolshop")]',
      mainMenu: '//ul[@aria-label="Main menu"]',
      categories: '//*[text()=" Categories "]',
      languageBtn: '//button[@id="language"]',
      //#endregion

      //#region Message locators
      messageNoProductsFound: '//*[text()="There are no products found."]',
      messageOutOfStock: '//*[text()="Out of stock"]'
      //#endregion
    }
  }

  async enterTextInSearchField(text) {
    return await this.page.fill(this.locators.searchField, text)
  }

  async bannerVisible() {
    return await this.page.isVisible(this.locators.banner)
  }

  async languageBtnVisible() {
    return await this.page.isVisible(this.locators.languageBtn)
  }

  async toolShopLogoVisible() {
    return await this.page.isVisible(this.locators.toolShopLogo)
  }

  async mainMenuItemsVisible() {
    return await this.page.isVisible(this.locators.mainMenu)
  }

  async categoryOptionsVisible() {
    return await this.page.isVisible(this.locators.categories)
  }

  async clickNextPage() {
    await this.page.click(this.locators.nextPage)
  }

  async clickPreviousPage() {
    await this.page.click(this.locators.previousPage)
  }

  async searchButtonClick() {
    await this.page.click(this.locators.searchButton)
  }

  async xButtonClick() {
    await this.page.click(this.locators.xButton)
  }

  async checkboxGrinder() {
    await this.page.waitForSelector(this.locators.grinderCheckbox, { state: 'visible' });
    await this.page.click(this.locators.grinderCheckbox);
  }

  async getNoProductsFound() {
    return await this.page.textContent(this.locators.messageNoProductsFound)
  }

  async getOutOfStock() {
    return await this.page.textContent(this.locators.messageOutOfStock)
  }

  async waitForOutOfStock() {
    return this.page.waitForSelector(this.locators.messageOutOfStock)
  }

  async isSearchFieldEmpty() {
    return await this.page.inputValue(this.locators.searchField) === ''
  }

  async pressEnterKeyOnSearchField() {
    const searchField = this.page.locator(this.locators.searchField)
    await searchField.focus()
    await searchField.press('Enter')
  }

  async searchCaptionDisplayed(expectedText) {
    const caption = await this.page.textContent(this.locators.searchCaption)
    return caption?.trim().toLowerCase() === expectedText.toLowerCase()
  }

  async adjustLeftHandle(xOffset) {
    const leftHandle = await this.page.locator(this.locators.leftHandle)
    await leftHandle.hover()
    await this.page.mouse.down()
    const box = await leftHandle.boundingBox()
    if (box) {
        await this.page.mouse.move(box.x + xOffset, box.y + box.height / 2)
    }
    await this.page.mouse.up()
  }

  async adjustRightHandle(xOffset) {
    const rightHandle = await this.page.locator(this.locators.rightHandle)
    await rightHandle.hover()
    await this.page.mouse.down()
    const box = await rightHandle.boundingBox()
    if (box) {
        await this.page.mouse.move(box.x + xOffset, box.y + box.height / 2)
    }
    await this.page.mouse.up()
  }

  async getLeftHandleValue() {
    return await this.page.locator(this.locators.leftHandle).textContent()
  }

  async getRightHandleValue() {
    return await this.page.locator(this.locators.rightHandle).textContent()
  }

  async sortOptionsDisplayed() {
    return await this.page.isVisible(this.locators.sortFilter)
  } 
  
  async sidebarFilterOptions() {
    await expect(this.page.locator(this.locators.filterHandTools)).toBeVisible(true, 'Hand Tools should be displayed')
    await expect(this.page.locator(this.locators.filterHammer)).toBeVisible(true, 'Hammer should be displayed')
    await expect(this.page.locator(this.locators.filterHandSaw)).toBeVisible(true, 'Hand Saw should be displayed')
    await expect(this.page.locator(this.locators.filterWrench)).toBeVisible(true, 'Wrench should be displayed')
    await expect(this.page.locator(this.locators.filterScrewdriver)).toBeVisible(true, 'Screwdriver should be displayed')
    await expect(this.page.locator(this.locators.filterPliers)).toBeVisible(true, 'Pliers should be displayed')
    await expect(this.page.locator(this.locators.filterChisels)).toBeVisible(true, 'Chisels should be displayed')
    await expect(this.page.locator(this.locators.filterMeasures)).toBeVisible(true, 'Measures should be displayed')
    await expect(this.page.locator(this.locators.filterPowerTools)).toBeVisible(true, 'Power Tools should be displayed')
    await expect(this.page.locator(this.locators.filterGrinder)).toBeVisible(true, 'Grinder should be displayed')
    await expect(this.page.locator(this.locators.filterSander)).toBeVisible(true, 'Sander should be displayed')
    await expect(this.page.locator(this.locators.filterSaw)).toBeVisible(true, 'Saw should be displayed')
    await expect(this.page.locator(this.locators.filterDrill)).toBeVisible(true, 'Drill should be displayed')
    await expect(this.page.locator(this.locators.filterOther)).toBeVisible(true, 'Other should be displayed')
    await expect(this.page.locator(this.locators.filterToolBelts)).toBeVisible(true, 'Tool Belts should be displayed')
    await expect(this.page.locator(this.locators.filterStorageSolutions)).toBeVisible(true, 'Storage Solutions should be displayed')
    await expect(this.page.locator(this.locators.filterWorkbench)).toBeVisible(true, 'Workbench should be displayed')
    await expect(this.page.locator(this.locators.filterSafetyGear)).toBeVisible(true, 'Safety Gear should be displayed')
    await expect(this.page.locator(this.locators.filterFasteners)).toBeVisible(true, 'Fasteners should be displayed')
    await expect(this.page.locator(this.locators.filterForgeFlexTools)).toBeVisible(true, 'ForgeFlex Tools should be displayed')
    await expect(this.page.locator(this.locators.filterMightyCraftHardware)).toBeVisible(true, 'MightyCraft Hardware should be displayed')
  }

  async headersDisplayed(data) {
    let isVisible
    switch (data) {
        case 'Sort':
            isVisible = await this.page.isVisible(this.locators.headerSort)
            break
        case 'Price Range':
            isVisible = await this.page.isVisible(this.locators.headerPriceRange)
            break
        case 'Search':
            isVisible = await this.page.isVisible(this.locators.headerSearch)
            break
        case 'Filters':
            isVisible = await this.page.isVisible(this.locators.headerFilters)
            break
        case 'By Category:':
            isVisible = await this.page.isVisible(this.locators.headerByCategory)
            break
        case 'By Brand:':
            isVisible = await this.page.isVisible(this.locators.headerByBrand)
            break
        default:
            isVisible = false
      }
      return isVisible
  }

  async clickPaginationPages() {
    for (let i = 1; i <= 5; i++) {
      const pageLink = this.page.locator(`${this.locators.pagination}//a[normalize-space()="${i}"]`)
      await pageLink.waitFor({ state: 'visible' })
      await pageLink.click()
    }
  }

}

module.exports = { HomePage }