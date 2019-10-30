function navbar() {
    //escreve o código da navbar no html
    document.write(`<ul>
                    <a href="index.html"><button class="logo">R+</button></a>
                    <li><a href="index.html">Página Inicial</a></li>
                    <li><a href="info.html">Como Separar</a></li>
                    <li><a href="aboutus.html">Sobre Nós</a></li>
                    <li><a href="suggestion.html">Sugestões</a></li>
                    </ul>`
    )
}

function populaLista() {
    var lista = new Array;

    //checa se o cache ta vazio, caso não esteja puxa o cache pra arraylist
    if (localStorage.getItem("listaLocais") != null) {
        /* conserta bug de JSON.parse colocar uma array dentro do primeiro elemento
           de outra array */
        let bug = new Array;
        //converte a String do JSON no localStorage pra array
        bug.push(JSON.parse(localStorage.getItem("listaLocais")));
        /* atribui à lista a array que estava no JSON 
            e foi atribuida ao primeiro elemento da variavel "bug" */
        lista = bug[0];
    }

    return lista;
}

function addItem() {
    var lista = new Array;
    lista = populaLista();

    //puxa os elementos dos campos digitados na página pra um objeto
    var obj = new Object;
    obj = {
        nomePessoa      : document.getElementById("inputNome").value,
        nomeLocal       : document.getElementById("inputLugar").value,
        endereco        : document.getElementById("inputCEP").value,
        info            : document.getElementById("comentario").value,

        plastico        : document.getElementById("plastico").checked,
        vidro           : document.getElementById("vidro").checked,
        metal           : document.getElementById("metal").checked,
        papel           : document.getElementById("papel").checked,
        bateria         : document.getElementById("bateria").checked,
        eletronicos     : document.getElementById("eletronicos").checked,
    }

    //manda o objeto pra arraylist
    lista.push(obj);

    //manda a arraylist pro cache      //converte a array pra String pro JSON do localStorage
    localStorage.setItem("listaLocais", JSON.stringify(lista));

    //gera Lista no Log do navegador
    console.log(lista);

    alert("Local armazenado com sucesso!");

    //atualiza a página pra gerar uma nova lista html
    location.reload(true);
}

//recebe parametros de posição e nome do local
function removeItem(index, local) {
    var lista = new Array;
    lista = populaLista();

    if (confirm(`Deseja mesmo remover ${local}?`)) {
        //remove 1 item, a partir da posição fornecida
        lista.splice(index, 1);

        //manda a arraylist pro cache      //converte a array pra String pro JSON do localStorage
        localStorage.setItem("listaLocais", JSON.stringify(lista));

        //gera Lista no Log do navegador
        console.log(lista);

        alert("Local removido com sucesso");

        //atualiza a página pra gerar uma nova lista html
        location.reload(true);
    } else {
        alert("O local não foi removido");
    }
}

//função de teste pra gerar a lista num código html
function listaHTML() {
    var lista = new Array;
    lista = populaLista();

    if (lista.length != 0) {

        //cria String que vai ser passado pro código html
        var html = `<br>
                    <input type="checkbox" id="spoiler"/>
                    <label for="spoiler">Lista de locais</label>
                    <div class="corpo spoiler" style="padding: 40px;">`
        html += "<h1>Lista de Locais</h1>";

        //passa por cada objeto da array e coloca as variaveis nessa String
        for (var i = 0; i < lista.length; i++) {
            html += "<b>Nome: </b>"             + lista[i].nomePessoa + "<br>";
            html += "<b>Estabelecimento: </b>"  + lista[i].nomeLocal  + "<br>";
            html += "<b>Endereço: </b>"         + lista[i].endereco   + "<br>";
            html += "<b>Tipos de Lixo: </b>";

            //checa se cada tipo de lixo foi marcado, se sim escreve ele na String
            if (lista[i].plastico) {
                html += `<img src="images/plastico.png"> Plástico || `;
            }
            if (lista[i].vidro) {
                html += `<img src="images/vidro.png"> Vidro || `;
            }
            if (lista[i].metal) {
                html += `<img src="images/metal.png"> Metal || `;
            }
            if (lista[i].papel) {
                html += `<img src="images/papel.png"> Papel || `;
            }
            if (lista[i].bateria) {
                html += `<img src="images/bateria.png"> Bateria || `;
            }
            if (lista[i].eletronicos) {
                html += `<img src="images/eletronicos.png"> Eletrônicos || `;
            }

            html += `<br>
                    <b>Descrição: </b>
                    <p style="margin-left: 30px;">${lista[i].info}</p>`;

            //constrói botão de deletar sugestão passando as váriaveis de posição no array e nome do local
            html += `<button class="btn btn-primary ml-2" 
                        onclick="removeItem(${i},'${lista[i].nomeLocal}')">
                            Recusar Sugestão
                     </button>`;
            html += "<br>____________________________________<br>";
        }
        html += "</div>"

        //escreve a String no html
        document.write(html);
    }
}