'use strict';

/**
 * ACCESO ROMÁNTICO — KIMBERLY ♡
 * IMPORTANTE: Esta contraseña es una sorpresa visual, NO protección criptográfica.
 * El código del navegador puede ser inspeccionado; no publiques datos privados aquí.
 */
const PALABRA_SECRETA = 'kimberly';
const DURACION_ANIMACION_MS = 3500;

const form = document.querySelector('#unlock-form');
const secretInput = document.querySelector('#secret-word');
const feedback = document.querySelector('#gate-feedback');
const gate = document.querySelector('#gate');
const story = document.querySelector('#story');
const heartScene = document.querySelector('#heart-scene');
const unlockButton = document.querySelector('#unlock-button');
const passwordToggle = document.querySelector('#toggle-password');
const backToLock = document.querySelector('#back-to-lock');
const chapterGrid = document.querySelector('#chapter-grid');
const chapterDialog = document.querySelector('#chapter-dialog');
const closeDialog = document.querySelector('#close-dialog');

let isUnlocking = false;

function wait(ms) { return new Promise(resolve => window.setTimeout(resolve, ms)); }

function normalizar(texto) {
  // Sin distinguir mayúsculas, espacios a los extremos ni acentos.
  return texto.trim().normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase();
}

function showFeedback(message, mode = '') {
  feedback.textContent = message;
  feedback.className = `gate__feedback${mode ? ' is-' + mode : ''}`;
}

form.addEventListener('submit', async (event) => {
  event.preventDefault();
  if (isUnlocking) return;

  if (normalizar(secretInput.value) !== PALABRA_SECRETA) {
    showFeedback('Esa no es la llave correcta… intenta con el nombre de alguien muy especial ♡', 'error');
    secretInput.setAttribute('aria-invalid', 'true');
    gate.classList.remove('is-shaking');
    void gate.offsetWidth; // reinicia el temblor para intentos consecutivos
    gate.classList.add('is-shaking');
    secretInput.focus();
    return;
  }

  isUnlocking = true;
  secretInput.removeAttribute('aria-invalid');
  secretInput.disabled = true;
  passwordToggle.disabled = true;
  unlockButton.disabled = true;
  unlockButton.querySelector('span:first-child').textContent = 'Tu llave está llegando…';
  showFeedback('Sí… solo tú sabes abrir mi corazón. ♡', 'success');

  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (!reducedMotion) {
    heartScene.classList.add('is-unlocking');
    await wait(1850);   // llave se introduce en el candado
    heartScene.classList.add('is-unlocked');
    await wait(DURACION_ANIMACION_MS - 1850);
    gate.classList.add('is-leaving');
    await wait(770);
  }

  gate.hidden = true;
  story.hidden = false;
  window.scrollTo({ top: 0, behavior: 'instant' });
  document.title = 'Nuestra historia ♡ | Kimberly y Moisés';
  story.querySelector('h2').setAttribute('tabindex', '-1');
  story.querySelector('h2').focus({ preventScroll: true });
});

secretInput.addEventListener('input', () => {
  secretInput.removeAttribute('aria-invalid');
  if (feedback.classList.contains('is-error')) showFeedback('Pista: tiene ocho letras y empieza con K ♡');
});

passwordToggle.addEventListener('click', () => {
  const reveal = secretInput.type === 'password';
  secretInput.type = reveal ? 'text' : 'password';
  passwordToggle.setAttribute('aria-label', reveal ? 'Ocultar contraseña' : 'Mostrar contraseña');
  passwordToggle.title = reveal ? 'Ocultar contraseña' : 'Mostrar contraseña';
  secretInput.focus();
});

backToLock.addEventListener('click', () => {
  story.hidden = true;
  gate.hidden = false;
  gate.classList.remove('is-leaving', 'is-shaking');
  heartScene.classList.remove('is-unlocking', 'is-unlocked');
  isUnlocking = false;
  secretInput.value = '';
  secretInput.disabled = false;
  secretInput.removeAttribute('aria-invalid');
  passwordToggle.disabled = false;
  unlockButton.disabled = false;
  unlockButton.querySelector('span:first-child').textContent = 'Abrir mi corazón';
  showFeedback('Pista: tiene ocho letras y empieza con K ♡');
  document.title = 'Para Kimberly ♡ | 8 meses';
  window.scrollTo({ top: 0, behavior: 'instant' });
  secretInput.focus({ preventScroll: true });
});

