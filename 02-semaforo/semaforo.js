
const img = document.getElementById('img');

const buttons = document.getElementById('buttons');

let colorIndex = 0; //contador

let intervalId = null;



const trafficLight = ( event ) => {

    stopAutomatic();

    turnOn[event.target.id](); //forma com que chamamos um método de um objeto. O event.target,id é para mostrar exatamente onde clicamos
}


const nextIndex = () => colorIndex = colorIndex < 2 ? ++colorIndex : 0; // operador ternário do if


const changeColor = () => {
    const colors = ['red', 'yellow', 'green'] //colors é um array de cores
    const color = colors [colorIndex]; //color recebe o elemento que está na posição do index 
    turnOn[color](); //chama função para ligar de a acordo com a cor
    nextIndex(); //chama a função que implementa o contador 


}

const stopAutomatic = () => {
    clearInterval (intervalId); //função que recebe a variável que recebe o id da função do tempo

}


const turnOn = {//criação de um objeto que tem como função ligar

    'red':      () => img.src = './img/vermelho.png', //método do objeto
    'yellow':   () => img.src = './img/amarelo.png',//método do objeto
    'green':    () => img.src = './img/verde.png',//método do objeto
    'automatic': () => intervalId = setInterval( changeColor, 1000 )//método do objeto que retorna uma variável que recebe a cor que será usada a cada 1 segundo

}

buttons.addEventListener('click', trafficLight); // adiciona um evento aos botões, que a cada clique será chamada a função trafficLight para ligar a opção clicada

/*
const img = document.getElementById( 'img' );
const buttons = document.getElementById( 'buttons' );
let colorIndex = 0;
let intervalId = null;

const trafficLight = ( event ) => {
    stopAutomatic();
    turnOn[event.target.id]();
}

const nextIndex = () => colorIndex = colorIndex < 2 ? ++colorIndex : 0;

const changeColor = () => {
    const colors = ['red','yellow','green']
    const color = colors[ colorIndex ];
    turnOn[color]();
    nextIndex();
}

const stopAutomatic = () => {
    clearInterval ( intervalId );
}

const turnOn = {
    'red':      () => img.src = './img/vermelho.png',
    'yellow':   () => img.src = './img/amarelo.png',
    'green':    () => img.src = './img/verde.png',
    'automatic': () => intervalId = setInterval( changeColor, 1000 )
}

buttons.addEventListener('click', trafficLight );
*/
