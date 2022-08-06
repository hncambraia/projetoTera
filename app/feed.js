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
}


function pesquisaFeed() {
    var idUsuario = location.search.substring(1);
    imprimeFeed(idUsuario, document.getElementById("pesquisaFeed").value)
}


function postarFeed() {
    var novoFeed = {
        "id": feed.length + 1,
        "titulo": "Titulo " + document.getElementById("postar").value,
        "texto": document.getElementById("postar").value,
        "idusuario": location.search.substring(1)
    }

    feed.push(novoFeed)
    console.log(feed)
    pesquisaFeed()
}