const homePage = require('../pageobjects/home.page')
const assert = require('assert')

describe('Home page tests', () => {

    it('On home page must be "Home" button', async () => {
        console.log("URL", await homePage.goToHomePageUrl())

        expect(await homePage.checkHomePageDisplayed()).toBeTruthy()
        expect(await homePage.getHomePageAttribute("href")).toBe( "/")
        expect(await homePage.getHomePageText()).toBe( "Home")

    })

    it('On home page must be "Users" button', async () => {
        expect(await homePage.checkUserBtnClickable()).toBeTruthy()
        expect(await homePage.getUserBtnAttribute("href")).toBe("/users")
        expect (await homePage.getUserBtnText()).toBe( "Users")
    })

    it('On home page must be "Planets" button', async () => {
        expect(await homePage.checkPlanetsBtnClickable).toBeTruthy()
        expect(await homePage.getPlanetsBtnAttribute("href")).toBe("/planets")
        expect(await homePage.getPlanetsBtnText()).toBe("Planets")
    });

    it('On home page must be "Races" button', async () => {
        expect(await homePage.checkRacesBtnClickable()).toBeTruthy()
        expect(await homePage.getRacesBtnAttribute("href")).toBe( "/races")
        expect(await homePage.getRacesBtnText()).toBe( "Races")

    });
    it('On home page must be "About" button', async () => {
        expect(await homePage.checkAboutBtnClickable()).toBeTruthy()
        expect(await homePage.getAboutBtnAttribute("href")).toBe( "/about")
        expect(await homePage.getAboutBtnText()).toBe("About")

    });

    it('On home page must be footer with text "Planets"', async () => {

        expect(await homePage.checkFooterDisplayed())
        expect(await homePage.getFooterText()).toBe("🔞🔞Planets1🔞🔞")
    });

        it('Displaying all pages above footer', async () => {
           const imagesDisplayed =  await homePage.getAllDownImages()
            return imagesDisplayed
    });
})


