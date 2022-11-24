import{ Given, When, Then, Before, After} from "@cucumber/cucumber"
import { Builder } from "selenium-webdriver" //selenium
require("chromedriver") //chromeDriver - tradutor do browser
import { assert } from "chai"
import HomePage = require("../../pages/HomePage")
const chrome = require('selenium-webdriver/chrome')
// selenium - selenium-webdriver/chrome - chromedriver - driver (-fala)

Before(async function () {
    const options = new chrome.Options().headless() // rodar sem a tela ou no modo fantasma (Não é segundo plano)
    this.driver = await new Builder()
        .forBrowser('chrome')
        .setChromeOptions(options) //rodar sem tela modo fantasma
        .build()
    this.driver.manage().setTimeouts({ implicit: 60000 })
    this.driver.manage().window().maximize()

    this.homePage = new HomePage(this.driver)
})

After(async function () {
    await this.driver.quit()
})

Given('acesso o site BlazeDemo', {timeout: 2 * 5000}, async function () {
    /* Quando acontecer o erro: Error: function timed out, ensure the promise resolves within 5000 milliseconds
     é pq a função não retornou resposta no tempo de 5000 por isso deve-se editar esse tempo para aumentar 
     como o seguinte acrescimo de codigo {timeout: 2 * 5000}.
     --The answer is very simple. By default, Cucumber takes 5000ms for asynchronous hooks, 
     -- but we can configure it by doing this:
     --When(/^I open the page$/, {timeout: 2 * 5000}, async () => 
     Documentação do cucumber falando sobre isso: https://github.com/cucumber/cucumber-js/blob/main/docs/support_files/timeouts.md
     */
    await this.driver.get('https://www.blazedemo.com')
});


When('seleciono origem como {string} e destino como {string}', async function (origem,destino) {
    await this.homePage.selecionarOrigemDestinoVoo(origem,destino)
});


Then('exibe o titulo da guia como {string}', async function (tituloEsperado) {
    let tituloAtual = await this.homePage.getTitle()
    assert.equal(tituloAtual, tituloEsperado)
});

//Para relatorios basta rodar o seguinte comando na hora de compilar npx cucumber-js --publish
//Se quiser que toda vez de compilar exista um relatorio basta ir no arquivo package.json e colocar "scripts": {
//     "test": "jest",
//     "cucumber":"tsc && cucumber-js --publish"
//   },

//Para mudar as cidades destino e origem basta ir no feature cucumber e trocar a cidade