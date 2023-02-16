var ajax = new XMLHttpRequest;

var enviar = document.getElementById('log-btn')

enviar.addEventListener('click',function(){
    nome = document.querySelector('#nome').value
    senha = document.querySelector('#senha').value
    local = window.location.href

    dados = {'nome':nome,'senha':senha}
    dados = JSON.stringify(dados)
    console.log(dados)
    localStorage.setItem('usuario',dados)
    ajax.open('POST','autentica',false)
    ajax.send(dados)
    var condição = 'no'
    while (condição == 'ok') {
        if (ajax.readyState == 4 || ajax.readyState === 200) {
            condição = 'ok'
        }
    }

    confere = JSON.parse(ajax.response)

    if(confere.length == 0){
        alert("Usuario Invalido")
    }

    if(confere.length == 1){
        window.location.href = local+"app"
    }
})

ajax.addEventListener('readystatechange',function () {
    if (ajax.readyState === 4 || ajax.readyState === 200) {
       console.log(ajax.status)
     }
     else{
         console.log(ajax.status)
     }
})




