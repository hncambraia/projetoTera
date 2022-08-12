var usuarios = [
    {
        "id": 1,
        "nome": "Henrique Nogueira Cambraia",
        "login": "hncambraia",
        "email": "hncambraia@gmail.com",
        "senha": "12345678",
        "bio": "henrique nogueira",
        "foto": "img/1.jpg",
        "amigos": [2, 3, 4]
    },
    {
        "id": 2,
        "nome": "Ueslei",
        "login": "ueslei",
        "email": "ueslei@gmail.com",
        "senha": "12345678",
        "bio": "ueslei",
        "foto": "img/2.jpg",
        "amigos": [1, 3]
    },
    {
        "id": 3,
        "nome": "Braulio",
        "login": "Braulio",
        "email": "Braulio@gmail.com",
        "senha": "12345678",
        "bio": "Braulio",
        "foto": "img/3.jpg",
        "amigos": [1, 2, 4]
    }
    ,
    {
        "id": 4,
        "nome": "Tetsuo Matsumura",
        "login": "tetsuo",
        "email": "tetsuomatsumura@tera.com",
        "senha": "12345678",
        "bio": "Tetsuo Matsumura",
        "foto": "img/4.jpg",
        "amigos": [1, 2, 3]

    }
]

function validaLogin(usuario, senha) {
    var usuarioLocalizado = false;
    var senhaValidado = false;
    var mensagemFinal = "";
    var usuarioValidado;

    for (var index = 0; index < usuarios.length; index++) {
        if (usuarios[index].login == usuario) {
            usuarioLocalizado = true;
            if (usuarios[index].senha == senha) {

                senhaValidado = true;
                usuarioValidado = usuarios[index].id;
                break;
            }
        }
    }

    if (usuarioLocalizado && senhaValidado) {
        window.location.href = "feed_flex.html?" + usuarioValidado;
        return ["", usuarioValidado];
    }

    //    else if (senhaValidado == false && usuarioLocalizado){
    //             mensagemFinal = "senha invalida"    
    //    }
    else {
        mensagemFinal = "Usuário ou senha inválidos!"
    }

    window.alert(mensagemFinal);

}

function imprimeDadosUsuarios(id) {

    var usuarioFiltrado = usuarios.filter(function (el) {
        return el.id == id;
    })
    console.log(usuarioFiltrado)
    document.getElementById('nome').textContent = "Nome: " + usuarioFiltrado[0].nome
    document.getElementById('login').textContent = "Login: " + usuarioFiltrado[0].login
    document.getElementById('email').textContent = "E-mail: " + usuarioFiltrado[0].email
    document.getElementById('bio').textContent = "Bio: " + usuarioFiltrado[0].bio
    document.getElementById('avatar').src = usuarioFiltrado[0].foto
    imprimeListaAmigos(id,"")

    getUser(id)
}
function imprimeListaAmigos(idUsuario,pesquisa) {

    var amigos = ""
    var usuarioFiltrado = usuarios.filter(function (el) {
        return el.id == idUsuario;
    })

    document.getElementById('listaAmigos').innerHTML=""

    for (var indexAmigos = 0; indexAmigos < usuarioFiltrado[0].amigos.length; indexAmigos++) {
        console.log(usuarioFiltrado[0].amigos[indexAmigos])

        var amigoFiltrado = usuarios.filter(function (el) {
            return el.id == usuarioFiltrado[0].amigos[indexAmigos];
        })

        if(amigoFiltrado[0].nome.includes(pesquisa) ||amigoFiltrado[0].email.includes(pesquisa) || pesquisa == undefined)
        {
        amigos = "<div class='amigo'><img class='imgAmigo' src='" + amigoFiltrado[0].foto +"'</img> <h5>" + amigoFiltrado[0].nome + " ("+ amigoFiltrado[0].email + ")</h5> </div>"

        document.getElementById('listaAmigos').innerHTML += amigos
        }
    }



}

function pesquisaAmigos()
{
    var idUsuario = location.search.substring(1);
    imprimeListaAmigos(idUsuario,document.getElementById("pesquisa").value)
}

function getUser(id) {
    document.getElementById('urlProfile').href = "profile.html?" + id
    document.getElementById('urlFeed').href = "feed_flex.html?" + id
}