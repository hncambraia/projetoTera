let feed = [
    {
        "id":1,
        "titulo":"titulo 1",
        "texto":"texto 1 <br>texto 1213",        
        "imagem":"img/cafe.jpg",
        "idusuario":"1"
    },
    {
        "id":2,
        "titulo":"titulo 2",
        "texto":"texto 2",        
        "imagem":"img/cafe2.jpg",
        "idusuario":"1"
    },
    {
        "id":3,
        "titulo":"titulo 3",
        "texto":"texto 3",        
        "imagem":"img/cafe2.jpg",
        "idusuario":"2"
    }   ,
    {
        "id":4,
        "titulo":"titulo 4",
        "texto":"texto 4",        
        "imagem":"img/cafe2.jpg"        ,
        "idusuario":"3"
    }   ,
    {
        "id":5,
        "titulo":"titulo 5",
        "texto":"texto 5",        
        
        "idusuario":"1"
    }   ,
    {
        "id":6,
        "titulo":"titulo 6",
        "texto":"texto 6"        
    }   

]
let text=""
var invalidEntries = 0;

var feedFiltrado = feed.filter(function(el){
    return el.idusuario== location.search.substring(1) || el.idusuario == undefined;
})


for (var index =0; index < feed.length;index++)   {   
    var post=""
    post = "<div class='posts'> <h1>" + feedFiltrado[index].titulo +"</h1>" + 
                "<h3>" + feedFiltrado[index].texto+"</h3>         <br>    <input id='pesquisa'> <br> <button id='botaoComentar'>Comentar</button><br></div>" 
               
    if (feedFiltrado[index].imagem != undefined)
        {   
            post ="<div class='posts'> <h1>" + feedFiltrado[index].titulo +"</h1>" + 
            "<h3>" + feedFiltrado[index].texto+"</h3>"+
                "<img src='" + feedFiltrado[index].imagem +"'</img>   <br>  <input id='pesquisa'> <br> <button id='botaoComentar'>Comentar</button><br></div>"
        }
    document.getElementById('postsFeed').innerHTML += post;
}