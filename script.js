
const botaoSim = document.getElementById('sim');
const botaoNao = document.getElementById('nao');
const arena = document.getElementById('arena');
const dica = document.getElementById('dica');
const pergunta = document.getElementById('pergunta');
const resultado = document.getElementById('resultado');

let tentativas = 0;
const totalTentativas = 5;

function moverBotao() {
  const margem = 8;
  const limiteX = Math.max(margem, arena.clientWidth - botaoSim.offsetWidth - margem);
  const limiteY = Math.max(margem, arena.clientHeight - botaoSim.offsetHeight - margem);
  const limiteNao = botaoNao.getBoundingClientRect();

  let x, y, encostouNoNao;
  let verificacoes = 0;

  do {
    x = Math.round(margem + Math.random() * (limiteX - margem));
    y = Math.round(margem + Math.random() * (limiteY - margem));

    const area = arena.getBoundingClientRect();
    const novaEsquerda = area.left + x;
    const novoTopo = area.top + y;
    const distancia = 10;

    encostouNoNao = !(
      novaEsquerda + botaoSim.offsetWidth + distancia < limiteNao.left ||
      novaEsquerda > limiteNao.right + distancia ||
      novoTopo + botaoSim.offsetHeight + distancia < limiteNao.top ||
      novoTopo > limiteNao.bottom + distancia
    );
    verificacoes++;
  } while (encostouNoNao && verificacoes < 50);

  botaoSim.style.left = `${x}px`;
  botaoSim.style.top = `${y}px`;
}

function tentarSim(evento) {
  evento.preventDefault();
  tentativas++;

  if (tentativas >= totalTentativas) {
    pergunta.textContent = 'Você conquistou meu coração! ❤️';
    dica.hidden = true;
    arena.hidden = true;
    resultado.hidden = false;
    return;
  }

  const frases = [
    'Ops, escapou! 😂',
    'Quase! Tenta de novo 💕',
    'Tá difícil me pegar, hein? 👀',
    'Agora você consegue! 😘'
  ];
  dica.textContent = frases[tentativas - 1];
  moverBotao();
}


botaoSim.addEventListener('pointerdown', tentarSim);

botaoSim.addEventListener('click', (evento) => {
  if (evento.detail === 0) tentarSim(evento);
});

botaoNao.addEventListener('click', () => {
  dica.textContent = 'Eita! Acho que você queria apertar o outro 😅';
});