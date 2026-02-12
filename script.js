const MIN_NUMBER = 1;
const MAX_NUMBER = 19200;
const DIGITS = 5;
const SPIN_DURATION = 1000;
const STOP_DELAY = 750;

const digits = document.querySelectorAll('.digit');
const btn = document.getElementById('startBtn');
const spinSound = document.getElementById('spinSound');
const winSound  = document.getElementById('winSound');

let rollingIntervals = [];

function randomDigit() {
    return Math.floor(Math.random() * 10);
}

function formatNumber(num) {
    return num.toString().padStart(DIGITS, '0');
}

function randomInRange(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function startSpin() {
    if (btn.disabled) return;
    btn.disabled = true;

    const finalNumber = randomInRange(MIN_NUMBER, MAX_NUMBER);
    const result = formatNumber(finalNumber);

    spinSound.currentTime = 0;
    spinSound.play();

    digits.forEach((digit, index) => {
        digit.classList.add('running');
        rollingIntervals[index] = setInterval(() => {
            digit.textContent = randomDigit();
        }, 70);
    });

    digits.forEach((digit, index) => {
        setTimeout(() => {
            clearInterval(rollingIntervals[index]);
            digit.textContent = result[index];
            digit.classList.remove('running');

            if (index === digits.length - 1) {
                spinSound.pause();
                winSound.currentTime = 0;
                winSound.play();
                btn.disabled = false;
            }
        }, SPIN_DURATION + index * STOP_DELAY);
    });
}

btn.onclick = startSpin;

document.addEventListener('keydown', (e) => {
    if (e.code === 'Space') {
        e.preventDefault();
        startSpin();
    }
});