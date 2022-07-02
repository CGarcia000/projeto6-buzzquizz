const href = "https://mock-api.driven.com.br/api/v7/buzzquizz/quizzes"
const id_test = "90"

const body = document.querySelector('div');

const quizzPromise = axios.get(`${href}/${id_test}`);
quizzPromise.then(res => {
    const quizz = res.data;
    console.log(quizz);
    montaQuizz(quizz);
});
quizzPromise.catch(e => {
    console.log(e)
});

function montaQuizz(quizz) {
    body.innerHTML = '';
    
    const quizzHeader = document.createElement('div');
    quizzHeader.setAttribute("id", "header-quizz");
    quizzHeader.style.backgroundImage = `url(${quizz.image})`;
    quizzHeader.innerText = quizz.title;
    body.appendChild(quizzHeader);

    
    const containerPerguntas = document.createElement('div');
    containerPerguntas.setAttribute("id", "conteiner-perguntas");
    
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

        for (let j = 0; j < perguntaLoop.answers.length; j++) {
            const opcao = criaOpcao(perguntaLoop.answers[j]);
            opcoes.appendChild(opcao);
        }

        pergunta.append(opcoes);

    //     console.log(perguntaLoop.answers);
    //     containerPerguntas.innerHTML += `
    //     <div class="e">
    //         <div class="titulo-pergunta" style="background-color: ${perguntaLoop.color};">
    //             ${perguntaLoop.title}
    //         </div>
    //         <div class="opcoes">

    //             <div class="opcao">
    //                 <img src="${perguntaLoop.answers[0].image}" alt="">
    //                 <span>${perguntaLoop.answers[0].text}</span>
    //             </div>

    //             <div class="opcao">
    //                 <img src="${perguntaLoop.answers[1].image}" alt="">
    //                 <span>${perguntaLoop.answers[1].text}</span>
    //             </div>

    //             <div class="opcao">
    //                 <img src="${perguntaLoop.answers[2].image}" alt="">
    //                 <span>${perguntaLoop.answers[2].text}</span>
    //             </div>

    //             <div class="opcao">
    //                 <img src="${perguntaLoop.answers[3].image}" alt="">
    //                 <span>${perguntaLoop.answers[3].text}</span>
    //             </div>
    //         </div>
    //     </div>
    //     `
        containerPerguntas.append(pergunta);
    }


    body.appendChild(containerPerguntas);

    // getResposta(quizz);
}


function criaOpcao(answer) {
    // criar um objeto q vai ter a opcao e se ela é correta ou n, ai dá pra fazer essa discriminação entre as options;

    const opcao = document.createElement('div');
    opcao.classList.add('opcao')

    const img = document.createElement('img');
    img.src = answer.image;
    opcao.appendChild(img);


    const span = document.createElement('span');
    span.innerText = answer.text;
    opcao.appendChild(span);

    opcao.addEventListener('click', () => {
        listenerOpcao(answer, opcao)
    })

    return opcao;
}

function listenerOpcao(objAnswer, opcao) {
    retiraELPergunta(opcao.parentElement);
    opcao.parentElement.classList.add('respondida');
    opcao.classList.add('selecionada');
    if (objAnswer.isCorrectAnswer) opcao.classList.add('correta');
}

function getResposta(quizz) {
    const opcoes = document.getElementsByClassName('opcao');
    for (let i = 0; i < opcoes.length; i++) {
        const opcao = opcoes[i];
        console.log(opcao.childNodes[3]);
        // if (opcao.childNodes[1].currentSrc == quizz.)

    }
}

function retiraELPergunta(parent) {
    const arrOpcoes = parent.childNodes;
    
}