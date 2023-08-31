
const tbody = document.querySelector("tbody");
const descItem = document.querySelector("#descricao");
const amount = document.querySelector("#amount");
const type = document.querySelector("#type");
const btnNew = document.querySelector("#btn-submit");

const incomes = document.querySelector(".incomes");
const expenses = document.querySelector(".expense");
const total = document.querySelector(".total");


//Variavel para armazenar os itens
let items;

btnNew.onclick = () => {
    if (descItem.value === "" || amount.value === "" || type.value === "") {
        return alert("Preencha todos os campos!!");
    }

    items.push({
        desc: descItem.value,
        amount: Math.abs(amount.value).toFixed(2),
        type: type.value,
      });
    

    setItensBD();

    loadItens();

    descItem.value = "";
    amount.value = "";

};




//|Função para deletar o item (lixeira)

function deleteItem(index) {
    //delete o item de index 1
    items.splice(index, 1);
    //Atualiza o banco
    setItensBD();
    //recarregar a informação 
    loadItens();
}



//Função para inserir o item no HTML
function insertItem(item, index){
    let tr = document.createElement("tr");

   
  tr.innerHTML = `
    <td>${item.desc}</td>
    <td>R$ ${item.amount}</td>
    <td class="columnType">${
      item.type === "Entrada"
        ? '<i class="bx bxs-chevron-up-circle"></i>'
        : '<i class="bx bxs-chevron-down-circle"></i>'
    }</td>
    <td class="columnAction">
      <button onclick="deleteItem(${index})"><i class='bx bx-trash'></i></button>
    </td>
  `;

    tbody.appendChild(tr);
}





function loadItens() {
    items = getItensBD();
    tbody.innerHTML = "";
    items.forEach((item, index) => {
      insertItem(item, index);
    });
  
    getTotals();
  }
  


function getTotals() {
    const amountIncomes = items
      .filter((item) => item.type === "Entrada")
      .map((transaction) => Number(transaction.amount));
  
    const amountExpenses = items
      .filter((item) => item.type === "Saída")
      .map((transaction) => Number(transaction.amount));
  
    const totalIncomes = amountIncomes
      .reduce((acc, cur) => acc + cur, 0)
      .toFixed(2);
  
    const totalExpenses = Math.abs(
      amountExpenses.reduce((acc, cur) => acc + cur, 0)
    ).toFixed(2);
  
    const totalItems = (totalIncomes - totalExpenses).toFixed(2);
  
    incomes.innerHTML = totalIncomes;
    expenses.innerHTML = totalExpenses;
    total.innerHTML = totalItems;
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
