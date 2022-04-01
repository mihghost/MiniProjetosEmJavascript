'use strict';

let banco = [];

//pegar do banco de dados
const getBanco = () => JSON.parse(localStorage.getItem ('todoList')) ?? [];//se não tiver o item getItem no localStorage, se ele estiver vazio, paasa um array vazio []
    //ou seja, se já tiver alguma coisa no localStorage chamada todoList, pega ele, se não, pega um array vazio
    //lembrando que o get recebe com string então temos que passar para forma de JSON

    //para enviar transformamos em string, para receber transformamos de volta em JSON


const setBanco = (banco) => localStorage.setItem ('todoList', JSON.stringify(banco));//atualiza o banco





//Para se criar um item de forma estática no HTML fazemos pela forma:

/* <label class = "todo__item">
<imput type = "checkbox">
<div>teste de item 1</div>
<imput type = "buttom" value = "X">
</label>
*/

//Em início, lá no HTML temos um label onde teremos nossos itens da lista
// e esse label tem uma classe e um id
//sendo class = "todo__item"> id='todoList'>
//então temos que criar isso de forma dinâmica

function criarItem(tarefa, status, indice) {
    const item = document.createElement('label'); //Cria no documento um elemento de tipo label


    //Agora que criamos o label, antes de inserir no Domm, o label tem ma classe, então
    item.classList.add('todo__item'); //pegamos o item que acabei de criar e acessamos a propriedade


    //classList que tem um método para adicionar classes, então adicionamos a classe "todo__item"
    //queremos colocar mais elementos dentro do item, então usamos o innerHTML
    item.innerHTML = `
        <input type="checkbox" ${status} data-indice=${indice}> 
        <div>${tarefa}</div>
        <input type="button" value="X" data-indice=${indice}>
    `;
    //data-indice é uma propriedade feita para o JSON, ele sempre coemça com data- o nome que você quiser dar
    //No documento pegamos o elemento pai, o que vai conter essa label e adicionamos um filho
    //ou seja, o item que acabamos de criar
    document.getElementById('todoList').appendChild(item);
}

const limparTarefas = () => {
    //pega o elemento pai, que no caso é o todoList, 
    const todoList = document.getElementById('todoList');

    //enquanto existir o primeiro filho do todoList, ou seja, enquanto tiver itens
    //no todoList ele remove os filhos, e nesse caso será sempre o último filho a ser removido
    while (todoList.firstChild) {
        todoList.removeChild(todoList.lastChild);
    }
}

const atualizarTela = () => {//atualiza a tela de acordo com os dados no banco de dados
    limparTarefas();
    const banco = getBanco(); 
    
    //pega um item, manda pro criarItem, manda o tem, mas só a tarefa do item, manda o status também e o indice do item
    banco.forEach ( (item, indice) => criarItem (item.tarefa, item.status, indice));
}

const inserirItem = (evento) => {//tem como parâmetro o evento capturado pelo addEventListener

    //tem que verificar se a tecla [e Enter para poder agir
    const tecla = evento.key;//para saber a tecla que foi digitada
    const texto = evento.target.value;//aqui pegamos o evento e seu alvo e sxeu valor, ou seja, o valor contido no alvo do evento
    if (tecla === 'Enter'){//se a tecla for Enter
        const banco = getBanco();//recebe o retorno da função que pega dados no localStorage
        banco.push ({'tarefa': texto, 'status': ''});//adiciona o objeto no final do array
        setBanco(banco);//envia os novos dados para o localStorage
        atualizarTela();
        evento.target.value = '';//limpa o que foi digitado na caiza de texto
    }
}

const removerItem = (indice) => {
    const banco = getBanco();
    banco.splice (indice, 1);//pega o banco e recorta o array, remove a partir do indice que foi recebido, neste caso a partir do indice 1 que é ele próprio
    setBanco(banco);
    atualizarTela();
}

const atualizarItem = (indice) => {
    const banco = getBanco();

    //pega o banco, o índice correto e modifica o status
    //se o status estiver marcado ele desmarca e desmarcado ele marca

    banco[indice].status = banco[indice].status === '' ? 'checked' : '';//se o status estiver igual a vazio ele marca, se não ele desmarca
    setBanco(banco);
    atualizarTela();
}


//Queremos saber onde foi clicado
const clickItem = (evento) => {//recebe o evento de click
    const elemento = evento.target;//pega o elemento onde foi clicado
    console.log (elemento.type);
    if (elemento.type === 'button') {//se o tipo do elemento for igual a 
        const indice = elemento.dataset.indice;//pegamos o indice do elemento que estamos no momento
        removerItem (indice);
    }else if (elemento.type === 'checkbox') {
        const indice = elemento.dataset.indice;
        atualizarItem (indice);
    }
}

document.getElementById('newItem').addEventListener('keypress', inserirItem);//Ao pressionar uma tecla chamamos a função inserirItem
document.getElementById('todoList').addEventListener('click', clickItem);

atualizarTela();