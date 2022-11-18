// Bibliotecas
// Apontamento para o arquivo de desenvolvimento que vamos testar

const calculadora = require("../../src/calculadora");

//Apontamento para o arquivo de massa de teste: contem massa de entrada e resultado de entrada
const arquivoJson = require("../../vendors/csv/massaDivisao");

// Funções de teste de unidade

test("Somar 5 + 7",()=>{
    //1-Configura
    //1.1 Dados de entrada
    const num1 = 5;
    const num2= 7;


    //1.2 Resultado Esperado
    const resultadoEsperado = 12;

    //2-Executa
    const resultadoAtual = calculadora.somarDoisNumeros(num1,num2)

    //3-Valida
    expect(resultadoAtual).toBe(resultadoEsperado);//é igual o assert

})

test("Subtrair 15 - 7", () => {
    // 1-Configura / Arrange
    //Entradas
    const num1 = 15;
    const num2 = 7;
    // Saidas
    resultadoEsperado = 8;


    // 2- Executa / Act
    const subtrairDoisNumeros = calculadora.subtrairDoisNumeros;
    const resultadoAtual = subtrairDoisNumeros(num1,num2);

    // 3- Valida  / Assert
    expect(resultadoAtual).toBe(resultadoEsperado);

})// ; é opcional


test("Multiplicar 3 * 7",() => {
    //Configura
    const num1 = 3;
    const num2 = 7;
    const resultadoEsperado = 21;

    //Executa
    const multiplicarDoisNumeros= calculadora.multiplicarDoisNumeros;
    const resultadoAtual = calculadora.multiplicarDoisNumeros(num1,num2);
    //Valida
    expect(resultadoAtual).toBe(resultadoEsperado);
})

//Data Driven Test -- trios ou pares de dados com entradas e saida
let massaDivisão = [
    [10,5,2],
    [15,3,5],
    [ 8,4,2],
    [ 7,0,Infinity] // se for mensagem de erro basta colocar no lugar de infinity
];

test("Dividir 27 / 9", () => {
    //Configura
    const num1 = 27;
    const num2 = 9;
    const resultadoEsperado = 3;

    //Executa
    const dividirDoisNumeros = calculadora.dividirDoisNumeros;
    const resultadoAtual = calculadora.dividirDoisNumeros(num1,num2);

    //Valida
    expect(resultadoAtual).toBe(resultadoEsperado)

})

test.each(massaDivisão)("Dividir %f / %f", (num1,num2,resultadoEsperado) => {
    //Configura
    //Dados de entrada e resultado esperado são providos pela lista massaDivisão

    //Executa
    const dividirDoisNumeros = calculadora.dividirDoisNumeros;
    const resultadoAtual = calculadora.dividirDoisNumeros(num1,num2);

    //Valida
    expect(resultadoAtual).toBe(resultadoEsperado)

})

test.each(arquivoJson.array.map(Elemento => [
    Elemento.num1,
    Elemento.num2,
    Elemento.resultadoEsperado
]))
("DDT: Dividir %f / %f", (num1,num2,resultadoEsperado) => {
    //Configura

    //Executa
    const dividirDoisNumeros = calculadora.dividirDoisNumeros;
    const resultadoAtual = calculadora.dividirDoisNumeros(num1,num2);

    //Valida
    expect(resultadoAtual).toBe(resultadoEsperado)

})