
const tbody = document.querySelector("tbody");
const descItem = document.querySelector("#desc");
const amount = document.querySelector("#amount");
const type = document.querySelector("#type");
const btnNew = document.querySelector("btnNew");

const incomes = document.querySelector(".incomes");
const expenses = document.querySelector(".expenses");
const total = document.querySelector(".total");


//Variavel para armazenar os itens
let items;









//Dentro da função irá carregar na variavel items as informação que tem no banco
function loadItens(){
    items = getItensBD();
    //Limpar o tbody para não duplicar itens na tela
    tbody.innerHTML = "";
    items.forEach((item, index) => {
        insertItem(item,index);
    });
}







//Função getItensDb que vão pegar as funções que estão no banco
//É uma função que usa o método getItem() do objeto localstorage, com o intuito de obter um item salvo no armazenamento local do navegador
//O método getItem() recebe como parâmetro uma string que representa a chave do item que deseja obter
//O metodo getItem vai retornar uma string em JSON. Para isso é usado o JSON.parse
//Essa função transforma em um objeto Javascript

const getItensBD = () => JSON.parse(localStorage.getItem("db_items")) ?? [];

//Vai inserir no banco as informações que tem na variavel items
//a função setItem() usa o metodo setItem parar salva no armazenamento local do navegador, o localstorage
//O metodo setItem recebe dois parametros uma chave e um valor
//No caso desse código a chave é "db_items" e o valor é resultado da função JSON.stringify()
// Que é usada para converter um objeto Javascript em um string JSON
//Que pode ser armazenado no armazenamento local do navegador

const setItensBD = () =>
    localStorage.setItem("db_items", JSON.stringify(items));


//Função loadItens vai ser inicializada assim que carregar o documento
loadItens();
