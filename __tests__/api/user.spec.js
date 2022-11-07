//Bibliotecas
const supertest = require("supertest");//framework teste de api
const assert = require("chai").assert;// Função de assertiva do resultado

//Constrantes, Variaveis e Objetos
const baseUrl = "https://petstore.swagger.io/v2"; // url base da API CUIDADO SEMPRE COLOCAR HTTPS
const request = supertest(baseUrl);
let frase;
let token;

describe("PetStore Swagger - User",()=>{
    it("Get User Login",()=>{
        //Configura
        username="xyzcommpany";
        password="123456";

        //Executa
        return request 
                .get("/user/login?username="+username+"&password="+password)
                .then((response)=> {
                        assert.equal(response.statusCode,200);
                        assert.equal(response.body.code, 200);
                        assert.equal(response.body.type,"unknown");
                        mensagem = response.body.message;
                        frase = mensagem.substring(0,mensagem.indexOf(":")+1);
                        console.log("A frase eh "+ frase);
                        assert.equal(frase,"logged in user session:");
                        token = mensagem.substring(mensagem.indexOf(":")+1);
                        console.log("O token é  "+ token);
                });//fim da request
    });
});