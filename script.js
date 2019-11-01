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

function removeItens(){
    var lista = new Array;
    lista = populaLista();
    //passa por cada item da lista pra ver se algum foi marcado pra deletar
    for (var i = 0; i < lista.length; i++) {
        //checa se alguma caixa de seleção foi selecionada na lista
        if(document.getElementById(`check${i}`).checked){
            //Assim que chegar em alguma posição que foi selecionada, executa
            if(confirm("Tem certeza que deseja deletar todos os locais selecionados?")){
                //passa por cada item da lista novamente
                for (var i = 0; i < lista.length; i++) {
                    //se o item da posição for o mesmo marcado pra deletar, executa
                    if(document.getElementById(`check${i}`).checked){
                        console.log(lista)
                        //deleta 1 item na posição marcada
                        lista.splice(i, 1);
                    }
                }
                //manda a arraylist pro cache      //converte a array pra String pro JSON do localStorage
                localStorage.setItem("listaLocais", JSON.stringify(lista));

                //gera Lista no Log do navegador
                console.log(lista);

                alert('Locais removidos com sucesso');
                
                //atualiza a página pra gerar uma nova lista html
                location.reload(true);
            } else {
                //return garante que a função vai ser parada invés de continuar o primeiro for em cada item
                return alert('Nenhum local foi removido!');
            }
        }
    }
    //caso o for percorra toda a lista e nenhum item dela foi selecionado, exibe
    alert('Algum local deve ser marcado para ser deletado')
}

//função de teste pra gerar a lista num código html
function listaHTML() {
    var lista = new Array;
    lista = populaLista();
    
    //checa se a lista não ta vazia
    if (lista.length != 0) {
        //cria String que vai ser passado pro código html
        var html = "<h1>Lista de Sugestões</h1>";

        //constroi botão de deletar várias sugestões
        html += `<button class="btn btn-primary" style="margin:10px;"
                    onclick="removeItens()">
                        Recusar Sugestões Selecionadas
                </button>`;


        //passa por cada objeto da array e coloca as variaveis nessa String
        for (var i = 0; i < lista.length; i++) {
            html += "<div class='lista'>"
            html += "<div class='form-check-inline'>"
                    //cria caixa de seleção para marcar local a deletar usando a posição para diferenciaro id
            html += `<input type="checkbox" id="check${i}">`
            html += '<div>'
            html += "<b>Nome: </b>"             + lista[i].nomePessoa + "<br>";
            html += "<b>Estabelecimento: </b>"  + lista[i].nomeLocal  + "<br>";
            html += "<b>Endereço: </b>"         + lista[i].endereco   + "<br>";
            html += `<b>Tipos de Lixo: </b>
                     <p style="margin-left: 28px;">`;

            //checa se cada tipo de lixo foi marcado, se sim escreve ele na String
            if (lista[i].plastico) {
                html += `<span class='descarte'><img src="images/plastico.png"> Plástico </span>`;
            }
            if (lista[i].vidro) {
                html += `<span class='descarte'><img src="images/vidro.png"> Vidro </span>`;
            }
            if (lista[i].metal) {
                html += `<span class='descarte'><img src="images/metal.png"> Metal </span>`;
            }
            if (lista[i].papel) {
                html += `<span class='descarte'><img src="images/papel.png"> Papel </span>`;
            }
            if (lista[i].bateria) {
                html += `<span class='descarte'><img src="images/bateria.png"> Bateria </span>`;
            }
            if (lista[i].eletronicos) {
                html += `<span class='descarte'><img src="images/eletronicos.png"> Eletrônicos </span>`;
            }

            html += `</p>
                    <b>Descrição: </b>
                    <p style="margin-left: 30px;">${lista[i].info}</p>`;

            //constrói botão de deletar sugestão passando as váriaveis de posição no array e nome do local
            html += `<button class="btn btn-primary" 
                        onclick="removeItem(${i},'${lista[i].nomeLocal}')">
                            Recusar Sugestão
                     </button>`;
            html += "</div>";
            html += "</div>";
            html += "</div>";
        }
        
        //escreve a String no html
        document.write(html);
    } else { //se estiver vazia, exibe isso
        document.write('<h1 style="margin-top:15%;"> Não há nenhuma sugestão ainda :( </h1>')
    }
}