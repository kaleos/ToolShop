const { expect } = require('@playwright/test')

class HomePage {
  constructor(page) {
    this.page = page

    //#region sidebar header locators
    this.headerSort = '//h4[contains(text(),"Sort")]',
    this.headerPriceRange = '//h4[contains(text(),"Price Range")]',
    this.headerSearch = '//h4[contains(text(),"Search")]',
    this.headerFilters = '//h4[contains(text(),"Filters")]',
    this.headerByCategory = '//h4[contains(text(),"By category:")]',
    this.headerByBrand = '//h4[contains(text(),"By brand:")]'
    //#endregion

    //#region Sidebar filter options locators
    this.filterHandTools = '//label[contains(text(),"Hand Tools")]',
    this.filterHammer = '//label[contains(text(),"Hammer")]',
    this.filterHandSaw = '//label[contains(text(),"Hand Saw")]',
    this.filterWrench = '//label[contains(text(),"Wrench")]',
    this.filterScrewdriver = '//label[contains(text(),"Screwdriver")]',
    this.filterPliers = '//label[contains(text(),"Pliers")]',
    this.filterChisels = '//label[contains(text(),"Chisels")]',
    this.filterMeasures = '//label[contains(text(),"Measures")]',
    this.filterPowerTools = '//label[contains(text(),"Power Tools")]',
    this.filterGrinder = '//label[contains(text(),"Grinder")]',
    this.filterSander = '//label[contains(text(),"Sander")]',
    this.filterSaw = '//label[normalize-space()="Hand Saw"]',
    this.filterDrill = '//label[contains(text(),"Drill")]',
    this.filterOther = '//label[contains(text(),"Other")]',
    this.filterToolBelts = '//label[contains(text(),"Tool Belts")]',
    this.filterStorageSolutions = '//label[contains(text(),"Storage Solutions")]',
    this.filterWorkbench = '//label[contains(text(),"Workbench")]',
    this.filterSafetyGear = '//label[contains(text(),"Safety Gear")]',
    this.filterFasteners = '//label[contains(text(),"Fasteners")]',
    this.filterForgeFlexTools = '//label[contains(text(),"ForgeFlex Tools")]',
    this.filterMightyCraftHardware = '//label[contains(text(),"MightyCraft Hardware")]'
    //#endregion

    //#region other locators
    this.sortFilter = '//select[@aria-label="sort"]',
    this.leftHandle = '//span[@aria-label="ngx-slider"]',
    this.rightHandle = '//span[@aria-label="ngx-slider-max"]',
    this.searchField = '//input[@id="search-query"]',
    this.searchCaption = '//h3[@data-test="search-caption"]',
    this.searchButton = '//button[contains(text(),"Search")]',
    this.xButton = '//button[contains(text(),"X")]',
    this.grinderCheckbox = '//label[contains(text(),"Grinder")]',
    this.nextPage = '//a[@aria-label="Next"]',
    this.previousPage = '//a[@aria-label="Previous"]',
    this.pagination = '//ul[@class="pagination"]',
    this.banner = '//img[@alt="Banner"]',
    this.toolShopLogo = '//a[contains(@title, "Practice Software Testing - Toolshop")]',
    this.mainMenu = '//ul[@aria-label="Main menu"]',
    this.categories = '//*[text()=" Categories "]',
    this.languageBtn = '//button[@id="language"]'
    //#endregion

    //#region Message locators
    this.messageNoProductsFound = '//*[text()="There are no products found."]',
    this.messageOutOfStock = '//*[text()="Out of stock"]'
    //#endregion

  }

  async enterTextInSearchField(text) {
    return await this.page.fill(this.searchField, text)
  }

  async bannerVisible() {
    return await this.page.isVisible(this.banner)
  }

  async languageBtnVisible() {
    return await this.page.isVisible(this.languageBtn)
  }

  async toolShopLogoVisible() {
    return await this.page.isVisible(this.toolShopLogo)
  }

  async mainMenuItemsVisible() {
    return await this.page.isVisible(this.mainMenu)
  }

  async categoryOptionsVisible() {
    return await this.page.isVisible(this.categories)
  }

  async clickNextPage() {
    await this.page.click(this.nextPage)
  }

  async clickPreviousPage() {
    await this.page.click(this.previousPage)
  }

  async searchButtonClick() {
    await this.page.click(this.searchButton)
  }

  async xButtonClick() {
    await this.page.click(this.xButton)
  }

  async checkboxGrinder() {
    await this.page.waitForSelector(this.grinderCheckbox, { state: 'visible' });
    await this.page.click(this.grinderCheckbox);
  }

  async getNoProductsFound() {
    return await this.page.textContent(this.messageNoProductsFound)
  }

  async getOutOfStock() {
    return await this.page.textContent(this.messageOutOfStock)
  }

  async waitForOutOfStock() {
    return this.page.waitForSelector(this.messageOutOfStock)
  }

