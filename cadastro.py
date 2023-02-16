from flask import Flask, render_template, request ,jsonify,redirect
import json
import connecetion

app = Flask(__name__)


@app.route('/autentica', methods = ['POST'])
def autentica():
    dados = request.get_data().decode()
    dados = json.loads(dados)
    
    dados = connecetion.autentica(dados['nome'],dados['senha'])
    
    return dados


@app.route('/')
def home():
    return render_template('login.html')

@app.route("/app")
def homepage():
 
     return render_template('index.html')

@app.route('/busca', methods = ['POST'])
def answer():
    dado = request.get_data().decode()

    dado = json.loads(dado)

    if (dado['nome'] == "") and (dado['idade'] == "") and (dado['CPF'] == ""):
        retorno = connecetion.resposta()

    else:
        dado = (dado['nome'],dado['idade'],dado['CPF'])
        retorno =  connecetion.resposta(dado,True)
    retorno = jsonify(retorno)
    return retorno


@app.route('/cadastro',methods = ['POST'])
def answer2():
    dado = request.get_data().decode()
    dado = json.loads(dado)
    dado = (dado['nome'],dado['CPF'],dado['idade'])
    connecetion.cadastro(dado)




if __name__ == "__main__":
    app.run(debug=True)


    