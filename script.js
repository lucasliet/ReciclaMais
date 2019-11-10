//escreve o código da navbar no html
var menu = `
    <nav class="navbar navbar-light menu navbar-expand-lg p-0 my-3 mx-2">
    <a class="ml-3 navbar-brand" href="index.html"><button class="logo">R+</button></a>
    <button class="mr-3 navbar-toggler border-0" type="button" data-toggle="collapse"
        data-target="#hamburguinho" aria-controls="hamburguinho" aria-expanded="false"
        aria-label="Alterna navegação">
        <span class="navbar-toggler-icon"></span>
    </button>

    <div class="collapse navbar-collapse" id="hamburguinho">
        <ul class="navbar-nav mx-auto">
            <li class="nav-item active">
                <a class="nav-link" href="index.html"">Página Inicial<span class=" sr-only">(página
                    atual)</span></a>
            </li>
            <li class="nav-item">
                <a class="nav-link" href="info.html">Como Separar</a>
            </li>
            <li class="nav-item">
                <a class="nav-link" href="aboutus.html">Sobre Nós</a>
            </li>
            <li class="nav-item">
                <a class="nav-link" href="suggestion.html">Sugestões</a>
            </li>
        </ul>
    </div>
    </nav>
    `    
document.getElementById('navbar').innerHTML = menu;

function populaLista() {
    var lista = new Array;

    //checa se o cache ta vazio, caso não esteja puxa o cache pra arraylist
    if (localStorage.getItem("cacheLocal") != null) {
        /* conserta bug de JSON.parse colocar uma array dentro do primeiro elemento
           de outra array */
        let bug = new Array;
        //converte a String do JSON no localStorage pra array
        bug.push(JSON.parse(localStorage.getItem("cacheLocal")));
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
            localStorage.setItem("cacheLocal", JSON.stringify(lista));
            
            //gera Lista no Log do navegador
            console.log(lista);
            
            alert("Local armazenado com sucesso!");
        } else {
            alert("Selecione ao menos um tipo de descarte");
        }
    }
}
        
//recebe parametros de posição e nome do local
function removeItem(posicao, nomeLocal) {
    var lista = new Array;
    lista = populaLista();

    if (confirm(`Deseja mesmo remover ${nomeLocal}?`)) {
        //remove 1 item, a partir da posição fornecida
        lista.splice(posicao, 1);

        //manda a arraylist pro cache      //converte a array pra String pro JSON do localStorage
        localStorage.setItem("cacheLocal", JSON.stringify(lista));

        //gera Lista no Log do navegador
        console.log(lista);

        //atualiza a página pra gerar uma nova lista html
        mostraLista();
    } else {
        alert("O local não foi removido");
    }
}

