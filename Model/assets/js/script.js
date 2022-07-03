let containerFromHTML = document.querySelector(".container-settings");
let tituloQuizz;
let URLquizz;
let qtdPerguntas;
let qtdNiveis;
let telaPerguntasQuizz;
let telaDecidirNiveis;
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

let newQuizz;
let newQuizzUsuario;
let valido;

function checkingBlocoOpcoes() { 
    tituloQuizz = document.querySelector(".titulo-bloco input:nth-child(1)").value;
    URLquizz = document.querySelector(".titulo-bloco input:nth-child(2)").value;
    qtdPerguntas = Number(document.querySelector(".titulo-bloco input:nth-child(3)").value);
    qtdNiveis = Number(document.querySelector(".titulo-bloco input:nth-child(4)").value);
    valido = tituloQuizz.length >= 20 && tituloQuizz.length <= 65 && (URLquizz.startsWith('http://') || URLquizz.startsWith('https://'));

    if (valido && qtdPerguntas >= 3 && qtdNiveis >= 2) {
        newQuizzUsuario = newObjectQuizz(qtdPerguntas, qtdNiveis);
        console.log(newQuizzUsuario)
        newQuizz.title = tituloQuizz;
        console.log(tituloQuizz)
        newQuizz.image = URLquizz;
        console.log(URLquizz)
        console.log(newQuizzUsuario)
        vaiParaPerguntas();
    } else {
        alert("Preencha as informações corretamente!");
    }
}

