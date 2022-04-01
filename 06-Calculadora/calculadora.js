'use strict';

const display = document.getElementById('display');// chamando o display do html
const numeros = document.querySelectorAll('[id*=tecla]'); //seleciona o elemento cujo o id é é parte do atributo tecla, ou seja seleciona todos os ids que começam com 'tecla'
const operadores = document.querySelectorAll('[id*=operador]');

let novoNumero = true;
let operador;
let numeroAnterior;


//função que verifica se o operador é diferente de undefined, se está vazio
const operacaoPendente = () => operador !== undefined;

const calcular = () => {
    if (operacaoPendente()){//se existir uma operação pendente
        const numeroAtual = parseFloat(display.textContent.replace(',','.'));//acha vírgula e troca por ponto
        novoNumero = true;
        const resultado = eval (`${numeroAnterior}${operador}${numeroAtual}`);//função que executa cálculos
        atualizarDisplay(resultado);
    }
}


// recebe um texto 
const atualizarDisplay = (texto) => {
    if (novoNumero){ //se fr um novo número, apenas colocamos na tela, não é pra concatenar
        display.textContent = texto.toLocaleString('BR');//traz o símbolo decimal usado no Brasil
        novoNumero = false; //deixa de ser um novo número
    }else{
        //insere o texto como conteúdo no display, além de concatenar os números (+=)
        display.textContent += texto.toLocaleString('BR');

    }
}

//manda para a função atualizarDisplay o texto que está dentro de cada tecla clicada
const inserirNumero = (evento) => atualizarDisplay(evento.target.textContent);

//como números é ujm array, um alista com valores, vamos pegar cada número dentro da lista e adicionar um evento de clique para eles e manda para a função inserirNumeros
//insere um evento em cada tecla 
numeros.forEach (numero => numero.addEventListener('click', inserirNumero));



//precisamos saber em qual operador se foi clicado, por isso recebemos o evento, e o target.textContent é a operação, 
//tipo, o evento de clique serve para que o target mostre o local de onde se clicou e o textContent é o que tem dentro do local clicado
const selecionarOperador = (evento) => {
    if (!novoNumero) {
        calcular();
        novoNumero = true;
        operador = evento.target.textContent;
        numeroAnterior = parseFloat(display.textContent.replace(',','.'));
    }
}
operadores.forEach (operador => operador.addEventListener('click', selecionarOperador));

const ativarIgual = () => {
    calcular();
    operador = undefined;
}
document.getElementById('igual').addEventListener('click', ativarIgual);

const limparDisplay = () => display.textContent = '';
document.getElementById('limparDisplay').addEventListener('click', limparDisplay);

const limparCalculo = () => {
    limparDisplay();
    operador = undefined;
    novoNumero = true;
    numeroAnterior = undefined;
}
document.getElementById('limparCalculo').addEventListener('click', limparCalculo);


//função para remover o último número
const removerUltimoNumero = () => display.textContent = display.textContent.slice(0, -1);//pega o mesmo display e fatia o array com o método slice(-1 é o último)
document.getElementById('backspace').addEventListener('click', removerUltimoNumero);

const inverterSinal = () => {
    novoNumero = true
    atualizarDisplay (display.textContent * -1);
}
document.getElementById('inverter').addEventListener('click', inverterSinal);



//função que pega display que é onde está meu texto,
// pega a propriedade textContent que é o valor que tá dentro do meu display
// e o indexOf vai procurar a string ',', se existir ele traz a posição dele, se não retorna -1
const existeDecimal = () => display.textContent.indexOf(',') !== -1;//existe decimal

//se o conteúdo for maior que 0, existe valor, se não ele tá vazio
const existeValor = () => display.textContent.length > 0;
const inserirDecimal = () => {
    if (!existeDecimal()){
        if (existeValor()){
            atualizarDisplay(',');
        }else{
            atualizarDisplay('0,');
        }
    }
}
document.getElementById('decimal').addEventListener('click', inserirDecimal);



//para funcionar pelo teclado


//criação de um objeto
const mapaTeclado = {
    '0'         : 'tecla0',//quando alguém digitar o '0' ele vai pro botão '0' que tem como id tecla0
    '1'         : 'tecla1',
    '2'         : 'tecla2',
    '3'         : 'tecla3',
    '4'         : 'tecla4',
    '5'         : 'tecla5',
    '6'         : 'tecla6',
    '7'         : 'tecla7',
    '8'         : 'tecla8',
    '9'         : 'tecla9',
    '/'         : 'operadorDividir',
    '*'         : 'operadorMultiplicar',
    '-'         : 'operadorSubtrair',
    '+'         : 'operadorAdicionar',
    '='         : 'igual',
    'Enter'     : 'igual',
    'Backspace' : 'backspace',
    'c'         : 'limparDisplay',
    'Escape'    : 'limparCalculo',
    ','         : 'decimal'
}



//
const mapearTeclado = (evento) => {
    const tecla = evento.key;//traz a chave do evento, que é a tecla que foi digitada

    // varre todas as chaves para ver se a tecla que foi digitada existe entre as chaves do objeto
    //pega o objeto e o método key extrai do objeto somente as chaves e me traz um array
    //ou seja, remove todos os valores das chaves e me traz apenas 0, 1 2...
    // de quem? do mapaTeclado
    //e no array retornado usamos o indexOf para verficar se existe a tecla
    //se o retorno for diferente de -1 é pq existe
    const teclaPermitida = () => Object.keys(mapaTeclado).indexOf(tecla) !== -1;

    //pega o elemento pelo id,mas que id?
    // vai no mapaTeclado e vai na posição onde tá atecla
    //por exemplo, se eu digitar 0, se a tecla for 0, ele vai no 0 e pega o id do 0 que é 'tecla0'
    //assim após mapear acionamos o evento click no elemento, que é a mesma coisa de estarmos clicando
    if (teclaPermitida())  document.getElementById(mapaTeclado[tecla]).click();
}
document.addEventListener('keydown', mapearTeclado);//captura as teclas do documento, quando pressionar a tecla chama a função mapearTeclado
