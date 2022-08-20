var usuariosExcel = ''
var usuarios = ''


function novoUsuario() {
    window.location.href = "new_user.html?=0"
}
const options = {
    method: 'GET',
    mode: 'cors'
}

function fillEditUser(){
    id=sessionStorage.getItem('idUsuarios')
    console.log('id:',id)
        usuarios = JSON.parse(sessionStorage.getItem("usuarios"));
    
    window.location.href = "new_user.html?" + id
    
    var usuarioFiltrado = usuarios.filter(function (el) {
        return el.id == id;
    })
    console.log('1',usuarioFiltrado[0].Nome)
    document.getElementById('name').value =usuarioFiltrado[0].Nome

}

var dataCotacao


function formataData(dataAFortmatar) {


    var dd = String(dataAFortmatar).substring(10, 8);
    var mm = String(dataAFortmatar).substring(7, 5); //January is 0!
    var yyyy = String(dataAFortmatar).substring(0, 4); //January is 0!
    novaData = dd + "/" + mm + "/" + yyyy
    return novaData
}

function titleCase(str) {
    str = str.toLowerCase().split(' ');
    for (var i = 0; i < str.length; i++) {
        str[i] = str[i].charAt(0).toUpperCase() + str[i].slice(1);
    }
    return str.join(' ');
}


function recuperaUsuarios() {

    tipo = "Usuarios"

    fetch('https://prod-110.westus.logic.azure.com/workflows/e50f80756b9b43baa71d055fbee3d9c6/triggers/manual/paths/invoke/tipo/' + tipo + '?api-version=2016-06-01&sp=%2Ftriggers%2Fmanual%2Frun&sv=1.0&sig=MUPtVkRaZGh1maM7uzFu2cmmaebhC1aKvLcfMfhirw0', options)
        .then(response => {
            response.json()

                .then(data => {
                    usuarios = data.value;
                    console.log('f', usuarios)
                    sessionStorage.setItem("usuarios", JSON.stringify(usuarios));
                    

                })


        })
        .catch(e => {
            console.log("ERRO: " + e)
        })

}



