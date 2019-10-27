function navbar() {
    document.write(`<ul>
    <a href="index.html"><button class="logo">R+</button></a>
    <li><a href="index.html">Página Inicial</a></li>
    <li><a href="info.html">Como Separar</a></li>
    <li><a href="aboutus.html">Sobre Nós</a></li>
    <li><a href="suggestion.html">Sugestões</a></li>
    </ul>`
    )
}

function suggest() {
    var lista = new Array;

    if (localStorage.getItem('listaLocais') != null) {
        lista.push(JSON.parse(localStorage.getItem('listaLocais')));
    }

    var obj = new Object;

    obj.nomePessoa = document.getElementById("inputNome").value;
    obj.nomeLocal  = document.getElementById("inputLugar").value;
    obj.endereco   = document.getElementById("inputCEP").value;
    obj.info       = document.getElementById("comentario").value;

    alert('Seu nome é: ' + obj.nomePessoa);

    lista.push(obj);

    localStorage.setItem('listaLocais', JSON.stringify(lista));

    alert('Local armazenado com sucesso!');
}