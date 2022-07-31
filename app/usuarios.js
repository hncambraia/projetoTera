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
    return [mensagemFinal,usuarioValidado];
   }
   else{
    mensagemFinal = "usuario nao localizado";
    return [mensagemFinal,usuarioValidado];
   }
   
   
}

function imprimeDadosUsuarios(id){
    document.getElementById('h1').textContent = usuarios[id].nome
    document.getElementById('avatar').src = usuarios[id].foto
}