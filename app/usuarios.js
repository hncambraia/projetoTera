var usuarios = [
    {
        "id":1,
        "nome":"Henrique Nogueira Cambraia",
        "login":"hncambraia",
        "email":"hncambraia@gmail.com",
        "senha": "12345678",
        "bio":"henrique nogueira",
        "foto":"img/1.jpg"
    },
    {
        "id":2,
        "nome":"Ueslei",
        "login":"ueslei",
        "email":"ueslei@gmail.com",
        "senha": "12345678",
        "bio":"ueslei",
        "foto":"img/2.jpg"
    },
    {
        "id":3,
        "nome":"Braulio",
        "login":"Braulio",
        "email":"Braulio@gmail.com",
        "senha": "12345678",
        "bio":"Braulio",
        "foto":"img/3.jpg"
    }   
]

function validaLogin (usuario, senha){
    var usuarioLocalizado = false;
    var senhaValidado = false;
    var mensagemFinal ="";
    var usuarioValidado ;
    
    for (var index =0; index < usuarios.length;index++)   {
    if (usuarios[index].login==usuario)
    {       
        usuarioLocalizado = true;           
        if(usuarios[index].senha==senha){
              
            senhaValidado = true;
            usuarioValidado = index;
            break;        
        }        
    }    
   }
   
   if (usuarioLocalizado && senhaValidado)
   {
   // mensagemFinal = "Usuário e Senha validado com sucesso"
   
   window.location.href = "feed.html?" + usuarioValidado;
    return ["",usuarioValidado];
   }
   else if (senhaValidado == false && usuarioLocalizado){
    mensagemFinal = "senha invalida"    
   }
   else{
    mensagemFinal = "usuario nao localizado";    
   }
   
   
    document.getElementById('dadosInvalidos').textContent = mensagemFinal        
   
}

function imprimeDadosUsuarios(id){
    document.getElementById('nome').textContent = "Nome: " + usuarios[id].nome
    document.getElementById('login').textContent = "Login: " + usuarios[id].login
    document.getElementById('email').textContent = "E-mail: " + usuarios[id].email
    document.getElementById('bio').textContent = "Bio: " + usuarios[id].bio
    document.getElementById('avatar').src = usuarios[id].foto
    getUser(id)
}


function getUser(id){
    document.getElementById('urlProfile').href = "profile.html?"+id
    document.getElementById('urlFeed').href = "feed.html?"+id
}