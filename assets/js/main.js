const submit = document.getElementById("submit");
let cateto1 = document.getElementById("cateto1");
let cateto2 = document.getElementById("cateto2");
let hipotenusa = document.getElementById("hipotenusa");
let resultado = document.getElementById("resultado");




//Método para converter a resposta da API para um Objeto.
function convertApiDetailToTriangulo(cateto1, cateto2, hipotenusa,mensagem){
    const t = new Triangulo();
    t.cateto1 = cateto1;
    t.cateto2 = cateto2;
    t.hipotenusa = hipotenusa;
    t.mensagem = mensagem;
    return t;
}



submit.addEventListener('click',function (){
    /*
        Verificação para não enviar a requisição com duas informações faltando.
    */
    if(cateto1.value == "" && cateto2.value == "" || cateto1.value == "" && hipotenusa.value == "" || hipotenusa.value && cateto2.value == ""){
        alert("Preencha pelo menos dois valores")
    }else{
        /*
            Requisição para a API realizar os cálculos.
        */
    saida = fetch("http://127.0.0.1:5000/calcular",{
        method: 'POST',
        body: JSON.stringify({
            c1: cateto1.value,
            c2: cateto2.value,
            h: hipotenusa.value
        }),
        headers: {
            'Content-type': 'application/json; charset=UTF-8'
        }
    }).then(function (response) {
        if (response.ok) {
            return response.json();
        }
        return Promise.reject(response);
    }).then(function (data) {
        return convertApiDetailToTriangulo(data.cateto1,data.cateto2,data.hipotenusa, data.mensagem)
    }).then(function (triangulo){
        //
        //Converte o Objeto triangulo para uma apresentação em  HTML
        //
        return `<p>
                <ol style="list-style-type: none; padding-left: 1rem;">
                    <h5 >Resultado:</h5>
                    <hr></hr>
                    <li><h6 >Cateto A:</h6><span > ${triangulo.cateto1}</span></li>
                    <li><h6 >Cateto B:</h6><span > ${triangulo.cateto2}</span></li>
                    <li><h6 >Hipotenusa:</h6><span >${triangulo.hipotenusa}</span></li>
                    <hr></hr>
                    <li><h6 >${triangulo.mensagem}</h6></li>
                    </ol>
              </p>
              `
    }).then(function (html){
        //
        //Insere a resposta da API no HTML
        //
        resultado.innerHTML = html;
    })
    .catch(function (error) {
        console.warn('Something went wrong.', error);
    });
}
});



