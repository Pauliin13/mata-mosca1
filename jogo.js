let altura = 0;
let largura = 0;
let vidas = 1;
let tempo = 15;
let criaMoscaTempo = 1500;

// Obtém o nível da URL
const params = new URLSearchParams(window.location.search);
let nivel = params.get('nivel');

if (nivel) {
  nivel = nivel.toLowerCase();

  switch (nivel) {
    case 'normal':
      criaMoscaTempo = 1500;
      console.log("Criando mosca com intervalo de " + criaMoscaTempo);
      break;
    case 'difícil':
    case 'dificil': // aceita ambas versões
      criaMoscaTempo = 1000;
      console.log("Criando mosca com intervalo de " + criaMoscaTempo);
      break;
    case 'bagulho doido':
    case 'bagulho_doido': // alternativa com underline
      criaMoscaTempo = 750;
      console.log("Criando mosca com intervalo de " + criaMoscaTempo);
      break;
    default:
      alert("Nível desconhecido. O jogo usará o nível 'normal'.");
  }
} else {
  alert("Nenhum nível foi selecionado.");
}

// Ajusta o tamanho do palco do jogo
function ajustaTamanhoPalcoJogo() {
  altura = window.innerHeight;
  largura = window.innerWidth;
}

ajustaTamanhoPalcoJogo();
window.addEventListener('resize', ajustaTamanhoPalcoJogo);

// Atualiza o cronômetro na tela
document.getElementById('cronometro').innerHTML = tempo;

// Cronômetro regressivo
const cronometro = setInterval(() => {
  tempo--;
  if (tempo < 0) {
    clearInterval(cronometro);
    clearInterval(criaMosca);
    window.location.href = 'vitoria.html';
  } else {
    document.getElementById('cronometro').innerHTML = tempo;
  }
}, 1000);

// Cria uma nova mosca a cada X milissegundos
const criaMosca = setInterval(posicaoRandomica, criaMoscaTempo);

// Posiciona mosca em local aleatório da tela
function posicaoRandomica() {
  const moscaExistente = document.getElementById('mosca');
  if (moscaExistente) {
    moscaExistente.remove();

    if (vidas > 3) {
      window.location.href = 'fim_de_jogo.html';
      return;
    }

    document.getElementById(`v${vidas}`).src = "imagens/coracao_vazio.png";
    vidas++;
  }

  let posicaoX = Math.floor(Math.random() * largura) - 90;
  let posicaoY = Math.floor(Math.random() * altura) - 90;
  posicaoX = Math.max(0, posicaoX);
  posicaoY = Math.max(0, posicaoY);

  const mosca = document.createElement('img');
  mosca.src = 'imagens/mosca.png';
  mosca.className = `${tamanhoAleatorio()} ${ladoAleatorio()}`;
  mosca.style.left = `${posicaoX}px`;
  mosca.style.top = `${posicaoY}px`;
  mosca.style.position = 'absolute';
  mosca.id = 'mosca';
  mosca.onclick = function () {
    this.remove();
  };

  document.body.appendChild(mosca);
}

// Retorna uma classe de tamanho aleatório
function tamanhoAleatorio() {
  const classe = Math.floor(Math.random() * 3) + 1; // 1, 2 ou 3
  return `mosca${classe}`;
}

// Retorna uma classe de lado aleatório
function ladoAleatorio() {
  return Math.random() < 0.5 ? 'ladoA' : 'ladoB';

// Função para tocar o som de clique
function tocarSomClique() {
  const som = new Audio('imagens/som/click.mp3');
  som.play();
}


// Função para tocar o som de vitória
function tocarSomVitoria() {
  const som = new Audio('imagens/som/vitoria.mp3');
  som.play();
}






// Função para tocar o som de perda
function tocarSomPerda() {
  const som = new Audio('App/sons/derrota.mp3');
  som.play();
}

// Altere o código do clique na mosca para tocar o som
mosca.onclick = function () {
  tocarSomClique(); // toca o som de clique
  this.remove();
};

// Quando o jogo terminar, adicione o som de vitória ou derrota
if (tempo < 0) {
  clearInterval(cronometro);
  clearInterval(criaMosca);
  tocarSomVitoria();  // toca o som de vitória
  window.location.href = 'vitoria.html';
} else if (vidas > 3) {
  window.location.href = 'fim_de_jogo.html';
  tocarSomPerda();  // toca o som de perda
}





}
