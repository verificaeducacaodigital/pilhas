
const perguntas = [
    {
        pergunta: "1. O que pode acontecer quando pilhas são descartadas incorretamente?",
        alternativas: [
            "Podem liberar substâncias que contaminam o ambiente",
            "Transformam o lixo em energia limpa",
            "Eliminam todos os microrganismos do solo",
            "Não provocam nenhum impacto ambiental"
        ],
        correta: 0
    },

    {
        pergunta: "2. Qual é o processo químico responsável pela geração de energia nas pilhas?",
        alternativas: [
            "Evaporação e condensação",
            "Oxidação e redução",
            "Fusão e solidificação",
            "Filtração e decantação"
        ],
        correta: 1
    },

    {
        pergunta: "3. Qual material pode ser recuperado durante a reciclagem de determinadas baterias?",
        alternativas: [
            "Madeira",
            "Algodão",
            "Lítio",
            "Papel"
        ],
        correta: 2
    },

    {
        pergunta: "4. Qual é a principal função da reciclagem de pilhas e baterias?",
        alternativas: [
            "Aumentar a quantidade de lixo",
            "Recuperar materiais e reduzir impactos ambientais",
            "Liberar substâncias químicas no solo",
            "Impedir o reaproveitamento de metais"
        ],
        correta: 1
    },

    {
        pergunta: "5. Qual é a atitude mais adequada ao descartar uma pilha usada?",
        alternativas: [
            "Jogar no lixo comum",
            "Enterrar no quintal",
            "Quebrar a pilha antes do descarte",
            "Levar a um ponto de coleta apropriado"
        ],
        correta: 3
    }
];

let indiceAtual = 0;
let pontuacao = 0;
let respondeu = false;

const perguntaElemento = document.getElementById("pergunta");
const alternativasElemento = document.getElementById("alternativas");
const progressoElemento = document.getElementById("progresso");
const proximoBotao = document.getElementById("proximo");
const areaQuiz = document.getElementById("areaQuiz");
const resultadoElemento = document.getElementById("resultado");

function carregarPergunta() {

    respondeu = false;

    const atual = perguntas[indiceAtual];

    progressoElemento.textContent =
        `Questão ${indiceAtual + 1} de ${perguntas.length}`;

    perguntaElemento.textContent = atual.pergunta;

    alternativasElemento.innerHTML = "";

    proximoBotao.disabled = true;

    atual.alternativas.forEach((alternativa, indice) => {

        const botao = document.createElement("button");

        botao.textContent = alternativa;
        botao.classList.add("alternativa");

        botao.addEventListener("click", () => {
            selecionarResposta(indice, botao);
        });

        alternativasElemento.appendChild(botao);
    });

    proximoBotao.textContent =
        indiceAtual === perguntas.length - 1
        ? "VER RESULTADO"
        : "PRÓXIMA QUESTÃO →";
}

function selecionarResposta(indice, botaoSelecionado) {

    if (respondeu) return;

    respondeu = true;

    const correta = perguntas[indiceAtual].correta;

    const botoes = document.querySelectorAll(".alternativa");

    botoes.forEach((botao, i) => {

        botao.disabled = true;

        if (i === indice) {
            botao.classList.add("selecionada");
        }

    });

    if (indice === correta) {
        pontuacao++;
    }

    proximoBotao.disabled = false;
}

proximoBotao.addEventListener("click", () => {

    if (!respondeu) return;

    indiceAtual++;

    if (indiceAtual < perguntas.length) {
        carregarPergunta();
    } else {
        mostrarResultado();
    }
});

function mostrarResultado() {

    areaQuiz.style.display = "none";

    resultadoElemento.hidden = false;

    let mensagem = "";

    if (pontuacao === 5) {
        mensagem = "Excelente! Você solucionou o caso!";
    } else if (pontuacao >= 3) {
        mensagem = "Muito bem! Você está no caminho certo!";
    } else {
        mensagem = "Continue investigando! A ciência precisa de você!";
    }

    resultadoElemento.innerHTML = `
        <h3>INVESTIGAÇÃO CONCLUÍDA!</h3>

        <p>Você acertou:</p>

        <h2>${pontuacao} de ${perguntas.length}</h2>

        <p>${mensagem}</p>

        <button class="botao" onclick="reiniciarQuiz()">
            REINICIAR INVESTIGAÇÃO
        </button>
    `;
}

function reiniciarQuiz() {

    indiceAtual = 0;
    pontuacao = 0;
    respondeu = false;

    resultadoElemento.hidden = true;
    areaQuiz.style.display = "block";

    carregarPergunta();
}

carregarPergunta();