/*
 * CAPÍTULOS DE PRUEBA. Reemplaza la frase de cada carta por su historia real.
 * El capítulo K ya trae una carta de ejemplo; los otros son bocetos.
 */
const chapters = [
  { letter: 'K', icon: '🐨', title: 'K de Koala', text: [
    'Mi niña hermosa:',
    'Si un koalita pudiera llevarte una carta, la llenaría de abrazos de esos que no se quieren terminar. Gracias por estos ocho meses tan especiales.',
    'Este es apenas el comienzo de nuestro pequeño universo. ♡'
  ] },
  { letter: 'I', icon: '💌', title: 'I de Instantes', text: ['Aquí pondremos ese instante en el que empezó todo. Nuestro primer recuerdo favorito merece su propia carta. ♡'] },
  { letter: 'M', icon: '🎮', title: 'M de Minecraft', text: ['Incluso entre mundos de bloques, hay aventuras que se vuelven inolvidables. Aquí añadiremos nuestras capturas y recuerdos jugando. ♡'] },
  { letter: 'B', icon: '💋', title: 'B de Besitos', text: ['Aquí guardaremos esos besitos, abrazos y momentos en los que el tiempo parecía ir más despacio. ♡'] },
  { letter: 'E', icon: '✨', title: 'E de Encuentros', text: ['Cada encuentro puede tener una historia. Pronto llenaremos este capítulo con nuestras anécdotas reales. ♡'] },
  { letter: 'R', icon: '📸', title: 'R de Recuerdos', text: ['Nuestras fotos favoritas y las pequeñas cosas que nunca queremos olvidar vivirán aquí. ♡'] },
  { letter: 'L', icon: '💗', title: 'L de Lo que amo', text: ['Una carta para contar esas cositas que admiro de ti, las que hacen que cada día me encantes más. ♡'] },
  { letter: 'Y', icon: '🌷', title: 'Y de Yo te elijo', text: ['Porque amar también significa seguir eligiéndonos. Aquí escribiremos el final más especial de esta sorpresa. ♡'] }
];

chapters.forEach((chapter, index) => {
  const tile = document.createElement('button');
  tile.type = 'button';
  tile.className = 'chapter-tile';
  tile.setAttribute('aria-label', `Abrir letra ${chapter.letter}: ${chapter.title}`);
  tile.innerHTML = `<span class="chapter-tile__letter"></span><span class="chapter-tile__emoji"></span><span class="chapter-tile__name"></span>`;
  tile.querySelector('.chapter-tile__letter').textContent = chapter.letter;
  tile.querySelector('.chapter-tile__emoji').textContent = chapter.icon;
  tile.querySelector('.chapter-tile__name').textContent = chapter.title.substring(5);
  tile.addEventListener('click', () => openChapter(chapter, index));
  chapterGrid.appendChild(tile);
});

function openChapter(chapter, index) {
  document.querySelector('#dialog-symbol').textContent = chapter.icon;
  document.querySelector('#dialog-eyebrow').textContent = `Capítulo ${index + 1} de 8`;
  document.querySelector('#dialog-heading').textContent = chapter.title;
  const body = document.querySelector('#dialog-body');
  body.replaceChildren();
  chapter.text.forEach(line => {
    const p = document.createElement('p');
    p.textContent = line;
    body.appendChild(p);
  });
  chapterDialog.showModal();
}

closeDialog.addEventListener('click', () => chapterDialog.close());
chapterDialog.addEventListener('click', (event) => {
  if (event.target === chapterDialog) chapterDialog.close();
});

// Corazoncitos de ambiente: posiciones fijas para evitar resultados invasivos.
const container = document.querySelector('#floating-hearts');
const positions = [5, 15, 26, 39, 53, 64, 76, 88, 95];
positions.forEach((left, i) => {
  const el = document.createElement('span');
  el.className = 'float-heart';
  el.textContent = i % 3 === 0 ? '♥' : '♡';
  el.style.setProperty('--left', `${left}%`);
  el.style.setProperty('--duration', `${14 + (i * 3) % 13}s`);
  el.style.setProperty('--delay', `${-i * 2.9}s`);
  el.style.setProperty('--size', `${11 + (i * 5) % 15}px`);
  container.appendChild(el);
});
