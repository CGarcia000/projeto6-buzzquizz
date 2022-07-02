let containerFromHTML = document.querySelector(".container-settings");
let tituloQuizz;
let URLquizz;
let qtdPerguntas;
let qtdNiveis;
let telaPerguntasQuizz;
let perguntaTitulo;
let corDeFundoPergunta;
let respostaCorreta;
let URLrespostaCorreta;

function telaCriarQuizz() {
    containerFromHTML.innerHTML = `
    <div id="container-settings">
        <h2>Comece pelo começo</h2>
        <div class="bloco-opcoes aberto">
            <span class="titulo-bloco">
                <h3>Um título</h3>
                <input type="text" name="tituloQuizz" placeholder="Título do seu quizz">
                <input type="text" name="URLquizz" placeholder="URL da imagem do seu quizz">
                <input type="text" name="qtdPerguntas" placeholder="Quantidade de perguntas do quizz">
                <input type="text" name="qtdNiveis" placeholder="Quantidade de níveis do quizz">
            </span>
        </div>
        <div id="btns-settings" class="">
            <button>Prosseguir pra criar perguntas</button>
        </div>
    `
}

function checkingBlocoOpcoes() { 
    tituloQuizz = document.querySelector(".titulo-bloco input:nth-child(1)").value;
    URLquizz = document.querySelector(".titulo-bloco input:nth-child(2)").value;
    qtdPerguntas = Number(document.querySelector(".titulo-bloco input:nth-child(3)").value);
    qtdNiveis = Number(document.querySelector(".titulo-bloco input:nth-child(4)").value);

    if (tituloQuizz.length >= 20 && tituloQuizz.length <= 65 && (URLquizz.startsWith('http://') || URLquizz.startsWith('https://')) && qtdPerguntas >= 3 && qtdNiveis >= 2) {
        vaiParaPerguntas();
    } else {
        alert("Preencha as informações corretamente!");
    }
}

function vaiParaPerguntas() {
    containerFromHTML.innerHTML = `
    <div id="container-settings">
        <h2>Comece pelo começo</h2>
    </div>
    `

    incluirCaixasPerguntas();
}



function incluirCaixasPerguntas() {
    telaPerguntasQuizz = document.querySelector(".container-settings");

    for (let i = 0; i < qtdPerguntas; i++) {

        telaPerguntasQuizz.innerHTML = `
        <div class="titulo-bloco pergunta${i + 1}">
            <h2>Crie suas perguntas</h2>
            <div class="numeroPergunta">
                <h2 class="instrucaoSubtitulo">Pergunta ${i + 1}</h2>
                <input type="text" name="pergunta" placeholder="Texto da pergunta">
                <input type="text" name="corDeFundoPergunta" maxlength="7" placeholder="Cor de fundo da pergunta">
            </div>
            <div class="respostaCorreta">
                <h2 class="instrucaoSubtitulo">Resposta correta</h2>
                <input type="text" name="resposta" placeholder="Resposta correta">
                <input type="text" name="URLresposta" placeholder="URL da imagem">
            </div>
            <div class="respostasIncorretas">
                <h2 class="instrucaoSubtitulo">Respostas incorretas</h2>
                <input type="text" name="respostaIncorreta1" placeholder="Resposta incorreta 1">
                <input type="text" name="URLrespostaIncorreta1" placeholder="URL da imagem 1" >
                <input type="text" name="respostaIncorreta2" placeholder="Resposta incorreta 2" >
                <input type="text" name="URLrespostaIncorreta2" placeholder="URL da imagem 2" >
                <input type="text" name="respostaIncorreta3" placeholder="Resposta incorreta 3" >
                <input type="text" name="URLrespostaIncorreta3" placeholder="URL da imagem 3" >
            </div>
        </div>
        `
    }
    botaoParaNiveis();
}

function botaoParaNiveis() {
    telaPerguntasQuizz.innerHTML += `
    <div id="btns-settings" class="quizz-completo" onclick="checagemPerguntas()">
        <button>Prosseguir pra criar níveis</button>
    </div>
    `
}

function checagemPerguntas() {
    for (let i = 0; i < qtdPerguntas; i++) {
        perguntaTitulo = document.querySelector(`.pergunta${i + 1} .numeroPergunta input:nth-child(2)`).value;
        corDeFundoPergunta = document.querySelector(`.pergunta${i + 1} .numeroPergunta input:nth-child(3)`).value;
        corPergunta
        if (perguntaTitulo.length >= 20 && corDeFundoPergunta.startsWith('#') && corDeFundoPergunta) {
            checkingRespostaCorreta();
        } else {
            alert("Preencha as informações corretamente!");
        }
    }
}

function checkingRespostaCorreta() {

}