function gotoIndex() {
    id = Number(location.search.substring(1))

    if (id >= 1) {
        window.location.href = "feed_flex.html?" + id

    }
    else {
        window.location.href = "index.html"


    }
}
function validaLogin(usuario, senha) {
    var usuarioLocalizado = false;
    var senhaValidado = false;
    var mensagemFinal = "";
    var usuarioValidado;



    console.log('Exel', usuarios)
    for (var index = 0; index < usuarios.length; index++) {
        console.log('login', usuarios[index].Login)
        if (usuarios[index].Login == usuario) {
            usuarioLocalizado = true;
            if (usuarios[index].Senha == senha) {

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
    usuarios = JSON.parse(sessionStorage.getItem("usuarios"));
    
console.log('1',usuarios)
imprimeCabecalho()
    var usuarioFiltrado = usuarios.filter(function (el) {
        return el.id == id;
    })
    console.log(usuarioFiltrado)
    document.getElementById('nome').textContent = "Nome: " + usuarioFiltrado[0].Nome
    document.getElementById('login').textContent = "Login: " + usuarioFiltrado[0].Login
    document.getElementById('email').textContent = "E-mail: " + usuarioFiltrado[0].Email
    document.getElementById('bio').textContent = "Bio: " + usuarioFiltrado[0].Bio
    document.getElementById('avatar').src = usuarioFiltrado[0].Foto
    imprimeListaAmigos(id, "")

    getUser(id)
}
function imprimeListaAmigos(idUsuario, pesquisa) {

    var amigos = ""
    var usuarioFiltrado = usuarios.filter(function (el) {
        return el.id == idUsuario;
    })

    document.getElementById('listaAmigos').innerHTML = ""
    listaAmigos = usuarioFiltrado[0].Amigos.split(',')
    console.log('1',listaAmigos )
    for (var indexAmigos = 0; indexAmigos < listaAmigos.length; indexAmigos++) {
        console.log(listaAmigos[indexAmigos])

        usuarios = JSON.parse(sessionStorage.getItem("usuarios"));
        var amigoFiltrado = usuarios.filter(function (el) {
            return el.id == usuarioFiltrado[0].Amigos[indexAmigos];
        })

        if (amigoFiltrado[0].Nome.includes(pesquisa) || amigoFiltrado[0].email.includes(pesquisa) || pesquisa == undefined) {
            amigos = "<div class='amigo'><img class='imgAmigo' src='" + amigoFiltrado[0].foto + "'</img> <h5>" + amigoFiltrado[0].nome + " (" + amigoFiltrado[0].email + ")</h5> </div>"

            document.getElementById('listaAmigos').innerHTML += amigos
        }
    }



}

function pesquisaAmigos() {
    var idUsuario = location.search.substring(1);
    imprimeListaAmigos(idUsuario, document.getElementById("pesquisa").value)
}

function getUser(id) {
    if (id == 0) {
        document.getElementById('urlProfile').hidden = true
        document.getElementById('urlFeed').hidden = true
        document.getElementById('urlLogout').hidden = true


    }
    else {
        imprimeCabecalho()
        document.getElementById('urlProfile').href = "profile.html?" + id
        document.getElementById('urlFeed').href = "feed_flex.html?" + id
        document.getElementById('urlLogout').href = "index.html"
        
        
    }


}

function fnCadastraAlteraUsuario(metodoHttp, id, name, login, email, senha,bio) {
    const usuario = {
        Nome: name,
        Login: login,
        Email: email,
        Senha: senha,
        Bio: bio
    };

    console.log(name)
    console.log(id)
    console.log(usuario)

    const opt = {
        method: metodoHttp, //PUT, PATCH, DELETE, GET é opcional
        body: JSON.stringify(usuario), //Converte o objeto (usuario) JSON para string/texto e só utilizamos para POST, PATCH e PUT
        headers: {
            "Content-Type": "application/json"
        }
    };

    let url = "https://prod-89.westus.logic.azure.com/workflows/dad5effed73e4a1f837a5351cb9a951e/triggers/manual/paths/invoke/tipo/Usuarios?api-version=2016-06-01&sp=%2Ftriggers%2Fmanual%2Frun&sv=1.0&sig=7O_ybyW9x4XPdiJyLalxf9ACRoSNFXeTgQHt-l00y1Y";

    if (id > 0) {
        url += "/" + id;
    }

    console.log(url);

    

    fetch(url, opt)
        .then((resposta) => console.log(resposta.status))
        .then(window.alert('Usuário cadastrado com sucesso!'))
        .then(window.location.href = 'index.html')
        .catch(() => window.alert({ Error }));

    
    
}


function imprimeCabecalho(){
document.getElementById('cabecalho').innerHTML =
    '<nav class="navbar navbar-expand-lg bg-light">' +
    '<img src="img/logo2.png" alt="" width="150" height=auto class="rounded mx-auto d-block center" onclick="gotoIndex()">' +
    '<div class="container-fluid">' +
    '<button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent"' +
    'aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">' +
    '<span class="navbar-toggler-icon"></span>' +
    '</button>' +
    '<div class="collapse navbar-collapse" id="navbarSupportedContent">' +
    '<ul class="navbar-nav me-auto mb-2 mb-lg-0">' +
    '<li class="nav-item">' +
    '<a class="nav-link active" aria-current="page" id="urlProfile">Profile</a>' +
    '</li>' +
    '<li class="nav-item">' +
    '<a class="nav-link active" aria-current="page" id="urlFeed" >Feed</a>' +
    '</li>' +
    '<li class="nav-item dropdown">' +
    '<a class="nav-link active" aria-current="page" id="urlLogout">Logout</a>' +
    '</li>' +
    '</ul>' +
    '<!--<form class="d-flex" role="search">-->' +
    '<input class="form-control me-2" type="search" placeholder="Pesquisar" aria-label="Search" id="pesquisaFeed">' +
    '<button onclick="pesquisaFeed()" class="btn btn-outline-search">Pesquisar</button>' +
    '<!--</form>-->' +
    '</div>' +
    '</div>' +
    '</nav>'
}