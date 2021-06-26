
class HomePage {
    get HomePageBtn() { return $('//*[contains(text(), "Home") and @href="/"]')}
    get UserPageBtn() {return $('//*[contains(text(), "Users") and @href="/users"]')}
    get PlanetsPageBtn() {return $('//*[contains(text(), "Planets") and @href="/planets"]')}
    get RacesPageBtn() {return $('//*[@href="/races"]')}
    get AboutPageBtn() {return $('//*[@href="/about"]')}
    get Footer(){return $('//*[@class="footer"]')}
    get Logo() {return $('//*[@class="logo"]')}
    get PhotoOnHomePage() {return $('//*[@class="photo"]')}
}
module.exports = new HomePage();
