const presente = document.getElementById('presente-container');
const carta = document.getElementById('carta-container');
const botaoFoto = document.getElementById('ver-foto-btn');
const foto = document.getElementById('foto-container');
const videoFinal = document.getElementById('video-final');

const enigmaGeralContainer = document.getElementById('enigma-geral-container');
const todosEnigmasBox = document.querySelectorAll('.enigma-box');

const enigmaTextoContainer = document.getElementById('enigma-texto-container');
const verificarTextoBtn = enigmaTextoContainer.querySelector('.verificar-btn');
const respostaTextoInput = enigmaTextoContainer.querySelector('.resposta-enigma');

const enigmaCodigoContainer = document.getElementById('enigma-codigo-container');
const tecladoNumerico = document.getElementById('teclado-numerico');
const displayCodigo = document.getElementById('codigo-display');
const limparCodigoBtn = document.getElementById('limpar-codigo-btn');
const verificarCodigoBtn = enigmaCodigoContainer.querySelector('.verificar-btn');
let codigoAtual = "";

const enigmaCliqueContainer = document.getElementById('enigma-clique-container');
const opcoesCliqueContainer = document.getElementById('opcoes-clique-container');

const enigmaSimNaoContainer = document.getElementById('enigma-sim-nao-container');
const botaoSim = enigmaSimNaoContainer.querySelector('.sim');
const botaoNao = enigmaSimNaoContainer.querySelector('.nao');

const btnSteam = document.getElementById('btn-steam');
const cenaSteamContainer = document.getElementById('cena-steam-container');

const minhasFotos = [
    'imagens/AURA.jpeg',
    'imagens/CJ.jpg',
    'imagens/EueCasca.png',
    'imagens/nois.png',
    'imagens/mengao.jpg',
    'imagens/ingrid.png',
    'imagens/roblox-twerk.gif'
];
let fotoAtualIndex = 0;
const imagemCarrossel = document.getElementById('imagem-carrossel');
const btnAnterior = document.getElementById('btn-anterior');
const btnProximo = document.getElementById('btn-proximo');

const enigmas = [
    {
        tipo: 'texto',
        pergunta: "Quem é o top 2 cara que você mais ama no mundo?",
        resposta: "raniery"
    },
    {
        tipo: 'codigo',
        pergunta: "Qual o ano que uma mulher MUITOOO importante na minha vida nasceu? ps: n sei quando a penelope nasceu ent vai outra msm...",
        resposta: "2006"
    },
    {
        tipo: 'clique',
        pergunta: "Você gostaria de?",
        opcoes: ["Pedir perdão por sempre ser uma idiota", "Nada", "Matar você!"],
        resposta: "Pedir perdão por sempre ser uma idiota"
    },
    {
        tipo: 'sim-nao',
        pergunta: "Você já passou na USP/ você me ama muito? (as duas tem a msm resposta)",
        resposta: "sim"
    }
];

let enigmaAtual = 0;

function mostrarEnigma() {
    foto.classList.add('escondido');
    todosEnigmasBox.forEach(box => box.classList.add('escondido'));

    const enigma = enigmas[enigmaAtual];
    let containerAtivo;

    if (enigma.tipo === 'texto') {
        containerAtivo = enigmaTextoContainer;
    } else if (enigma.tipo === 'codigo') {
        containerAtivo = enigmaCodigoContainer;
        codigoAtual = "";
        atualizarDisplayCodigo();
    } else if (enigma.tipo === 'clique') {
        containerAtivo = enigmaCliqueContainer;
        opcoesCliqueContainer.innerHTML = "";
        enigma.opcoes.forEach(opcao => {
            const botaoOpcao = document.createElement('button');
            botaoOpcao.className = 'opcao-clique';
            botaoOpcao.textContent = opcao;
            botaoOpcao.onclick = () => verificarRespostaClique(opcao);
            opcoesCliqueContainer.appendChild(botaoOpcao);
        });
    } else if (enigma.tipo === 'sim-nao') {
        containerAtivo = enigmaSimNaoContainer;
        botaoSim.onclick = null;
        botaoNao.onclick = null;
        botaoNao.addEventListener('mouseover', () => {
            botaoNao.textContent = "Sim";
            botaoNao.style.backgroundColor = '#4CAF50';
        });
        botaoNao.addEventListener('mouseout', () => {
            botaoNao.textContent = "Não";
            botaoNao.style.backgroundColor = '#f44336';
        });
        botaoSim.onclick = () => verificarRespostaSimNao('sim');
        botaoNao.onclick = () => verificarRespostaSimNao('sim');
    }

    containerAtivo.classList.remove('escondido');
    containerAtivo.querySelector('.contador-enigma').textContent = `Checagem de Q.I ${enigmaAtual + 1} de ${enigmas.length}`;
    containerAtivo.querySelector('.pergunta-enigma').textContent = enigma.pergunta;
    containerAtivo.querySelector('.feedback-errado').classList.add('escondido');
    containerAtivo.querySelector('.feedback-errado').textContent = "Resposta errada. o sua burroide!";
}

