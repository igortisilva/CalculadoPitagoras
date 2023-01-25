from flask import Flask, jsonify, request
from flask_cors import CORS

app = Flask(__name__)
cors = CORS(app)

triangulos =[
    {
        'cateto1': 3,
        'cateto2': 4,
        'hipotenusa': 5
    }
]

@app.route('/triangulos')
def obterTriangulos():
    return jsonify(triangulos)


#Método para calcular a relação dos lados de um triângulo utilizando a fórmula h² = a² + b², caso um dos catetos ou a hipotenusa não tenha sido digitada
#é feita a chamada dos métodos descobrirCateto e descobrirHipotenusa, para realizar os cálculos necessários  e descobrir o valor faltante.
@app.route('/calcular', methods=['POST'])
def calcularPitagoras():
    if(request.json.get("c1") == "" ):
        c2 = float(request.json.get("c2"))
        h = float(request.json.get("h"))
        c1 = descobrirCateto(c2, h)
    elif(request.json.get("c2") == ""):
        c1 = float(request.json.get("c1"))
        h = float(request.json.get("h"))
        c2 = descobrirCateto(c1, h)
    elif(request.json.get("h") == ""):
        c1 = float(request.json.get("c1"))
        c2 = float(request.json.get("c2"))
        h = descobrirHipotenusa(c1, c2)
    else:  
        c1 = float(request.json.get("c1"))
        c2 = float(request.json.get("c2"))
        h = float(request.json.get("h"))
        if( c1**2 + c2**2 == h**2):
            return jsonify({'cateto1': c1, 'cateto2': c2,"hipotenusa": h, "mensagem":"É Triângulo retângulo"})
        return jsonify({'cateto1': c1, 'cateto2': c2,'hipotenusa': h, 'mensagem':"Não é Triângulo retângulo"})
    return jsonify({'cateto1': c1, 'cateto2': c2,"hipotenusa": h, "mensagem":"É Triângulo retângulo"})
    

def descobrirCateto(c,h):
    cateto = h**2 - c**2
    cateto = cateto ** 0.5
    return cateto

def descobrirHipotenusa(c1,c2):
    hipotenusa = c1**2 + c2**2
    hipotenusa = hipotenusa ** 0.5
    return hipotenusa

app.run(port=5000,debug=True)