  async isSearchFieldEmpty() {
    return await this.page.inputValue(this.searchField) === ''
  }

  async pressEnterKeyOnSearchField() {
    const searchField = this.page.locator(this.searchField)
    await searchField.focus()
    await searchField.press('Enter')
  }

  async searchCaptionDisplayed(expectedText) {
    const caption = await this.page.textContent(this.searchCaption)
    return caption?.trim().toLowerCase() === expectedText.toLowerCase()
  }

  async adjustLeftHandle(xOffset) {
    const leftHandle = await this.page.locator(this.leftHandle)
    await leftHandle.hover()
    await this.page.mouse.down()
    const box = await leftHandle.boundingBox()
    if (box) {
        await this.page.mouse.move(box.x + xOffset, box.y + box.height / 2)
    }
    await this.page.mouse.up()
  }

  async adjustRightHandle(xOffset) {
    const rightHandle = await this.page.locator(this.rightHandle)
    await rightHandle.hover()
    await this.page.mouse.down()
    const box = await rightHandle.boundingBox()
    if (box) {
        await this.page.mouse.move(box.x + xOffset, box.y + box.height / 2)
    }
    await this.page.mouse.up()
  }

  async getLeftHandleValue() {
    return await this.page.locator(this.leftHandle).textContent()
  }

  async getRightHandleValue() {
    return await this.page.locator(this.rightHandle).textContent()
  }

  async sortOptionsDisplayed() {
    return await this.page.isVisible(this.sortFilter)
  } 
  
  async sidebarFilterOptions() {
    await expect(this.page.locator(this.filterHandTools)).toBeVisible(true, 'Hand Tools should be displayed')
    await expect(this.page.locator(this.filterHammer)).toBeVisible(true, 'Hammer should be displayed')
    await expect(this.page.locator(this.filterHandSaw)).toBeVisible(true, 'Hand Saw should be displayed')
    await expect(this.page.locator(this.filterWrench)).toBeVisible(true, 'Wrench should be displayed')
    await expect(this.page.locator(this.filterScrewdriver)).toBeVisible(true, 'Screwdriver should be displayed')
    await expect(this.page.locator(this.filterPliers)).toBeVisible(true, 'Pliers should be displayed')
    await expect(this.page.locator(this.filterChisels)).toBeVisible(true, 'Chisels should be displayed')
    await expect(this.page.locator(this.filterMeasures)).toBeVisible(true, 'Measures should be displayed')
    await expect(this.page.locator(this.filterPowerTools)).toBeVisible(true, 'Power Tools should be displayed')
    await expect(this.page.locator(this.filterGrinder)).toBeVisible(true, 'Grinder should be displayed')
    await expect(this.page.locator(this.filterSander)).toBeVisible(true, 'Sander should be displayed')
    await expect(this.page.locator(this.filterSaw)).toBeVisible(true, 'Saw should be displayed')
    await expect(this.page.locator(this.filterDrill)).toBeVisible(true, 'Drill should be displayed')
    await expect(this.page.locator(this.filterOther)).toBeVisible(true, 'Other should be displayed')
    await expect(this.page.locator(this.filterToolBelts)).toBeVisible(true, 'Tool Belts should be displayed')
    await expect(this.page.locator(this.filterStorageSolutions)).toBeVisible(true, 'Storage Solutions should be displayed')
    await expect(this.page.locator(this.filterWorkbench)).toBeVisible(true, 'Workbench should be displayed')
    await expect(this.page.locator(this.filterSafetyGear)).toBeVisible(true, 'Safety Gear should be displayed')
    await expect(this.page.locator(this.filterFasteners)).toBeVisible(true, 'Fasteners should be displayed')
    await expect(this.page.locator(this.filterForgeFlexTools)).toBeVisible(true, 'ForgeFlex Tools should be displayed')
    await expect(this.page.locator(this.filterMightyCraftHardware)).toBeVisible(true, 'MightyCraft Hardware should be displayed')
  }

  async headersDisplayed(data) {
    let isVisible
    switch (data) {
        case 'Sort':
            isVisible = await this.page.isVisible(this.headerSort)
            break
        case 'Price Range':
            isVisible = await this.page.isVisible(this.headerPriceRange)
            break
        case 'Search':
            isVisible = await this.page.isVisible(this.headerSearch)
            break
        case 'Filters':
            isVisible = await this.page.isVisible(this.headerFilters)
            break
        case 'By Category:':
            isVisible = await this.page.isVisible(this.headerByCategory)
            break
        case 'By Brand:':
            isVisible = await this.page.isVisible(this.headerByBrand)
            break
        default:
            isVisible = false
      }
      return isVisible
  }

  async clickPaginationPages() {
    for (let i = 1; i <= 5; i++) {
      const pageLink = this.page.locator(`${this.pagination}//a[normalize-space()="${i}"]`)
      await pageLink.waitFor({ state: 'visible' })
      await pageLink.click()
    }
  }

}

module.exports = { HomePage }