function newObjectQuizz(questions, levels) {
    newQuizz = {
        title: "",
        image: "",
        questions: [],
        levels: []
    }

    const niveis = {
                        title: "",
                        image: "",
                        text: "",
                        minValue: 0
                    }

    for (let i = 0; i < levels; i++) {
        newQuizz.levels.push(niveis);
    }
    return newQuizz;
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
        <div class="titulo-bloco">
            <h2>Crie suas perguntas</h2>
            <div class="numeroPergunta">
                <h2 class="instrucaoSubtitulo">Pergunta ${i + 1}</h2>
                <input class="textoDaPergunta" type="text" name="pergunta" placeholder="Texto da pergunta" autocomplete>
                <input class="corPergunta" type="color" name="corDeFundoPergunta" placeholder="Cor de fundo da pergunta">
            </div>
            <div class="respostaCorreta">
                <h2 class="instrucaoSubtitulo">Resposta correta</h2>
                <input class="respostaCorretaTexto" type="text" name="resposta" placeholder="Resposta correta" autocomplete>
                <input class="respostaCorretaImagem" type="text" name="URLresposta" placeholder="URL da imagem" autocomplete> 
            </div>
            <div class="respostasIncorretas">
                <h2 class="instrucaoSubtitulo">Respostas incorretas</h2>
                <input class="respostaErradaTexto" type="text" name="respostaIncorreta1" placeholder="Resposta incorreta 1" autocomplete>
                <input class="respostaErradaImagem" type="text" pattern="^(https|http)://" name="URLrespostaIncorreta1" placeholder="URL da imagem 1" autocomplete>
                <input type="text" name="respostaIncorreta2" placeholder="Resposta incorreta 2" autocomplete>
                <input type="text" name="URLrespostaIncorreta2" placeholder="URL da imagem 2" autocomplete>
                <input type="text" name="respostaIncorreta3" placeholder="Resposta incorreta 3" autocomplete>
                <input type="text" name="URLrespostaIncorreta3" placeholder="URL da imagem 3" autocomplete>
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

function listaDeVerificacao(array) {
    for (let i = 0; i < array.length; i++) {
        let result = !array[i] ? true : false;
        return result;
    }
}

function checkingDadosPerguntas() {
    let dadosCertos = [];
    let minimoDeRespostaErrada = false;
    const boxDePergunta = document.querySelectorAll(".titulo-bloco");
    let ehValido;

    for (let i = 0; i < boxDePergunta.length; i++) {
        minimoDeRespostaErrada = false;
        const respostaIncorreta = boxDePergunta[i].querySelectorAll(".respostasIncorretas");
        const perguntaTexto = boxDePergunta[i].querySelector(".textoDaPergunta").value;
        const corDaPergunta = boxDePergunta[i].querySelector(".corPergunta").value;
        const textoRespostaCorreta = boxDePergunta[i].querySelector(".respostaCorretaTexto").value;
        const imagemRespostaCorreta = boxDePergunta[i].querySelector(".respostaCorretaImagem").value;
        ehValido = perguntaTexto.length >= 20 && textoRespostaCorreta !== undefined && (imagemRespostaCorreta.startsWith('http://') || imagemRespostaCorreta.startsWith('https://'));

        if(ehValido) {
            console.log("Passou no primeiro if")
            const perguntaDepoisDeNovoValor = {
                title: perguntaTexto,
                color: corDaPergunta,
                answers: []
            }

            const respostaDepoisDeNovoValor = {
                text: textoRespostaCorreta,
                image: imagemRespostaCorreta,
                isCorrectAnswer: true
            }

            perguntaDepoisDeNovoValor.answers.push(respostaDepoisDeNovoValor);

            /* const textoRespostasIncorretas = respostaIncorreta.querySelectorAll(".respostaErradaTexto");
            const imagemRespostasIncorretas = respostaIncorreta.querySelectorAll(".respostaErradaImagem");
            for(let j = 0; j < textoRespostasIncorretas; j++) {
                perguntaDepoisDeNovoValor.answers.push( {
                    text: textoRespostasIncorretas[j].value,
                    image: imagemRespostasIncorretas[j].value,
                    isCorrectAnswer: false
                });
            } */

            const respostaErrada = respostaIncorreta[0].querySelectorAll(".respostaErradaTexto");
            const imagemRespostaErrada = respostaIncorreta[0].querySelectorAll(".respostaErradaImagem");
            for(let k = 0; k < respostaIncorreta.length; k++) {
                ehValido = tituloQuizz.length >= 20 && (imagemRespostaErrada[k].startsWith('http://') || imagemRespostaErrada[k].startsWith('https://'));

                if(ehValido) {
                    const respostaErradaDepoisDeNovoValor = {
                        text: respostaErrada[k].value,
                        image: imagemRespostaErrada[k].value,
                        isCorrectAnswer: false
                    }

                    perguntaDepoisDeNovoValor.answers.push(respostaErradaDepoisDeNovoValor);
                    minimoDeRespostaErrada = true;
                    dadosCertos.push(true);
                } else {
                    //Alerta
                    //perguntaDepoisDeNovoValor.answers = []
                    return;
                }
            }

            dadosCertos.push(true);
            newQuizzUsuario.questions.push(perguntaDepoisDeNovoValor);
        } else {
            dadosCertos.push(false);
        }
    }

    ehValido = lista(dadosCertos);

    if(minimoDeRespostaErrada) {
        console.log("mostrar");
    } else {
        alert("Preencha as informações corretamente!");
    }
}

function checagemRequisitosPerguntas() {
    vaiParaNiveis();
}

/*function checagemPerguntas() {
    for (let i = 0; i < qtdPerguntas; i++) {
        perguntaTitulo = document.querySelector(`.pergunta${i + 1} .numeroPergunta input:nth-child(2)`).value;
        corDeFundoPergunta = document.querySelector(`.pergunta${i + 1} .numeroPergunta input:nth-child(3)`).value;

        if (perguntaTitulo.length >= 20 && corDeFundoPergunta.startsWith('#') && corDeFundoPergunta) {
            checkingRespostaCorreta();
        } else {
            alert("Preencha as informações corretamente!");
        }
    }
}

function checkingRespostaCorreta() {
    for (let i = 0; i < qtdPerguntas; i++) {
        respostaCorreta = document.querySelector(`.pergunta${i + 1} .respostaCorreta input:nth-child(2)`).value;
        URLrespostaCorreta = document.querySelector(`.pergunta${i + 1} .numeroPergunta input:nth-child(3)`).value;

        if (respostaCorreta !== undefined && (URLrespostaCorreta.startsWith('http://') || URLrespostaCorreta.startsWith('https://'))) {
            vaiParaNiveis();            
        } else {
            alert("Preencha as informações corretamente!");
        }
    }     
} */

function vaiParaNiveis() {
    containerFromHTML.innerHTML = `
    <div id="container-settings">
        <h2>Agora, decida os níveis!</h2>
    </div>
    `    

    incluirCaixasNiveis();
}

function incluirCaixasNiveis() {
    telaDecidirNiveis = document.querySelector(".container-settings");

    for(let i = 0; i < qtdNiveis; i++) {
        telaDecidirNiveis.innerHTML += `
        <div class="titulo-bloco">
            <h2>Nível ${i + 1}</h2>
            <input type="text" name="tituloNivel" placeholder="Título do nível">
            <input type="text" name="acertoPorcentagem" placeholder="% de acerto mínima">
            <input type="text" name="URLnivel" placeholder="URL da imagem do nível">
            <input type="text" name="descricaoNivel" placeholder="Descrição do nível">
        </div>
        `
    }
    inserirBotaoFinal();
}

function inserirBotaoFinal() {
    telaDecidirNiveis.innerHTML += `
    <div id="btns-settings" class="quizz-completo" onclick="vaiParaSucessoQuizz()">
        <button>Finalizar Quizz</button>
    </div>
    `
}

function vaiParaSucessoQuizz() {
    containerFromHTML.innerHTML = `
    <div id="container-settings">
        <h2>Comece pelo começo</h2>
        <div>
            <img src="imgs/simpsons.jpg">
            <h3>Acerte os personagens corretos dos Simpsons e prove seu amor!</h3>
        </div>
        <div id="btns-settings">
            <button>Acessar Quizz</button>
        </div>
        <a href="">Voltar pra home</a>
    </div>
    ` 
}