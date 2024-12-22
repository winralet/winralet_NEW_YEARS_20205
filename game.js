const startBtn = document.querySelector('#start');
const screens = document.querySelectorAll('.screen');
const timelist = document.querySelector('#time-list');
const timeEl = document.querySelector('#time');
const board = document.querySelector('#board');

let time = 0;
let score = 0;

// Массив с URL-адресами изображений
const images = [
    'textyr/free-icon-snowball-4045380.png',
    'textyr/free-icon-snowball-4045939.png',
    'textyr/free-icon-snowball-6504043.png',
    // Добавьте сюда другие URL-адреса изображений
];

startBtn.addEventListener('click', (event) => {
    event.preventDefault();
    screens[0].classList.add('up');
});

timelist.addEventListener('click', event => {
    if (event.target.classList.contains('time-btn')) {
        time = parseInt(event.target.getAttribute('data-time'));
        screens[1].classList.add('up');
        startgame();
    }
});

board.addEventListener('click', event => {
    if (event.target.classList.contains('circle')) {
        score++;
        event.target.remove();
        createRandomCircle();
    }
});

function startgame() {
    setInterval(decreaseTime, 1000);
    createRandomCircle();
    timeEl.innerHTML = `00:${time}`;
}

function decreaseTime() {
    if (time === 0) {
        finishGame();
    } else {
        let current = --time;
        if (current < 10) {
            current = `0${current}`;
        }
        setTime(current);
    }
}

function setTime(value) {
    timeEl.innerHTML = `00:${value}`;
}

function finishGame() {
  timeEl.parentNode.classList.add('hide');
  board.innerHTML = `<h1>ваш счет: <span class="primary"> ${score}</span></h1>`;

  setTimeout(() => {
      window.location.href = 'index.html'; 
  }, 3000); 
}

function createRandomCircle() {
    const circle = document.createElement('img'); // Создаем элемент img
    const size = getRandomNumber(30, 60); // Устанавливаем размер изображения
    const { width, height } = board.getBoundingClientRect();
    const x = getRandomNumber(0, width - size);
    const y = getRandomNumber(0, height - size);

    // Выбираем случайное изображение из массива
    const randomImage = images[Math.floor(Math.random() * images.length)];
    
    circle.src = randomImage; // Устанавливаем источник изображения
    circle.style.width = `${size}px`;
    circle.style.height = `${size}px`;
    circle.style.position = 'absolute'; // Устанавливаем позицию
    circle.style.top = `${y}px`;
    circle.style.left = `${x}px`;
    circle.classList.add('circle'); // Добавляем класс для стилей

    board.append(circle);
}

function getRandomNumber(min, max) {
    return Math.round(Math.random() * (max - min) + min);
}