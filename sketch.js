//variavel bolinha
let xBolinha = 300;
let yBolinha = 200;
let diametro = 20;
let raio = diametro / 2;

//variavel movimento bolinha
let velocidadeXBolinha = 6;
let velocidadeYBolinha = 6;

//variavel raquete
let xRaquete = 5;
let yRaquete = 150;
let comprimentoRaquete = 10;
let alturaRaquete = 90;

//variavel colisao
colidiu = false;

//raquete Oponente
let xRaqueteOponente = 585;
let yRaqueteOponente = 150;

//placar
let meusPontos = 0;
let pontosOponente = 0;

function preload() {
  trilha = loadSound('trilha.mp3');
  ponto = loadSound('ponto.mp3');
  raquetada = loadSound('raquetada.mp3');
}

function setup() {
  createCanvas(600, 400);
  trilha.loop();
}

function draw() {
  background(0);
  bolinha();
  movimentaBolinha();
  colisaoBolinha();
  raquete(xRaquete, yRaquete);
  movimentaRaquete();
  colisaoRaquete(xRaquete, yRaquete);
  colisaoRaquete(xRaqueteOponente, yRaqueteOponente);
  raquete(xRaqueteOponente, yRaqueteOponente);
  movimentaRaqueteOponente();
  mostrarPontos();
  marcarPontos();
  bolinhaNaoFicaPresa();
}

function bolinha() {
  circle(xBolinha, yBolinha, diametro);
}

function movimentaBolinha() {
  xBolinha += velocidadeXBolinha;
  yBolinha += velocidadeYBolinha;
}

function colisaoBolinha() {
  if (xBolinha + raio > width || xBolinha - raio < 0) {
    velocidadeXBolinha *= -1;
  }
  if (yBolinha + raio > height || yBolinha - raio < 0) {
    velocidadeYBolinha *= -1;
  }
}

function raquete(x, y) {
  rect(x, y, comprimentoRaquete, alturaRaquete);
}

function movimentaRaquete() {
  if (keyIsDown(UP_ARROW)) {
    yRaquete -= 10;
  }
  if (keyIsDown(DOWN_ARROW)) {
    yRaquete += 10;
  }
}

function movimentaRaqueteOponente() {
  if (keyIsDown(87)) {
    yRaqueteOponente -= 10;
  }
  if (keyIsDown(83)) {
    yRaqueteOponente += 10;
  }
}

function colisaoRaquete(x, y) {
  colidiu = collideRectCircle(
    x,
    y,
    comprimentoRaquete,
    alturaRaquete,
    xBolinha,
    yBolinha,
    raio
  );
  if (colidiu) {
    velocidadeXBolinha *= -1;
    raquetada.play();
  }
}

function mostrarPontos() {
  stroke(255);
  textAlign(CENTER);
  textSize(16);
  fill(color(255, 140, 0));
  rect(150, 10, 40, 20);
  fill(255);
  text(meusPontos, 170, 26);
  fill(color(255, 140, 0));
  rect(450, 10, 40, 20);
  fill(255);
  text(pontosOponente, 470, 26);
}

function marcarPontos() {
  if (xBolinha > 590) {
    meusPontos += 1;
    ponto.play();
  }
  if (xBolinha < 10) {
    pontosOponente += 1;
    ponto.play();
  }
}
