(function() {
    var requestAnimationFrame = window.requestAnimationFrame || window.mozRequestAnimationFrame || window.webkitRequestAnimationFrame || window.msRequestAnimationFrame ||
    function(callback) {
        window.setTimeout(callback, 1000 / 60);
    };
    window.requestAnimationFrame = requestAnimationFrame;
})();

var flakes = [],
    canvas = document.getElementById("canvas"),
    ctx = canvas.getContext("2d"),
    flakeCount = 1000;

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

function snow() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    for (var i = 0; i < flakeCount; i++) {
        var flake = flakes[i];

        flake.y += flake.velY;

        if (flake.y >= canvas.height) {
            reset(flake);
        }

        ctx.beginPath();
        ctx.arc(flake.x, flake.y, flake.size, 0, Math.PI * 2);
        ctx.fillStyle = "rgba(255,255,255," + flake.opacity + ")";
        ctx.fill();
    }
    requestAnimationFrame(snow);
}

function reset(flake) {
    flake.x = Math.floor(Math.random() * canvas.width);
    flake.y = 0;
    flake.size = (Math.random() * 3) + 2;
    flake.speed = (Math.random() * 1) + 0.5;
    flake.velY = flake.speed;
    flake.opacity = (Math.random() * 0.5) + 0.3;
}

function init() {
    for (var i = 0; i < flakeCount; i++) {
        var x = Math.floor(Math.random() * canvas.width),
            y = Math.floor(Math.random() * canvas.height),
            size = (Math.random() * 3) + 2,
            speed = (Math.random() * 1) + 0.5,
            opacity = (Math.random() * 0.5) + 0.3;

        flakes.push({
            speed: speed,
            velY: speed,
            x: x,
            y: y,
            size: size,
            opacity: opacity
        });
    }

    snow();
};

window.addEventListener("resize", function() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
});

init();


const scrollButton = document.getElementById('scroll-btn');
if (scrollButton) {
    scrollButton.addEventListener('click', () => {
        // Разрешить прокрутку


        // Изменить размер окна (например, увеличить высоту)
        document.body.style.height = '2000px'; // Увеличиваем высоту страницы

        // Прокрутить до конца страницы с задержкой
        setTimeout(() => {
            window.scrollTo({
                top: document.body.scrollHeight,
                behavior: "smooth"
            });

            // Создание золотых кругов после прокрутки
            createGoldCircles();
        }, 50); // Задержка перед началом прокрутки
    });
}

let christmasStart = new Date('2025/01/01 00:00:00');

let countdownInterval = null;
let countdownTimeout = null;

function getTimeRemaining(deadline) {
    const total = Date.parse(deadline) - Date.parse(new Date());
    const seconds = Math.floor((total / 1000) % 60);
    const minutes = Math.floor((total / 1000 / 60) % 60);
    const hours = Math.floor((total / (1000 * 60 * 60)) % 24);
    const days = Math.floor(total / (1000 * 60 * 60 * 24));

    return {
        total,
        days,
        hours,
        minutes,
        seconds
    };
}

function startTimer() {
    window.clearInterval(countdownInterval);
    countdownInterval = window.setInterval(() => {
        const time = getTimeRemaining(christmasStart);
        document.getElementById('days').innerText = time.days;
        document.getElementById('hours').innerText = time.hours;
        document.getElementById('minutes').innerText = time.minutes;
        document.getElementById('seconds').innerText = time.seconds;
    }, 200)
}
startTimer();

function stopTimer() {
    window.clearInterval(countdownInterval);
}