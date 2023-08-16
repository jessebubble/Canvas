
const audioContext = new AudioContext();
const oscillator = audioContext.createOscillator();
oscillator.type = 'sine';
oscillator.frequency.value = 440;
oscillator.connect(audioContext.destination);

const canvas = document.getElementById('canvas');
const canvasContext = canvas.getContext('2d');

function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}
resizeCanvas();
window.addEventListener('resize', resizeCanvas);

let isOscillatorStarted = false;

canvas.addEventListener('mousemove', (event) => {
    const canvasWidth = canvas.width;
    const mouseX = event.clientX - canvas.getBoundingClientRect().left;
    const frequency = map(mouseX, 0, canvasWidth, 50, 1000);

    oscillator.frequency.value = frequency;

    canvasContext.clearRect(0, 0, canvasWidth, canvas.height);
    canvasContext.fillRect(mouseX - 2, 0, 4, canvas.height);

    if (event.clientX > 0 && event.clientX < canvasWidth) {
        if (!isOscillatorStarted) {
            oscillator.start();
            isOscillatorStarted = true;
        }
    } else {
        if (isOscillatorStarted) {
            oscillator.stop();
            isOscillatorStarted = false;
        }
    }
});

function map(value, inMin, inMax, outMin, outMax) {
    return (value - inMin) * (outMax - outMin) / (inMax - inMin) + outMin;
}