//remove todos os locais que foram selecionados no checkbox
function removeItens(){
    var lista = new Array;
    lista = populaLista();
    
    //passa por cada item da lista pra ver se algum foi marcado pra deletar
    for (var i = 0; i < lista.length; i++) {
        //checa se alguma caixa de seleção foi selecionada na lista
        if (document.getElementById(`check${i}`).checked){
            //Assim que chegar em alguma posição que foi selecionada, executa
            if (confirm("Tem certeza que deseja deletar todos os locais selecionados?")){
                //continua a passar pela lista
                while (i < lista.length) {
                    //se o item na posição for o mesmo marcado pra deletar, executa
                    if(document.getElementById(`check${i}`).checked){
                        //deleta 1 item com a posição que ta dentro do adeletar
                        lista.splice(i, 1);

                        //ja que uma posição foi deletada, volta o while uma posição
                        i--;
                    }
                    //passa pra próxima posição
                    i++;
                }

                //manda a arraylist pro cache      //converte a array pra String pro JSON do localStorage
                localStorage.setItem("cacheLocal", JSON.stringify(lista));

                //gera Lista no Log do navegador
                console.log(lista);
                
                       //atualiza a página pra gerar uma nova lista html
                return mostraLista();
            } else {
                //return finaliza a função
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
        var html = `<div class="container">
                    <div class="nossafonte"><h1>Lista de Sugestões</h1></div>`;

        //constroi botão de deletar várias sugestões
        html += `<button class="btn btn-primary m-2"
                    onclick="removeItens()">
                        Recusar Selecionadas
                </button>`;


        //passa por cada objeto da array e coloca as variaveis nessa String
        for (var i = 0; i < lista.length; i++) {
            html += "<div class='bg-light text-left rounded shadow p-3 m-3'>"
            html += "<div class='d-inline'>"
                    //cria caixa de seleção para marcar local a deletar usando a posição para diferenciaro id
            html += `<input type="checkbox" id="check${i}">`
            html += `<div class="form-group row">
                        <label class='col-sm-3'>
                            <b>Nome: </b> 
                        </label>
                        <div class='col-sm-9'> 
                            <div class='bg-white rounded border p-3'>${lista[i].nomePessoa}</div>
                        </div>
                    </div>`;
            html += `<div class="form-group row">
                        <label class='col-sm-3'> 
                            <b>Estabelecimento: </b> 
                        </label>
                        <div class='col-sm-9'>
                            <div class='bg-white rounded border p-3'>${lista[i].nomeLocal}</div>
                        </div>
                     </div>`;
            html += `<div class="form-group row">
                        <label class='col-sm-3'>
                            <b>Endereço: </b>
                        </label>
                        <div class='col-sm-9'>
                            <div class='bg-white rounded border p-3'>${lista[i].endereco}</div>
                        </div>
                    </div>`;
            html += `<div class="form-group row">
                        <label class='col-sm-3'>
                            <b>Número: </b>
                        </label>
                        <div class='col-sm-9'>
                            <div class='bg-white rounded border p-3'>${lista[i].numero}</div>
                        </div>
                    </div>`;
            html += `<div class="form-group row">
                        <label class='col-sm-3'>
                            <b>CEP: </b>
                        </label>
                        <div class='col-sm-9'>
                            <div class='bg-white rounded border p-3'>${lista[i].cep}</div>
                        </div>
                    </div>`;
            html += `<div class="form-group row">
                        <label class='col-sm-3'>
                            <b>Descrição: </b>
                        </label>
                        <div class='col-sm-9'>
                            <div class='bg-white rounded border p-3'>${lista[i].info}</div>
                        </div>
                    </div>`;
            html += `<div class="form-group row">
                        <label class='col-sm-3'> 
                            <b>Tipos de Lixo: </b>
                        </label>
                        <div class='col-sm-9 row'>`;

            //checa se cada tipo de lixo foi marcado, se sim escreve ele na String
            if (lista[i].plastico) {
                html += `<span class='bg-white p-1 m-1 rounded border img-16'>
                            <img src="images/plastico.png"> Plástico 
                         </span>`;
            }
            if (lista[i].vidro) {
                html += `<span class='bg-white p-1 m-1 rounded border img-16'>
                            <img src="images/vidro.png"> Vidro 
                        </span>`;
            }
            if (lista[i].metal) {
                html += `<span class='bg-white p-1 m-1 rounded border img-16'>
                            <img src="images/metal.png"> Metal 
                        </span>`;
            }
            if (lista[i].papel) {
                html += `<span class='bg-white p-1 m-1 rounded border img-16'>
                            <img src="images/papel.png"> Papel 
                        </span>`;
            }
            if (lista[i].bateria) {
                html += `<span class='bg-white p-1 m-1 rounded border img-16'>
                            <img src="images/bateria.png"> Bateria 
                        </span>`;
            }
            if (lista[i].eletronicos) {
                html += `<span class='bg-white p-1 m-1 rounded border img-16'>
                            <img src="images/eletronicos.png"> Eletrônicos 
                        </span>`;
            }
            html += "</div>"; //fecha col-sm-9
            html += "</div>"; //fecha form-group
            
            html += "</div>"; //fecha inline

            //constrói botão de deletar sugestão passando as váriaveis de posição no array e nome do local
            html += `<div class="text-right">
                        <button class="btn btn-primary" 
                            onclick="removeItem(${i},'${lista[i].nomeLocal}')">
                                Recusar Sugestão
                        </button>
                     </div>`;
            html += "</div>"; //fecha bg
        }
        
        //retorna a String com o código html da lista completa
        return html;
    } else { //se estiver vazia, exibe isso
        return '<div class="nossafonte"><h1 style="margin-top:15%;"> Não há nenhuma sugestão ainda :( </h1></div>'
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
    ${listaHTML()}

    <script type="text/JavaScript" src="script.js"></script>
    <script src="bootstrap/jquery-3.3.1.slim.min.js"></script>
    <script src="bootstrap/popper.min.js"></script>
    <script src="bootstrap/bootstrap.min.js"></script>
    `
}