import mysql.connector as conec
from mysql.connector import errorcode


"""conexão com o banco de dados"""




def resposta(dados= False,filtro = False):
    #configurações de usario e host de banco de dados
    bd_host = 'us-cdbr-east-06.cleardb.net'
    bd_database = 'heroku_0858c2ff75016e2'
    bd_user = 'b6f96895617e8f'
    bd_pass = '6fbc7be2'

    con = conec.connect(host= bd_host , database=bd_database,user=bd_user,password = bd_pass)
    if con.is_connected():
        db_info = con.get_server_info()
        cursor = con.cursor()

        """
            verifica quais dos filtros estão validos
            Se acaso nenhum dado for selecionado todos os dados são retornados
        """

        if filtro==False:
            cursor.execute('select*from '+ bd_database +'.clientes;')
            
        else:
            filtro = ""
            

            if dados[0] != "":
                filtro += 'cliente LIKE "%{dados}%"'
                filtro = filtro.replace("{dados}",dados[0])
            if dados[1] != "": 
                if dados[0] != "": filtro += ' and '
                filtro +=  'idade = {dados}'
                filtro = filtro.replace("{dados}",str(dados[1]))
            if dados[2] != "":
                if (dados[0]!="") or (dados[1]!= ""): filtro += ' and '
                filtro += 'CPF = {dados}'
                filtro = filtro.replace("{dados}",dados[2])

            comando = 'select*from '+ bd_database +'.clientes where {filtro} order by cliente'
            cursor.execute(comando.replace("{filtro}",filtro))
            print(comando.replace("{filtro}",filtro))

        #retorno do banco de dados
        dados = cursor.fetchall()

    #fecha a conexão com o banco de dados
    if con.is_connected():
        cursor.close()
        con.close()
    return dados
       

# cadasotro de clientes
def cadastro(dados):
    #configurações de usario e host de banco de dados
    bd_host = 'us-cdbr-east-06.cleardb.net'
    bd_database = 'heroku_0858c2ff75016e2'
    bd_user = 'b6f96895617e8f'
    bd_pass = '6fbc7be2'
    con = conec.connect(host= bd_host , database=bd_database,user=bd_user,password = bd_pass)


    if con.is_connected():
        db_info = con.get_server_info()
        cursor = con.cursor()
        
    comando = "INSERT INTO `"+ bd_database +"`.`clientes` (`cliente`, `cpf`, `idade`) VALUES('{nome}','{CPF}','{idade}')"
    comando =  comando.replace('{nome}',dados[0]).replace('{CPF}',dados[1]).replace('{idade}',dados[2])

    cursor.execute(comando)
    if con.is_connected():
        cursor.close()
        con.close()



def autentica(user,senha):
    bd_host = 'us-cdbr-east-06.cleardb.net'
    bd_database = 'heroku_0858c2ff75016e2'
    bd_user = 'b6f96895617e8f'
    bd_pass = '6fbc7be2' 
    con = conec.connect(host= bd_host , database=bd_database,user=bd_user,password = bd_pass)
    if con.is_connected():
        db_info = con.get_server_info()

        cursor = con.cursor()

        comando = "select*from "+bd_database+".usuarios where user like '"+user+"' and password like '"+senha+"'"
        
        cursor.execute(comando)
        dados = cursor.fetchall()

    if con.is_connected():
        cursor.close()
        con.close()

    return dados