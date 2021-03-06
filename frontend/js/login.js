function autenticar(event) {

    event.preventDefault();  //não faça o comportamento padrão (enviar o formulário) 

    let usuario = document.getElementById("txtUsuario");
    let senha = document.getElementById("txtSenha");

    let loginMsg = {
        email: usuario.value,
        cpf: usuario.value,
        senha: senha.value
    }

    let cabecalho = {
        method: 'POST',
        body: JSON.stringify(loginMsg),
        headers:{
            'Content-type':'application/json'
        }
    }

    //envia o pedido para o servidor, e so continua somente quando chegar a resposta (then)
    fetch('http://localhost:8080/usuario/login', cabecalho)
    .then( res => tratarResposta(res) ); //'arrow function' chamando a função tratarResposta
                                        //res é a resposta que veio do backend

}


function tratarResposta (res){
    if(res.status == 200){ //usuário/senha válidos
        res.json().then(res => fazerLogin(res));
    }else{
        document.getElementById("msgErro").innerHTML = "Usuário/Senha inválidos.";
    }
}

function fazerLogin(user){
    //armazena no locastorage os dados do usuário que fez login
    localStorage.setItem("userLogged", JSON.stringify(user));

    if(user.perfil == 0){
        window.location = "atend_gestor.html";
    }else{
        window.location = "atend_tecnico.html";
    }
}


function logout(){
    localStorage.removeItem("userLogged");
    window.location = "index.html";
}