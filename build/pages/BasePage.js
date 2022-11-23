class BasePage {
    constructor(driver) {
        this.driver = driver; //conectando driver de fora com o de dentro
    }
    //mapeamento do Titulo 
    async getTitle() {
        return await this.driver.getTitle();
    }
}
module.exports = BasePage;
