const{ Builder, By } = require('selenium-webdriver') // Selenium Webdriver
require('chromedriver')                              //Chrome Driver
const assert = require('assert')                     //Assert - para fazer as validações
const fsp = require('fs')  // Biblioteca de acesso ao sistema de arquivos (File System)
// Funções de apoio
async function takeScreenshot(driver, file){
    let image = await driver.takeScreenshot()
    await fsp.writeFile(file, image, 'base64')
}


//Suite de Teste - Conjunto de testes
describe('Login', function (){
    let driver ///objeto do Selenium Webdriver

    // Antes do Teste
    beforeEach(async function(){
        driver = await new Builder() //instancia o Selenium Webdriver
            .forBrowser('chrome')    // seleciona o driver para Chrome
            .build()                 // executa a operação

        driver.manage().setTimeouts({implicit: 60000}) //espera implicita de até 60 mil milissegundos
        driver.manage().window().maximize() // maximiza a janela do browser
    })//final do before
    //Depois do Teste
    afterEach(async function(){
        await driver.quit() //destruir o objeto do Selenium Webdriver
    })//final do after

    //Os Testes
    it('Experimentando Login', async function (){
        await driver.get('https://www.blazedemo.com')         //acessar a home do site
        takeScreenshot(driver, 'print1 - home.png')
        await driver.findElement(By.linkText('home')).click() //clicar no link escrito home

        //validar se entrou na página de login
        assert(await driver.getTitle() == 'BlazeDemo')         //valida o titulo da guia
                                                               // neste caso não é conclusivo
        // Comparar se no cabeçalho do painel está escrito Login -  mais conclusivo                                                      
        assert(await driver.findElement(By.css('div.panel-heading')).getText() == 'Login')

         // escreve no campo e-mail (cola o texto no campo)
        await driver.findElement(By.id('email')).sendKeys('teste@teste.com.br')//cola o texto inteiro
        //a linha comentada abaixo é um exemplo para escrever letra por letra
        //await driver.findElement(By.id('email')).sendKeys(Key.chord('teste@teste.com.br'))// coloca letra por letra no campo

        //escreve no campo senha
        await driver.findElement(By.id('password')).sendKeys('12345678')


        //clica no botão login
        await driver.findElement(By.css('button.btn.btn-primary')).click()

        

        //Validar o titulo da guia
        assert(await driver.getTitle() == 'Page Expired')

        //Linha abaixo pode pegar o nome do objeto ou pode se tentar pelo terminal abaixo
        //console.log('texto: ' + driver.findElement(By.css('div.flex-center.position-ref.full-height')).getText())
        //Validar o texto na página
        assert(await driver.findElement(By.css('div.flex-center.position-ref.full-height')).getText() == '419\nPage Expired')

    })//fim do it

    // it('Cadastrar o Usuario', async function (){

    // })
}) // Final do descibe

//Para duvidas stackoverflow / saucelabs / guru99.com / toolsqa.com