import { expect, Page } from '@playwright/test'

export class HomePage {
  page: Page
  locators: Record<string, string>

  constructor(page: Page) {
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
      searchCaption: '//h3',
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

  async enterTextInSearchField(text: string): Promise<void> {
    return await this.page.fill(this.locators.searchField, text)
  }

  async bannerVisible(): Promise<boolean> {
    return await this.page.isVisible(this.locators.banner)
  }

  async languageBtnVisible(): Promise<boolean> {
    return await this.page.isVisible(this.locators.languageBtn)
  }

  async toolShopLogoVisible(): Promise<boolean> {
    return await this.page.isVisible(this.locators.toolShopLogo)
  }

  async mainMenuItemsVisible(): Promise<boolean> {
    return await this.page.isVisible(this.locators.mainMenu)
  }

  async categoryOptionsVisible(): Promise<boolean> {
    return await this.page.isVisible(this.locators.categories)
  }

  async clickNextPage(): Promise<void> {
    await this.page.click(this.locators.nextPage)
  }

  async clickPreviousPage(): Promise<void> {
    await this.page.click(this.locators.previousPage)
  }

  async searchButtonClick(): Promise<void> {
    await this.page.click(this.locators.searchButton)
  }

  async xButtonClick(): Promise<void> {
    await this.page.click(this.locators.xButton)
  }

  async checkboxGrinder(): Promise<void> {
    await this.page.waitForSelector(this.locators.grinderCheckbox, { state: 'visible' })
    await this.page.click(this.locators.grinderCheckbox)
  }

  async getNoProductsFound(): Promise<string | null> {
    return await this.page.textContent(this.locators.messageNoProductsFound)
  }

  async getOutOfStock(): Promise<string | null> {
    return await this.page.textContent(this.locators.messageOutOfStock)
  }

  async waitForOutOfStock(): Promise<void> {
    await this.page.waitForSelector(this.locators.messageOutOfStock)
  }

  async isSearchFieldEmpty(): Promise<boolean> {
    return (await this.page.inputValue(this.locators.searchField)) === ''
  }

  async pressEnterKeyOnSearchField(): Promise<void> {
    const searchField = this.page.locator(this.locators.searchField)
    await searchField.focus()
    await searchField.press('Enter')
  }

  async searchCaptionDisplayed(expectedText: string): Promise<boolean> {
    const caption = await this.page.textContent(this.locators.searchCaption)
    return caption?.trim().toLowerCase() === expectedText.toLowerCase()
  }

  async adjustLeftHandle(xOffset: number): Promise<void> {
    const leftHandle = await this.page.locator(this.locators.leftHandle)
    await leftHandle.hover()
    await this.page.mouse.down()
    const box = await leftHandle.boundingBox()
    if (box) {
      await this.page.mouse.move(box.x + xOffset, box.y + box.height / 2)
    }
    await this.page.mouse.up()
  }

  async adjustRightHandle(xOffset: number): Promise<void> {
    const rightHandle = await this.page.locator(this.locators.rightHandle)
    await rightHandle.hover()
    await this.page.mouse.down()
    const box = await rightHandle.boundingBox()
    if (box) {
      await this.page.mouse.move(box.x + xOffset, box.y + box.height / 2)
    }
    await this.page.mouse.up()
  }

  async getLeftHandleValue(): Promise<string | null> {
    return await this.page.locator(this.locators.leftHandle).textContent()
  }

  async getRightHandleValue(): Promise<string | null> {
    return await this.page.locator(this.locators.rightHandle).textContent()
  }

  async sortOptionsDisplayed(): Promise<boolean> {
    return await this.page.isVisible(this.locators.sortFilter)
  }

  async sidebarFilterOptions(): Promise<void> {
    await expect(this.page.locator(this.locators.filterHandTools)).toBeVisible(
      { timeout: 5000 }
    )
    await expect(this.page.locator(this.locators.filterHammer)).toBeVisible(
      { timeout: 5000 }
    )
    await expect(this.page.locator(this.locators.filterHandSaw)).toBeVisible(
      { timeout: 5000 }
    )
    await expect(this.page.locator(this.locators.filterWrench)).toBeVisible(
      { timeout: 5000 }
    )
    await expect(this.page.locator(this.locators.filterScrewdriver)).toBeVisible(
      { timeout: 5000 }
    )
    await expect(this.page.locator(this.locators.filterPliers)).toBeVisible(
      { timeout: 5000 }
    )
    await expect(this.page.locator(this.locators.filterChisels)).toBeVisible(
      { timeout: 5000 }
    )
    await expect(this.page.locator(this.locators.filterMeasures)).toBeVisible(
      { timeout: 5000 }
    )
    await expect(this.page.locator(this.locators.filterPowerTools)).toBeVisible(
      { timeout: 5000 }
    )
    await expect(this.page.locator(this.locators.filterGrinder)).toBeVisible(
      { timeout: 5000 }
    )
    await expect(this.page.locator(this.locators.filterSander)).toBeVisible(
      { timeout: 5000 }
    )
    await expect(this.page.locator(this.locators.filterSaw)).toBeVisible(
      { timeout: 5000 }
    )
    await expect(this.page.locator(this.locators.filterDrill)).toBeVisible(
      { timeout: 5000 }
    )
    await expect(this.page.locator(this.locators.filterOther)).toBeVisible(
      { timeout: 5000 }
    )
    await expect(this.page.locator(this.locators.filterToolBelts)).toBeVisible(
      { timeout: 5000 }
    )
    await expect(this.page.locator(this.locators.filterStorageSolutions)).toBeVisible(
      { timeout: 5000 }
    )
    await expect(this.page.locator(this.locators.filterWorkbench)).toBeVisible(
      { timeout: 5000 }
    )
    await expect(this.page.locator(this.locators.filterSafetyGear)).toBeVisible(
      { timeout: 5000 }
    )
    await expect(this.page.locator(this.locators.filterFasteners)).toBeVisible(
      { timeout: 5000 }
    )
    await expect(this.page.locator(this.locators.filterForgeFlexTools)).toBeVisible(
      { timeout: 5000 }
    )
    await expect(this.page.locator(this.locators.filterMightyCraftHardware)).toBeVisible(
      { timeout: 5000 }
    )
  }

  async headersDisplayed(data: string): Promise<boolean> {
    let isVisible: boolean
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

  async clickPaginationPages(): Promise<void> {
    for (let i = 1; i <= 5; i++) {
      const pageLink = this.page.locator(
        `${this.locators.pagination}//a[normalize-space()="${i}"]`
      )
      await pageLink.waitFor({ state: 'visible' })
      await pageLink.click()
    }
  }
}
