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

    //checa se o cache ta vazio, caso não esteja puxa o cache pra arraylist
    if (localStorage.getItem('listaLocais') != null) {
        lista.push(JSON.parse(localStorage.getItem('listaLocais')));
    }

    var obj = new Object;

    //puxa os elementos dos campos digitados na página pro objeto
    obj.nomePessoa = document.getElementById("inputNome").value;
    obj.nomeLocal  = document.getElementById("inputLugar").value;
    obj.endereco   = document.getElementById("inputCEP").value;
    obj.info       = document.getElementById("comentario").value;

    obj.plastico      = document.getElementById("plastico").checked;
    obj.vidro         = document.getElementById("vidro").checked;
    obj.metal         = document.getElementById("metal").checked;
    obj.papel         = document.getElementById("papel").checked;
    obj.bateria       = document.getElementById("bateria").checked;
    obj.eletronicos   = document.getElementById("eletronicos").checked;

    //manda o objeto pra arraylist
    lista.push(obj);

    //manda a arraylist pro cache
    localStorage.setItem('listaLocais', JSON.stringify(lista));
    
    // Gerar Lista no Log do navegador
    for (var i = 0; i < lista.length; i++){
        console.log(lista[i]);
    }
    
    alert('Local armazenado com sucesso!');
}

//função de teste pra gerar a lista num código html
function lista(){
    var lista = new Array;

    if (localStorage.getItem('listaLocais') != null) {
        lista.push(JSON.parse(localStorage.getItem('listaLocais')));
    }

    var html = '<h1>Lista de Locais</h1> <br><br><br>'; 

    for (var i = 0; i < lista.length; i++){
        let nomePessoa  = lista[i].nomePessoa;
        let nomeLocal   = lista[i].nomeLocal;
        let endereco    = lista[i].endereco;
        let info        = lista[i].info;
        let plastico    = lista[i].plastico;
        let vidro       = lista[i].vidro;
        let metal       = lista[i].metal;
        let papel       = lista[i].papel;
        let bateria     = lista[i].bateria;
        let eletronicos = lista[i].eletronicos;
        
        html += 'Nome: ' + nomePessoa + '<br>'
        html += 'Estabelecimento: ' + nomeLocal + '<br>'
        html += 'Endereço: ' + endereco + '<br>'
        html += 'Descrição: ' + info + '<br>'
        html += 'Tipos de Lixo: <br>'
        
        if(plastico){
            html+= 'Plástico ||'
        }
        if(vidro){
            html+= 'Vidro ||'
        }
        if(metal){
            html+= 'Metal ||'
        }
        if(papel){
            html+= 'Papel ||'
        }
        if(bateria){
            html+= 'Bateria ||'
        }
        if(eletronicos){
            html+= 'Eletrônicos ||'
        }

        html +=    '____________________________________<br>';
    }

    document.write(html);
}