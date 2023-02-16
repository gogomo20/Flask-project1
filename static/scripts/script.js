var ajax = new XMLHttpRequest;

var dado = ""

buscar = document.getElementById('buscar')

window.onload = function(){
    ajax.open('POST','autentica',false)
    if(localStorage.length == 0){
            window.location.href = "https://clientela.herokuapp.com/"
    }
    dados = localStorage.usuario
    ajax.send(dados)


    confere = JSON.parse(ajax.response)

    if(confere.length == 0){
        window.location.href = "https://clientela.herokuapp.com/"
    }

  
}

// função assincrona ele busca os dados do formulario, envia ao python e retorna os valores 
function busca(){
    nome = document.querySelector('#nome').value
    idade = document.querySelector('#idade').value
    CPF = document.querySelector('#CPF').value
    dados = {'nome': nome, 'idade': idade , 'CPF': CPF}
    dados = JSON.stringify(dados)

    //console.log(dados)
    ajax.open('POST','busca',false)
    ajax.send(dados)
    
    dados = ajax.response

    //console.log(dados)

    dados = JSON.parse(dados)

    retorno = document.getElementById("retorno")

    cId = document.querySelectorAll('.id')
    cNome = document.querySelectorAll('.nome')
    cCPF = document.querySelectorAll('.cpf')
    cIdade = document.querySelectorAll('.idade')


    if (cId.length != 0) {
        for (let index = 0; index < cId.length; index++) {
            retorno.removeChild(cId[index])
            retorno.removeChild(cNome[index])
            retorno.removeChild(cCPF[index])
            retorno.removeChild(cIdade[index])
            
        }

        
    }
    for (let i = 0; i < dados.length; i++) {
        cId = document.createElement("div")
        cNome = document.createElement("div")
        cCPF = document.createElement("div")
        cIdade = document.createElement("div")
        

        dId = document.createTextNode(dados[i][0])
        dNome = document.createTextNode(dados[i][1])
        dCPF = document.createTextNode(dados[i][2])
        dIdade = document.createTextNode(dados[i][3])

        cId.appendChild(dId)
        cNome.appendChild(dNome)
        cCPF.appendChild(dCPF)
        cIdade.appendChild(dIdade)

        cId.classList.add("id")
        cNome.classList.add("nome")
        cCPF.classList.add("cpf")
        cIdade.classList.add("idade")

        retorno.appendChild(cId)
        retorno.appendChild(cNome)
        retorno.appendChild(cCPF)
        retorno.appendChild(cIdade)


        
        
    }

}





buscar.addEventListener('click', function () {
    busca()
})


cadastrar = document.getElementById('cadastrar')


cadastrar.addEventListener('click',function(){
        nome = document.querySelector('#nome').value
        idade = document.querySelector('#idade').value
        CPF = document.querySelector('#CPF').value
        if(nome =="" || idade == "" || CPF == ""){
            alert('insira todos os dados para cadastro')
            
        }else{

            if (CPF.length != 11) {
                alert('CPF invalido para cadastro')
                
            }else{
                dados = {'nome': '','idade': '','CPF': CPF}
                dados = JSON.stringify(dados)
                ajax.open('POST','busca',false)
                ajax.send(dados)
                var condição = 'no'
                while (condição == 'ok') {
                    if (ajax.readyState == 4 || ajax.readyState === 200) {
                        condição = 'ok'
                    }
                }
                dados = ajax.response
            
                if(dados.length === 3 ){
                    dados = {'nome':nome,'idade': idade,'CPF': CPF}
                    dados = JSON.stringify(dados)
                    ajax.open('POST','cadastro',false)
                    ajax.send(dados) 
                }else{
                    alert('CPF ja cadastrado')
                    //console.log(dados.length)
                    //console.log(dados)
                }

            }
        }

       dados = {'nome' : "",'idade':"",'CPF':""} 
       dados = JSON.stringify(dados)
       ajax.open('POST','busca',false)
       ajax.send(dados)
       
    })




ajax.addEventListener('readystatechange',function () {
    if (ajax.readyState === 4 || ajax.readyState === 200) {
       console.log(ajax.status)
     }
     else{
         console.log(ajax.status)
     }
})

