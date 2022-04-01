'use strict'; // não entendi ainda

// um objeto de array com varios jsons(JSON)
const images = [
    { 'id': '1', 'url':'./img/chrono.jpg' },
    { 'id': '2', 'url':'./img/inuyasha.jpg' },
    { 'id': '3', 'url':'./img/tenchi.jpg' },
    { 'id': '4', 'url':'./img/tenjhotenge.jpg' },
    { 'id': '5', 'url':'./img/yuyuhakusho.jpg' },
    { 'id': '6', 'url':'./img/ippo.png' },
]

const containerItems = document.querySelector('#container-items');// usa a classe container-items do html

const loadImages = ( images, container ) => { //função que recebe uma imagem e o container
   //pega as imagens recebidas e dar um forEach para varrear todas elas 
    images.forEach ( image => {//pega o container e adiciona a seu html
        //coloca a url do json da imagem
        // o + serve para concatenar com o anteriro, se não iria ficar sempre o último conteúdo
        container.innerHTML += `
            <div class='item'>
                <img src='${image.url}'
            </div>
        `
    })
}

loadImages( images, containerItems );

let items = document.querySelectorAll('.item');//pega todas as imagens(itens)

const previous = () => {
    const lastItem = items[items.length - 1];//pega o último item da lista
    containerItems.insertBefore( lastItem, items[0] ); // insere o último item antes do primeiro
    items = document.querySelectorAll('.item');// ler novamente a lista, atualiza
}
   

const next = () => {

    containerItems.appendChild(items[0]);//pega a prmeira imagem(item) do container e adiciona no final 
    items = document.querySelectorAll('.item');// atualiza de novo a lista
}
    


document.querySelector('#previous').addEventListener('click', previous);//chama o previous do html, manda escutar o click, e ao clicar chma a função previous
document.querySelector('#next').addEventListener('click', next);