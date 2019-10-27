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

function populaLista(){
    var lista = new Array;

    //checa se o cache ta vazio, caso não esteja puxa o cache pra arraylist
    if (localStorage.getItem("listaLocais") != null) {
                   //converte a String do JSON no localStorage pra array
        lista.push(JSON.parse(localStorage.getItem("listaLocais")));
    }

    return lista;
}

function suggest() {
    var lista = new Array;
    lista = populaLista();

    //puxa os elementos dos campos digitados na página pra um objeto
    var obj = new Object;
    obj = {
        nomePessoa    : document.getElementById("inputNome").value,
        nomeLocal     : document.getElementById("inputLugar").value,
        endereco      : document.getElementById("inputCEP").value,
        info          : document.getElementById("comentario").value,
        
        plastico      : document.getElementById("plastico").checked,
        vidro         : document.getElementById("vidro").checked,
        metal         : document.getElementById("metal").checked,
        papel         : document.getElementById("papel").checked,
        bateria       : document.getElementById("bateria").checked,
        eletronicos   : document.getElementById("eletronicos").checked,
    }

    //manda o objeto pra arraylist
    lista.push(obj);

    //manda a arraylist pro cache      //converte a array pra String pro JSON do localStorage
    localStorage.setItem("listaLocais", JSON.stringify(lista));
    
    //gera Lista no Log do navegador
    for (var i = 0; i < lista.length; i++){
        console.log(lista[i]);
    }
    
    alert("Local armazenado com sucesso!");
}

//função de teste pra gerar a lista num código html
function listaHTML(){
    var lista = populaLista();

    var html = "<h1>Lista de Locais</h1> <br><br><p>"; 
    for (var i = 0; i < lista.length; i++){
        html += "Nome: "            + lista[i].nomePessoa + "<br>"
        html += "Estabelecimento: " + lista[i].nomeLocal  + "<br>"
        html += "Endereço: "        + lista[i].endereco   + "<br>"
        html += "Descrição: "       + lista[i].info       + "<br>"
        html += "Tipos de Lixo: <br>"
        
        if(lista[i].plastico){
            html+= "Plástico ||"
        }
        if(lista[i].vidro){
            html+= "Vidro ||"
        }
        if(lista[i].metal){
            html+= "Metal ||"
        }
        if(lista[i].papel){
            html+= "Papel ||"
        }
        if(lista[i].bateria){
            html+= "Bateria ||"
        }
        if(lista[i].eletronicos){
            html+= "Eletrônicos ||"
        }

        html += "____________________________________</p><br>";
    }

    document.write(html);
}