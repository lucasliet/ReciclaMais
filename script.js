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
    var obj = new Object;

    obj.nomePessoa = document.getElementById("inputNome").value;
    obj.nomeLocal  = document.getElementById("inputLugar").value;
    obj.endereco   = document.getElementById("inputCEP").value;
    obj.info       = document.getElementById("comentario").value;

    alert(obj.nomePessoa);
    
    localStorage.setItem('dados',obj);
}