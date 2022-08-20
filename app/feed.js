let feed = [
    {
        "id": 1,
        "titulo": "titulo 1",
        "texto": "texto 1 <br>texto 1213",
        "imagem": "img/cafe.jpg",
        "idusuario": "1"
    },
    {
        "id": 2,
        "titulo": "titulo 2",
        "texto": "texto 2",
        "imagem": "img/cafe2.jpg",
        "idusuario": "1"
    },
    {
        "id": 3,
        "titulo": "titulo 3",
        "texto": "texto 3",
        "imagem": "img/cafe2.jpg",
        "idusuario": "2"
    },
    {
        "id": 4,
        "titulo": "titulo 4",
        "texto": "texto 4",
        "imagem": "img/cafe2.jpg",
        "idusuario": "3"
    },
    {
        "id": 5,
        "titulo": "titulo 5",
        "texto": "texto 5",
        "idusuario": "1"
    },
    {
        "id": 6,
        "titulo": "titulo 6",
        "texto": "texto 6"
    }

]

function imprimeFeed(id, pesquisa) {

    var feedFiltrado = feed.filter(function (el) {
        return el.idusuario == id || el.idusuario == undefined;
    })
    document.getElementById('postsFeed').innerHTML = ""
    console.log(pesquisa)
    for (var index = 0; index < feed.length; index++) {
        var post = ""
        console.log(feedFiltrado[index].titulo)
        if (feed[index].texto.includes(pesquisa) || feed[index].titulo.includes(pesquisa) || pesquisa == undefined) {
            post = "<div class='posts'> <h1>" + feedFiltrado[index].titulo + "</h1>" +
                "<h3>" + feedFiltrado[index].texto + "</h3>         <br>    <input id='comentario'> <br> <button id='botaoComentar'>Comentar</button><br></div>"
            console.log(feedFiltrado[index].texto)
            if (feedFiltrado[index].imagem != undefined) {
                post = "<div class='posts'> <h1>" + feedFiltrado[index].titulo + "</h1>" +
                    "<h3>" + feedFiltrado[index].texto + "</h3>" +
                    "<img src='" + feedFiltrado[index].imagem + "'</img>   <br>  <input id='comentario'> <br> <button id='botaoComentar'>Comentar</button><br></div>"
            }
            document.getElementById('postsFeed').innerHTML += post;
        }
    }
    recuperaCotacoesMap()
}

function recuperaCotacoesMap() {
    texto = ""
    tipo = "Cotacao"
    console.log('co')
    const div = document.getElementById("texto");
    fetch('https://prod-110.westus.logic.azure.com/workflows/e50f80756b9b43baa71d055fbee3d9c6/triggers/manual/paths/invoke/tipo/' + tipo + '?api-version=2016-06-01&sp=%2Ftriggers%2Fmanual%2Frun&sv=1.0&sig=MUPtVkRaZGh1maM7uzFu2cmmaebhC1aKvLcfMfhirw0', options)
        .then(response => {
            response.json()

                .then(data => {
                    const lista_cotacao = data.value;

                    lista_cotacao.map((dado) => {
                        texto += `Data: ${formataData(dado.Data)} - R$ ${(dado.Valor.replace(".", ","))} `

                    }

                    )

                    div.innerHTML += `<marquee>  ${texto} </marquee>`

                })

        })
        .catch(e => {
            console.log("ERRO: " + e)
        })


}
function imprimeFeedBoot(id, pesquisa) {

    var feedFiltrado = feed.filter(function (el) {
        return el.idusuario == id || el.idusuario == undefined;
    })
    document.getElementById('postsFeed').innerHTML = ""
    console.log(feedFiltrado)
    if (feedFiltrado == undefined)
    {
        feedFiltrado = feed
    }
    console.log(feedFiltrado)
    for (var index = 0; index < feed.length; index++) {
        var post = ""
        
        if (feedFiltrado[index].texto.includes(pesquisa) || feedFiltrado[index].titulo.includes(pesquisa) || pesquisa == undefined) {
            post = " <div class='card' >"
            //"<svg class='bd-placeholder-img card-img-top' width='100%' height='180'"+
            if (feedFiltrado[index].imagem != undefined) {
           post+= "<img src='" + feedFiltrado[index].imagem + "' class='card-img-top'</img>  "
        }
        post+=

            "<title>Placeholder</title><rect width='100%' height='100%'"+
  
          
            "<div class='card-body'>"+
            "  <h5 class='card-title'>"+feedFiltrado[index].titulo +"</h5>"+
            "  <p class='card-text'>"+feedFiltrado[index].texto+"</p>"+
            "<input id='comentario'> <br> <button class='btn btn-primary'>Comentar</button>"+
            
            "</div>"+
          "</div> <br>"
            

            document.getElementById('postsFeed').innerHTML += post;
        }
    }
    recuperaCotacoesMap()
}


function pesquisaFeed() {
 
    var idUsuario = location.search.substring(1);
    console.log(idUsuario)
    console.log(document.getElementById("pesquisaFeed").value)
    imprimeFeedBoot(idUsuario, document.getElementById("pesquisaFeed").value)
}


function postarFeed() {
    var novoFeed = {
        "id": feed.length + 1,
        "titulo":  document.getElementById("postarTitulo").value,
        "texto": document.getElementById("postarTexto").value,
        "idusuario": location.search.substring(1)
    }

    feed.push(novoFeed)
    console.log(feed)
    pesquisaFeed()
}