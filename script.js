let pessoas = [];

const nome = document.getElementById("nome");
const peso = document.getElementById("peso");
const altura = document.getElementById("altura");

const btnAdicionar = document.getElementById("btnAdicionar");
const btnLimpar = document.getElementById("btnLimpar");
const btnModo = document.getElementById("btnModo");

const listaPessoas = document.getElementById("listaPessoas");
const mensagem = document.getElementById("mensagem");
const contador = document.getElementById("contador");

const media = document.getElementById("media");
const maior = document.getElementById("maior");
const menor = document.getElementById("menor");

const pesquisaNome = document.getElementById("pesquisaNome");


function calcularIMC(peso, altura) {
    return peso / (altura * altura);
}


function classificarIMC(imc) {

    if (imc < 18.5) {
        return "Abaixo do peso";
    } else if (imc < 25) {
        return "Peso normal";
    } else if (imc < 30) {
        return "Sobrepeso";
    } else if (imc < 35) {
        return "Obesidade grau I";
    } else if (imc < 40) {
        return "Obesidade grau II";
    } else {
        return "Obesidade grau III";
    }
}


function classeIMC(imc) {

    if (imc < 18.5) {
        return "abaixo";
    } else if (imc < 25) {
        return "normal";
    } else if (imc < 30) {
        return "sobrepeso";
    } else {
        return "obesidade";
    }
}


function mostrarPessoas(lista = pessoas) {

    listaPessoas.innerHTML = "";

    if (lista.length === 0) {
        listaPessoas.innerHTML = `
            <div class="vazio">
                Nenhuma pessoa cadastrada.
            </div>
        `;
        return;
    }

    lista.forEach(function(pessoa) {

        const div = document.createElement("div");

        div.className = "pessoa " + classeIMC(pessoa.imc);

        div.innerHTML = `
            <div class="info">
                <h3>${pessoa.nome}</h3>
                <p>Peso: ${pessoa.peso.toFixed(1)} kg</p>
                <p>Altura: ${pessoa.altura.toFixed(2)} m</p>
            </div>

            <div class="imc">
                <div class="valor-imc">${pessoa.imc.toFixed(2)}</div>
                <div class="classificacao">${pessoa.classificacao}</div>
                <button class="btn-excluir" data-id="${pessoa.id}">
                    Excluir
                </button>
            </div>
        `;

        listaPessoas.appendChild(div);
    });

    const botoesExcluir = document.querySelectorAll(".btn-excluir");

    botoesExcluir.forEach(function(botao) {

        botao.addEventListener("click", function() {

            const id = Number(botao.getAttribute("data-id"));

            excluirPessoa(id);
        });
    });
}


function atualizarDados() {

    contador.textContent = pessoas.length;

    if (pessoas.length === 0) {
        media.textContent = "0.00";
        maior.textContent = "0.00";
        menor.textContent = "0.00";
        return;
    }

    let soma = 0;
    let maiorIMC = pessoas[0].imc;
    let menorIMC = pessoas[0].imc;

    pessoas.forEach(function(pessoa) {

        soma += pessoa.imc;

        if (pessoa.imc > maiorIMC) {
            maiorIMC = pessoa.imc;
        }

        if (pessoa.imc < menorIMC) {
            menorIMC = pessoa.imc;
        }
    });

    media.textContent = (soma / pessoas.length).toFixed(2);
    maior.textContent = maiorIMC.toFixed(2);
    menor.textContent = menorIMC.toFixed(2);
}


function adicionarPessoa() {

    const nomeDigitado = nome.value.trim();
    const pesoDigitado = Number(peso.value);
    const alturaDigitada = Number(altura.value);

    if (nomeDigitado === "") {
        mensagem.textContent = "Digite o nome da pessoa.";
        mensagem.style.color = "#c0392b";
        return;
    }

    if (pesoDigitado <= 0 || alturaDigitada <= 0) {
        mensagem.textContent = "Digite valores válidos para peso e altura.";
        mensagem.style.color = "#c0392b";
        return;
    }

    const imc = calcularIMC(pesoDigitado, alturaDigitada);

    const pessoa = {
        id: Date.now(),
        nome: nomeDigitado,
        peso: pesoDigitado,
        altura: alturaDigitada,
        imc: imc,
        classificacao: classificarIMC(imc)
    };

    pessoas.push(pessoa);

    mostrarPessoas();
    atualizarDados();

    mensagem.textContent = "Pessoa adicionada com sucesso!";
    mensagem.style.color = "#27ae60";

    nome.value = "";
    peso.value = "";
    altura.value = "";

    nome.focus();
}


function excluirPessoa(id) {

    const indice = pessoas.findIndex(function(pessoa) {
        return pessoa.id === id;
    });

    if (indice !== -1) {
        pessoas.splice(indice, 1);
    }

    mostrarPessoas();
    atualizarDados();
}


function pesquisar() {

    const texto = pesquisaNome.value.toLowerCase().trim();

    const resultado = pessoas.filter(function(pessoa) {
        return pessoa.nome.toLowerCase().includes(texto);
    });

    mostrarPessoas(resultado);
}


btnAdicionar.addEventListener("click", adicionarPessoa);

btnLimpar.addEventListener("click", function() {

    nome.value = "";
    peso.value = "";
    altura.value = "";

    mensagem.textContent = "";

    nome.focus();
});


pesquisaNome.addEventListener("input", pesquisar);


btnModo.addEventListener("click", function() {

    document.body.classList.toggle("escuro");

    if (document.body.classList.contains("escuro")) {
        btnModo.textContent = "Modo claro";
    } else {
        btnModo.textContent = "Modo escuro";
    }
});


mostrarPessoas();
atualizarDados();