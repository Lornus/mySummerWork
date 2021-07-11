
class HomePage {
    get PageUrl(){ return 'https://npplanets.herokuapp.com/'}
    get HomePageBtn() { return $('//*[contains(text(), "Home") and @href="/"]')}
    get UserPageBtn() {return $('//*[contains(text(), "Users") and @href="/users"]')}
    get PlanetsPageBtn() {return $('//*[contains(text(), "Planets") and @href="/planets"]')}
    get RacesPageBtn() {return $('//*[@href="/races"]')}
    get AboutPageBtn() {return $('//*[@href="/about"]')}
    get Footer(){return $('//*[@class="footer"]')}
    get Logo() {return $('//*[@class="logo"]')}
    get PhotoOnHomePage() {return $('//*[@class="photo"]')}
    get HomeImages(){return  $$('[class="home_images"]>img')}


    async goToHomePageUrl(){
        const openPage = await browser.url(this.PageUrl)
        return openPage
    }
    async checkHomePageDisplayed(){
       const checked =  await(
            await this.HomePageBtn).isDisplayed()
        return checked
    }
    async getHomePageAttribute(value){
       const attribute = await (
            await this.HomePageBtn).getAttribute(value)
        return attribute
    }

    async getHomePageText(){
        const text = await(
            await this.HomePageBtn).getText()
        return text
    }

    async checkUserBtnClickable(){
        const clickable = await(
            await this.UserPageBtn).isClickable()
        return clickable
    }

    async getUserBtnAttribute(value){
        const attribute =  await (
            await this.UserPageBtn).getAttribute(value)
        return attribute
    }

    async getUserBtnText(){
        const text =  await(
            await this.UserPageBtn).getText()
        return text
    }

    async checkPlanetsBtnClickable(){
        const clickable =  await(
            await this.PlanetsPageBtn).isClickable()
        return clickable
    }

    async getPlanetsBtnAttribute(value){
        const attribute = await (
            await this.PlanetsPageBtn).getAttribute(value)
        return attribute
    }

    async getPlanetsBtnText(){
        const text = await(
            await this.PlanetsPageBtn).getText()
        return text
    }

    async checkRacesBtnClickable(){
        const clickable =  await(
            await this.RacesPageBtn).isClickable()
        return clickable
    }

    async getRacesBtnAttribute(value){
        const attribute =  await (
            await this.RacesPageBtn).getAttribute(value)
        return attribute
    }

    async getRacesBtnText(){
        const text = await(
            await this.RacesPageBtn).getText()
        return text
    }

    async checkAboutBtnClickable(){
        const clickable =  await(
            await this.AboutPageBtn).isClickable()
        return clickable
    }

    async getAboutBtnAttribute(value){
        const attribute = await (
            await this.AboutPageBtn).getAttribute(value)
        return attribute
    }

    async getAboutBtnText(){
        const text =  await(
            await this.AboutPageBtn).getText()
        return text
    }

    async getFooterText(){
        const text = await(
            await this.Footer).getText()
        return text
    }

    async getAllDownImages(){
        const imagesArr= await Promise.all((await this.HomeImages).map(async element => {
            const page_image = await element.isDisplayed()
            return page_image
        }))
        const imagesDisplayed = imagesArr.every(isDisplayed => isDisplayed === true)
        return imagesDisplayed
    }
}
module.exports = new HomePage();
