const homePage = require('../pageobjects/home.page')
const assert = require('assert')

describe('Home page tests', () => {

    it('On home page must be "Home" button', async () => {
        await browser.url('https://npplanets.herokuapp.com/')

        await assert(await (await homePage.HomePageBtn).isDisplayed())
        await assert.equal(await (await homePage.HomePageBtn).getAttribute("href"), "/")
        await assert.equal(await (await homePage.HomePageBtn).getText(), "Home")

    })

    it('On home page must be "Users" button', async () => {
        assert(await (await homePage.UserPageBtn).isClickable())
        assert(await (await homePage.UserPageBtn).isDisplayed())
        assert.equal(await (await homePage.UserPageBtn).getAttribute("href"), "/users")
        assert.equal(await (await homePage.UserPageBtn).getText(), "Users")
    })

    it('On home page must be "Planets" button', async () => {
         assert(await (await homePage.PlanetsPageBtn).isClickable())
         assert(await (await homePage.PlanetsPageBtn).isDisplayed())
         assert.equal(await (await homePage.PlanetsPageBtn).getAttribute("href"), "/planets")
         assert.equal(await (await homePage.PlanetsPageBtn).getText(), "Planets")
    });
    it('On home page must be "Races" button', async () => {
         assert(await (await homePage.RacesPageBtn).isClickable())
         assert(await (await homePage.RacesPageBtn).isDisplayed())
         assert.equal(await (await homePage.RacesPageBtn).getAttribute("href"), "/races")
         assert.equal(await (await homePage.RacesPageBtn).getText(), "Races")

    });
    it('On home page must be "About" button', async () => {
        assert(await (await homePage.AboutPageBtn).isClickable())
        assert(await (await homePage.AboutPageBtn).isDisplayed())
        assert.equal(await (await homePage.AboutPageBtn).getAttribute("href"), "/about")
        assert.equal(await (await homePage.AboutPageBtn).getText(), "About")

    });

    it('On home page must be footer with text "Planets"', async () => {
      assert(await (await homePage.Footer).isDisplayed())                                      
      assert.equal(await (await homePage.Footer).getText(), "🔞🔞Planets🔞🔞")
    });

     it('On home page displayed all pictures ', async () => {
       assert(await (await homePage.Logo).isDisplayed())
        await (await homePage.PhotoOnHomePage).isDisplayed()
        console.log("SRC one: ",await (await homePage.PhotoOnHomePage).getAttribute('src'))

     });

});


