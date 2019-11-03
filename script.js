//escreve o código da navbar no html
var menu = `
            <ul>
            <a href="index.html"><button class="logo">R+</button></a>
            <li><a href="index.html">Página Inicial</a></li>
            <li><a href="info.html">Como Separar</a></li>
            <li><a href="aboutus.html">Sobre Nós</a></li>
            <li><a href="suggestion.html">Sugestões</a></li>
            </ul>
            `    
document.getElementById('navbar').innerHTML = menu;

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
    //Checa se o usuário digitou todos os campos requeridos
    if (document.getElementById("inputNome").value      &&
        document.getElementById("inputLugar").value     &&
        document.getElementById("inputEndereco").value  &&
        document.getElementById("inputNumero").value    &&
        document.getElementById("inputCEP").value){
        //checa se o usuário marcou ao menos um tipo de descarte
        if(document.getElementById("plastico").checked ||
           document.getElementById("vidro").checked    ||
           document.getElementById("metal").checked    ||
           document.getElementById("papel").checked    ||
           document.getElementById("bateria").checked  ||
           document.getElementById("eletronicos").checked){

            var lista = new Array;
            lista = populaLista();
            
            //puxa os elementos dos campos digitados na página pra um objeto
            var obj = new Object;
            obj = {
                nomePessoa      : document.getElementById("inputNome").value,
                nomeLocal       : document.getElementById("inputLugar").value,
                endereco        : document.getElementById("inputEndereco").value,
                numero          : document.getElementById("inputNumero").value,
                cep             : document.getElementById("inputCEP").value,
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
        } else {
            alert("Selecione ao menos um tipo de descarte");
        }
    }
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
        mostraLista();
    } else {
        alert("O local não foi removido");
    }
}
//////////////////// AINDA NÃO FUNCIONA ///////////////////
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
                    var adeletar = new Array;
                    
                    //se o item da posição for o mesmo marcado pra deletar, executa
                    if(document.getElementById(`check${i}`).checked){
                        //pega quais vão ser as opções que devem ser deletadas e coloca num array
                        adeletar.push(i);
                    }
                }
                //passa por toda a lista adeletar
                for (var i = 0; i < adeletar.length; i++) {
                    //deleta 1 item com a posição que ta dentro do adeletar
                    lista.splice(adeletar[i], 1);
                }
                //manda a arraylist pro cache      //converte a array pra String pro JSON do localStorage
                localStorage.setItem("listaLocais", JSON.stringify(lista));

                //gera Lista no Log do navegador
                console.log(lista);

                alert('Locais removidos com sucesso');
                
                //atualiza a página pra gerar uma nova lista html
                mostraLista();
            } else {
                //return garante que a função vai ser parada invés de continuar o primeiro for em cada item
                return alert('Nenhum local foi removido!');
            }
        }
    }
    //caso o for percorra toda a lista e nenhum item dela foi selecionado, exibe
    alert('Algum local deve ser marcado para ser deletado');
}

//gera o código html que vai ser usado para a lista
function listaHTML() {
    var lista = new Array;
    lista = populaLista();
    
    //checa se a lista não ta vazia
    if (lista.length != 0) {
        //cria String que vai ser passado pro código html
        var html = `<div class="container nossafonte">
                    <h1>Lista de Sugestões</h1>`;

        //constroi botão de deletar várias sugestões
        html += `<button class="btn btn-primary" style="margin:10px;"
                    onclick="removeItens()">
                        Recusar Selecionadas
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
            html += "<b>Número: </b>"           + lista[i].numero   + "<br>";
            html += "<b>CEP: </b>"              + lista[i].cep   + "<br>";
            html += `<b>Tipos de Lixo: </b>
                     <p style="margin-left: 28px;">`;

            //checa se cada tipo de lixo foi marcado, se sim escreve ele na String
            if (lista[i].plastico) {
                html += `<span class='lixoicon'><img src="images/plastico.png"> Plástico </span>`;
            }
            if (lista[i].vidro) {
                html += `<span class='lixoicon'><img src="images/vidro.png"> Vidro </span>`;
            }
            if (lista[i].metal) {
                html += `<span class='lixoicon'><img src="images/metal.png"> Metal </span>`;
            }
            if (lista[i].papel) {
                html += `<span class='lixoicon'><img src="images/papel.png"> Papel </span>`;
            }
            if (lista[i].bateria) {
                html += `<span class='lixoicon'><img src="images/bateria.png"> Bateria </span>`;
            }
            if (lista[i].eletronicos) {
                html += `<span class='lixoicon'><img src="images/eletronicos.png"> Eletrônicos </span>`;
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
        
        //retorna a String com o código html da lista completa
        return html;
    } else { //se estiver vazia, exibe isso
        return '<h1 style="margin-top:15%;"> Não há nenhuma sugestão ainda :( </h1>'
    }
}

//sobrepõe o body da página com a lista de sugestões
function mostraLista() {
    document.body.innerHTML = `
    <header>
    <nav class="menu">
        <div class="bootstrapnavfix">${menu}</div>
    </nav>
    </header>
    <div class="corpo">${listaHTML()}</div>

    <script type="text/JavaScript" src="script.js"></script>
    <script src="bootstrap/jquery-3.3.1.slim.min.js"></script>
    <script src="bootstrap/popper.min.js"></script>
    <script src="bootstrap/bootstrap.min.js"></script>
    `
}