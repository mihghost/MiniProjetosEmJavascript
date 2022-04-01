'use strict'

const openModal = () => document.getElementById('modal')
    .classList.add('active')

const closeModal = () => {
    clearFields()
    document.getElementById('modal').classList.remove('active')
}


const getLocalStorage = () => JSON.parse(localStorage.getItem('db_client')) ?? [] //se não tiver nada no LocalStorage retorna um array vazio, aqui também passamos os dados string para JSON
const setLocalStorage = (dbClient) => localStorage.setItem("db_client", JSON.stringify(dbClient))

// CRUD - create read update delete
const deleteClient = (index) => {//recebe como parâmetro o index, que é a posição que queremos deletar
    const dbClient = readClient()//ler os dados do cliente e passa para a variável dbClient que é um vetor
    dbClient.splice(index, 1)//como a variável é um vetor, podemos fatiá-lo, ou seja pegamos o vetor à partir do index e excluímos o primeiro depois disso, ou seja, vai excluir ele mesmo
    setLocalStorage(dbClient)//atualiza o banco de dados pois o cliente foi excluído
}

//como saber qual cliente vamos editar?
//precisamos do índice
//função que recebe o cliente e o index
const updateClient = (index, client) => {
    const dbClient = readClient()//pega os dados do banco ler e coloca em uma variável
    //como sabemos que o banco de dados é um array
    dbClient[index] = client//acessamos o banco de dados na posição do índice do parâmetro e colocamos o cliente que recebemos lá dentro
    setLocalStorage(dbClient)//manda os dados atualizados para o banco
}

const readClient = () => getLocalStorage()

const createClient = (client) => {
    const dbClient = getLocalStorage()//tem que ler o que tem dentro do LocalStorage, ou seja, ler o banco que já tem e adiciona um novo cliente
    dbClient.push (client)//método para adicionar um elemento dentro de um array, então ele envia o client para dentro do array criado, ou seja, adiciona o novo cliente que chegou como parâmetro
    setLocalStorage(dbClient)//envia todos os dados do array para o LocalStorage
}

const isValidFields = () => {//verifica se os dados foram preenchidos
    //No html colocamos que esses dados são required, ou seja, são obrigatórios
    return document.getElementById('form').reportValidity()//pega o formulário e usa o método de validação que retorna verdadeiro se todos os campos forem preenchidos
    //retorna falso ou verdadeiro
}

//Interação com o layout

const clearFields = () => {
    const fields = document.querySelectorAll('.modal-field')//traz um array com todos os campos
    //como vai vir em um array, podemos usar o forEach, que vai varrer campo por campo
    fields.forEach(field => field.value = "")// para cada campo pega o valor dele e iguala à vazio
    document.getElementById('nome').dataset.index = 'new'
}

const saveClient = () => {
    debugger
    if (isValidFields()) {//se os campos forem válidos
        const client = {//client é um JSON
            nome: document.getElementById('nome').value,//o nome vem do campo cujo o id é nome e pegamos o valor desse campo
            email: document.getElementById('email').value,
            celular: document.getElementById('celular').value,
            cidade: document.getElementById('cidade').value
        }
        const index = document.getElementById('nome').dataset.index//atributo especial data chamado new no html, então pegamos o dataset 
        if (index == 'new') {//se o index for igual a new é porque é um novo cliente
            createClient(client)
            updateTable()
            closeModal()
        } else {//se não, é porque vamos editar
            updateClient(index, client)
            updateTable()
            closeModal()
        }
    }
}

const createRow = (client, index) => {//tem como parâmetro o cliente mandado pelo forEach e o index de cada elemento
    const newRow = document.createElement('tr')//cria o elemento linha na memória
    //insere esses dados dentro da tr criada
    //pega o edit e delete de cada índice
    newRow.innerHTML = `
        <td>${client.nome}</td>
        <td>${client.email}</td>
        <td>${client.celular}</td>
        <td>${client.cidade}</td>
        <td>
            <button type="button" class="button green" id="edit-${index}">Editar</button>
            <button type="button" class="button red" id="delete-${index}" >Excluir</button>
        </td>
    `
    document.querySelector('#tableClient>tbody').appendChild(newRow)//pega o id que dentro dele tem um tbody, adiciona um filho a esse tbody, que filho é esse? O newRow que acabamos de criar
    //Agora o newRow faz parte do html, do DOM
}

const clearTable = () => {
    const rows = document.querySelectorAll('#tableClient>tbody tr')//pega todas as tr que estão dentro do tbody que estão dentro de #tableClient
    rows.forEach(row => row.parentNode.removeChild(row))//pega a linha. pega o pai da linha, ou seja, manda a linha pegar o pai e remover seu filho, que no caso é ela mesma
}

const updateTable = () => {
    const dbClient = readClient()//ler os dados do localStrage
    clearTable()
    dbClient.forEach(createRow)//pega cada cliente do localStorage e encia para a função createRow, porque cada um dos clientes tem que ser uma linha
}

const fillFields = (client) => {//preenche os campos do cliente recebido
    document.getElementById('nome').value = client.nome
    document.getElementById('email').value = client.email
    document.getElementById('celular').value = client.celular
    document.getElementById('cidade').value = client.cidade
    document.getElementById('nome').dataset.index = client.index//quando clicamos em editar mandamos o index do cliente, que agora deixa de ser new
}



const editClient = (index) => {//recebe o índice do cliente que queremos editar
    const client = readClient()[index]//pega o cliente do índice dado
    client.index = index
    fillFields(client)
    openModal()
}
//Como sabemos qual botão de editar foi clicado?
//temos que capturar o evento no pai deles
const editDelete = (event) => {
    //para saber onde foi clicado => event.target e queremos só os do tipo button
    if (event.target.type == 'button') {

        //precisamos saber se é o botão de deletar ou editar

        //sabemos que o id nesse caso vai ser dividido em dois pedaços, primeiro a ação e segundo o índie que queremos trabalhar
        const [action, index] = event.target.id.split('-')//tranforma em um array separado pelo traço que terá duas posições, a primeira posição é colocada dentro da variável acção e a segunda na variável index

        if (action == 'edit') {//se ação for edit
            editClient(index)
        } else {
            const client = readClient()[index]
            const response = confirm(`Deseja realmente excluir o cliente ${client.nome}`)
            if (response) {
                deleteClient(index)
                updateTable()
            }
        }
    }
}

updateTable()

// Eventos
document.getElementById('cadastrarCliente')
    .addEventListener('click', openModal)

document.getElementById('modalClose')
    .addEventListener('click', closeModal)

document.getElementById('salvar')
    .addEventListener('click', saveClient)//salva o cliente ao escutar o clique

document.querySelector('#tableClient>tbody')//pega o seu pai, o que tem o id #tableClient, que dentro dele tem o tbody, escuta o clique e chama a função editDelete
    .addEventListener('click', editDelete)

document.getElementById('cancelar')
    .addEventListener('click', closeModal)