function avancarEnigma() {
    enigmaAtual++;
    if (enigmaAtual < enigmas.length) {
        mostrarEnigma();
    } else {
        enigmaGeralContainer.classList.add('escondido');

         setTimeout(() => {
        presente.classList.remove('escondido');
    }, 1000);
    }
}

verificarTextoBtn.onclick = () => {
    if (respostaTextoInput.value.toLowerCase().trim() === enigmas[enigmaAtual].resposta.toLowerCase().trim()) {
        avancarEnigma();
    } else {
        enigmaTextoContainer.querySelector('.feedback-errado').classList.remove('escondido');
    }
};

verificarCodigoBtn.onclick = () => {
    if (codigoAtual === enigmas[enigmaAtual].resposta) {
        avancarEnigma();
    } else {
        enigmaCodigoContainer.querySelector('.feedback-errado').classList.remove('escondido');
    }
};

function verificarRespostaClique(opcaoClicada) {
    if (opcaoClicada === enigmas[enigmaAtual].resposta) {
        avancarEnigma();
    } else {
        const feedback = enigmaCliqueContainer.querySelector('.feedback-errado');
        feedback.textContent = `"${opcaoClicada}" não é a resposta certa... burroide!`;
        feedback.classList.remove('escondido');
    }
}

function verificarRespostaSimNao(respostaRecebida) {
    if (respostaRecebida === enigmas[enigmaAtual].resposta) {
        avancarEnigma();
    } else {
        enigmaSimNaoContainer.querySelector('.feedback-errado').classList.remove('escondido');
    }
}

function mostrarFoto(index) {
    imagemCarrossel.src = minhasFotos[index];
}

btnProximo.onclick = () => {
    fotoAtualIndex++;
    if (fotoAtualIndex >= minhasFotos.length) {
        fotoAtualIndex = 0;
    }
    mostrarFoto(fotoAtualIndex);
};

btnAnterior.onclick = () => {
    fotoAtualIndex--;
    if (fotoAtualIndex < 0) {
        fotoAtualIndex = minhasFotos.length - 1;
    }
    mostrarFoto(fotoAtualIndex);
};

for (let i = 1; i <= 9; i++) {
    const tecla = document.createElement('button');
    tecla.textContent = i;
    tecla.className = 'tecla';
    tecla.onclick = () => adicionarDigito(i);
    tecladoNumerico.appendChild(tecla);
}
const teclaZero = document.createElement('button');
teclaZero.textContent = 0;
teclaZero.className = 'tecla';
teclaZero.style.gridColumn = "2";
teclaZero.onclick = () => adicionarDigito(0);
tecladoNumerico.appendChild(teclaZero);

function adicionarDigito(digito) {
    if (codigoAtual.length < 4) {
        codigoAtual += digito;
        atualizarDisplayCodigo();
    }
}

limparCodigoBtn.onclick = () => {
    codigoAtual = "";
    atualizarDisplayCodigo();
};

function atualizarDisplayCodigo() {
    displayCodigo.textContent = codigoAtual.padEnd(4, '-');
}

let mouseX = 0, mouseY = 0;
let lastMouseX = 0, lastMouseY = 0;
let mouseSpeed = 0;
const speedThreshold = 5;
window.addEventListener('mousemove', (e) => { mouseX = e.pageX; mouseY = e.pageY; });
setInterval(() => { const distancia = Math.sqrt(Math.pow(mouseX - lastMouseX, 2) + Math.pow(mouseY - lastMouseY, 2)); mouseSpeed = Math.round(distancia); lastMouseX = mouseX; lastMouseY = mouseY; }, 100);
presente.addEventListener('mouseover', () => { if (mouseSpeed > speedThreshold) { const larguraJanela = window.innerWidth; const alturaJanela = window.innerHeight; const larguraBotao = presente.offsetWidth; const alturaBotao = presente.offsetHeight; const novaPosicaoX = Math.floor(Math.random() * (larguraJanela - larguraBotao)); const novaPosicaoY = Math.floor(Math.random() * (alturaJanela - alturaBotao)); presente.style.left = novaPosicaoX + 'px'; presente.style.top = novaPosicaoY + 'px'; } });

presente.addEventListener('click', () => {
    presente.classList.add('aberto');
    setTimeout(() => {
        presente.classList.add('escondido');
        foto.classList.add('escondido'); // <-- ADICIONE ESTA LINHA AQUI TAMBÉM
        document.getElementById('cena-da-carta').classList.remove('escondido');
        carta.classList.add('carta-aparecendo');
    }, 500);
});

botaoFoto.addEventListener('click', () => {
    document.getElementById('cena-da-carta').classList.add('escondido');
    foto.classList.remove('escondido');
    mostrarFoto(0);
    videoFinal.volume = 0.1;
    videoFinal.play();
});

btnSteam.addEventListener('click', () => {
    foto.classList.add('escondido');
    videoFinal.pause(); 
    cenaSteamContainer.classList.remove('escondido');
});

mostrarEnigma();