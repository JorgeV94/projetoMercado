//Bibliotecas
const supertest = require("supertest");//framework teste de api
const assert = require("chai").assert;// Função de assertiva do resultado

//Constrantes, Variaveis e Objetos
const baseUrl = "https://petstore.swagger.io/v2"; // url base da API CUIDADO SEMPRE COLOCAR HTTPS
const petId = 7569982; //codigo do animal

//Descrição = Conjuntos de Testes ~ Classe

describe("PetStore Swagger - Pet",() => {
    const request = supertest(baseUrl);

    //Post - teste de incluir um animal
    it("Post Pet", () => {
        //Configuração
        //Apontou para o arquivo com os dados do animal
        const jsonFile = require("../../vendors/json/pet1.json")
        //Realizar a requisição e receber a reposta

        //executa
        return request     //Chamada para requisição
            .post("/pet") // endpoint / função para incluir animal
            .send(jsonFile) //envia os dados no corpo da requisição
            //Valida
            .then((response)=> {
               assert.equal(response.statusCode, 200); // Se a requisição foi recebida e processada
                assert.equal(response.body.id, petId); // Se é o id esperado do animal
                assert.equal(response.body.status, "available"); // se está com o status esperado
                assert.equal(response.body.name, "Miau"); // se está com o nome esperado
            });
    });

});

