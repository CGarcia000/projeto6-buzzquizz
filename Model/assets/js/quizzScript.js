const href = "https://mock-api.driven.com.br/api/v7/buzzquizz/quizzes"

const body = document.querySelector('div');
let containerPerguntas;

let pontuacao = 0;
const arrTdsOpcoes = [];

function chamaPromisse(id_test) {
    const quizzPromise = axios.get(`${href}/${id_test}`);
    quizzPromise.then(res => {
        const quizz = res.data;
        montaQuizz(quizz);
    });
    quizzPromise.catch(e => {
        console.log(e)
    });
}


function montaQuizz(quizz) {
    body.innerHTML = '';
    
    const quizzHeader = document.createElement('div');
    quizzHeader.setAttribute("id", "header-quizz");
    quizzHeader.style.backgroundImage = `url(${quizz.image})`;
    quizzHeader.innerText = quizz.title;
    body.appendChild(quizzHeader);

    
    containerPerguntas = document.createElement('div');
    containerPerguntas.setAttribute("id", "conteiner-perguntas");

    pontoPergunta = 100/quizz.questions.length;

    for (let i = 0; i < quizz.questions.length; i++) {
        const perguntaLoop = quizz.questions[i];
        perguntaLoop.answers.sort(() => 0.5 - Math.random());
        for (let i = 0; i < perguntaLoop.answers.length; i++) perguntaLoop.answers[i].loc = i;
        
        const pergunta = document.createElement('div');
        pergunta.classList.add('pergunta');

        // tag titulo-pergunta
        const tituloPergunta = document.createElement('div');
        tituloPergunta.classList.add('titulo-pergunta');
        tituloPergunta.style.backgroundColor = perguntaLoop.color;
        tituloPergunta.innerText = perguntaLoop.title;

        pergunta.appendChild(tituloPergunta);

        const opcoes = document.createElement('div');
        opcoes.classList.add('opcoes');

        const arrOpcoesPergunta = [];

        for (let j = 0; j < perguntaLoop.answers.length; j++) {
            const { opcao, objOpcao } = criaOpcao(perguntaLoop.answers[j], pontoPergunta);
            objOpcao.pergunta = i;
            arrOpcoesPergunta.push(objOpcao);
            opcoes.appendChild(opcao);
        }

        arrTdsOpcoes.push(arrOpcoesPergunta)
        pergunta.append(opcoes);

        containerPerguntas.append(pergunta);
    }
    body.appendChild(containerPerguntas);

    checkCompleto(quizz);
}

function criaOpcao(answer, pontoPergunta) {
    const objOpcao = {};

    const opcao = document.createElement('div');
    opcao.classList.add('opcao')

    const img = document.createElement('img');
    img.src = answer.image;
    opcao.appendChild(img);


    const span = document.createElement('span');
    span.innerText = answer.text;
    opcao.appendChild(span);

    opcao.addEventListener('click', () => {
        listenerOpcao(opcao, objOpcao, pontoPergunta);
    })

    objOpcao.domEl = opcao;
    objOpcao.isCorrect = answer.isCorrectAnswer == 'false'? false : answer.isCorrectAnswer;

    return {opcao, objOpcao};
}

function listenerOpcao(opcao, infoOpcoes, pontoPergunta) {
    opcao.parentElement.classList.add('respondida');
    opcao.classList.add('selecionada');
    verificaCorreta(infoOpcoes, pontoPergunta);
}

function verificaCorreta(infoOpcao, pontoPergunta) {
    const arrOpcoesPergunta = arrTdsOpcoes[infoOpcao.pergunta];
    for (let i = 0; i < arrOpcoesPergunta.length; i++) {
        if (arrOpcoesPergunta[i].isCorrect) {
            arrOpcoesPergunta[i].domEl.classList.add('correta');
        }

        if (arrOpcoesPergunta[i].domEl.classList.value.includes('correta')
            && arrOpcoesPergunta[i].domEl.classList.value.includes('selecionada')) {
                pontuacao += pontoPergunta;
            }
        
        arrOpcoesPergunta[i].domEl.replaceWith(arrOpcoesPergunta[i].domEl.cloneNode(true)); 
    }
}

function checkCompleto(quizz) {
    const intervalCheck = setInterval(() => {
        const perguntasRespondidas = document.querySelectorAll('.respondida');
        if (perguntasRespondidas.length === arrTdsOpcoes.length && arrTdsOpcoes.length !== 0) {
            fimQuizz(quizz, intervalCheck);
        }
    }, 100);
}

function fimQuizz(quizz, intervalCheck) {
    clearInterval(intervalCheck);

    pontuacao = Math.round(pontuacao);

    const levels = quizz.levels;
    for(let i = 0; i < levels.length; i++) {
        if (pontuacao > levels[levels.length - i - 1].minValue) {
            containerPerguntas.innerHTML += `
            <div id="resposta">
                <div id="titulo-resp">
                    ${levels[levels.length - i - 1].title}
                </div>
        
                <div>
                    <img src="${levels[levels.length - i - 1].image}" alt="">
        
                    <p>${levels[levels.length - i - 1].text}</p>
                </div>
            </div>
            `
        }
    }

    if (!containerPerguntas.innerHTML.includes('<div id="resposta">')) {
        containerPerguntas.innerHTML += `
            <div id="resposta">
                <div id="titulo-resp">
                    ${levels[0].title}
                </div>
        
                <div>
                    <img src="${levels[0].image}" alt="">
        
                    <p>${levels[0].text}</p>
                </div>
            </div>
            `
    }

    body.innerHTML += `
    <div id="btns-retorno" class="">
        <button onclick="reinicia()">Reiniciar Quizz</button>

        <a href="index.html">Voltar pra home</a>
    </div>
    `  
}

function reinicia() {
    window.location.reload();
}


chamaPromisse(99);