//Bibliotecas
const supertest = require("supertest");//framework teste de api
const assert = require("chai").assert;// Função de assertiva do resultado

//Constrantes, Variaveis e Objetos
const baseUrl = "https://petstore.swagger.io/v2"; // url base da API CUIDADO SEMPRE COLOCAR HTTPS
const petId = 7569982; //codigo do animal

//Descrição = Conjuntos de Testes ~ Classe

describe("PetStore Swagger - Pet",() => {
    const request = supertest(baseUrl);
    const pets = require("../../vendors/json/petn");

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

    //Consulta o animal pelo seu petID
    it("Get Pet", () => {
        return request                //chamada para a requisição
            .get("/pet/" + petId)     //consultar o animal pelo id
            .then((response)=>{       //tratar a resposta/retorno  
                 assert.equal(response.statusCode, 200);
                 assert.equal(response.body.id, petId);
                 assert.equal(response.body.name, "Miau");   
                 assert.equal(response.body.status, "available");
            })

    });

    // Alterar dados do animal
    it("Put Pet",() => {
        //apontar para o arquivo jason com a alteração desejada
        const jsonFile = require("../../vendors/json/pet2.json");

        return request               //realizar a requisição
            .put("/pet")            //alterar o animal - aponta para o endpoint
            .send(jsonFile)         //json com a alteração
            .then((response)=>{     // receber e validar a resposta
                assert.equal(response.statusCode, 200);
                assert.equal(response.body.id, petId);
                assert.equal(response.body.name, "Miau");
                assert.equal(response.body.tags[1].id, 4);
                assert.equal(response.body.tags[1].name, "Castrated");
                assert.equal(response.body.status, "solded");
            });//fecha o then


    });//fecha o it

    //Deletar os dados do animal
    it("Delet Pet",() => {
        return request
            .delete("/pet/" + petId)
            .then((response) => {
                assert.equal(response.statusCode, 200);
            });            
    });//fecha o it

    //Função de carga de animais - Setup
    pets.array.forEach(({nomePet,idPet,nomeCategoria,idCategoria})=>{
        it("Setup Swagger - Add Pets",() => {
            pet.id = idPet
            pet.name = nomePet
            pet.category = idCategoria
            pet.category.name = nomeCategoria

            return request
                   .post("/pet")
                   .send(pet)

        });//Fecha o it
    });//Fecha o forEach
   
});//fecha o describe
