'use strict';

//criação de um JSON
const sons = {
    'A': 'boom.wav', //CHAVE ---- VALOR
    'S': 'clap.wav',
    'D': 'hihat.wav',
    'F': 'kick.wav',
    'G': 'openhat.wav',
    'H': 'ride.wav',
    'J': 'snare.wav',
    'K': 'tink.wav',
    'L': 'tom.wav'
}

const criarDiv = (texto) => { //função para criar dics, que recebe um texto que irá ficar dentro da div
    const div = document.createElement('div');//cria uma div
    div.classList.add('key');//nome dado a classe no html
    div.textContent = texto; //o conteúdo da div ser´qa o texto recebido como parâmetro
    div.id = texto; // damos um id para identificá-lo, e será o valor do texto que será uma tecla, então o id é uma letra que será digitada 
   //precisamos inserir essa div no DOM, então pegamos onde iremos inserir e aficionamos ele
    document.getElementById('container').appendChild(div);// inserimos no container e adicionamos a div como um filho
}

//Precisamos pegar todas as chaves do JSON, se pegarmos o objeto sons, pegaremos tudo, mas só queremos a chave
const exibir = (sons) => Object.keys(sons).forEach(criarDiv); //então pegamos o obejto, keys e passamos para ele o objeto sons
//isso irá nos retornar um array com todas as keys 
//após isso fazemos um forEach que irá varrer todos os elementos desse array
// e esse array são todas as letras, e pegará cada letra e criará uma div
//então cada elemento que ele pegar ele ira mandar para a função criar div, que recebe um texto


const tocarSom = (letra) => {//recebe como paraêmetro a letra que quero tocar
    //como não temos a tag Áudio no html, precisamos criá-la aqui com o New Audio
    const audio = new Audio(`./sounds/${sons[letra]}`);//variável recebe a tag Áudio com o endereço do som na posição da letra recebida como parâmetro
    audio.play();//toca o som
}


//função do efeito que recebe uma letra
const adicionarEfeito = (letra) => document.getElementById(letra)//pega o id da letra depois pegamos a letra e e a lista de suas classes e adicionamos mais uma, a active que foi a que nós criamos
                                           .classList.toggle('active');

const removerEfeito = (letra) => {//remove o efeito na letra
    const div = document.getElementById(letra);
    const removeActive = () => div.classList.remove('active');
    div.addEventListener('transitionend',removeActive);//pede pra esperar o efeito de transição acabar para poder remover a classe de efeito
};

//função com propósito de tocar o som, e primeiramente temos que saber onde eu cliquei
const ativarDiv = (evento) => {//recebe o evento que aconteceu
    //o target. id nos informa o id de onde clicamos

    const letra = evento.type == 'click' ? evento.target.id : evento.key.toUpperCase(); //se o tipo de evento for clique use o target.id, se não use o evento.key
    
    const letraPermitida = sons.hasOwnProperty(letra); //pega o som que meu objeto e verifica se tem a propriedade, ou seja verifica se tem a letra clicada, retorna verdadeiro quando tem e falso quando clico fora da div
    //como não queremos que funcione ao clicar no container, fora da div, devemos fazer uma validação
    if (letraPermitida){
        adicionarEfeito(letra);//adiciona o efeito de aumentar as letras ao clicar
        tocarSom(letra);//toca o som referente a letra que eu cliquei
        removerEfeito(letra);
    }
}


exibir(sons);
document.getElementById('container')//obeserva o clique e chama a função , então quando tocar no container irá ativar a div
        .addEventListener('click', ativarDiv);// passa para a função o evento que aconteceu

window.addEventListener('keyup',ativarDiv);//pega o evento ao clicar na tecla ou pressionar 