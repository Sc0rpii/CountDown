// DATA TARGET
const countDown = new Date("Jan 1, 2026 00:00:00").getTime();
//const countDown = new Date("Dec 30, 2025 14:00:00").getTime();

// TEMPO INIZIALE (una sola volta)
const startTime = Date.now();
const totalDuration = countDown - startTime;

// ELEMENTI DOM
const timer = document.getElementById("timer");
const endTimer = document.getElementById("endTimer");

// PROGRESS BAR (300x300)
const RADIUS = 155;
const CIRCUMFERENCE = 2 * Math.PI * RADIUS;

const circle = document.querySelector(".progress-ring__progress");
circle.style.strokeDasharray = CIRCUMFERENCE;
circle.style.strokeDashoffset = 0; // PIENA all'inizio

const YEAR_DURATION = 365 * 24 * 60 * 60 * 1000; // ms

// FUNZIONE PROGRESS BAR (UNICA)
function updateProgress(distance) {
    // clamp per sicurezza
    const progress = Math.max(0, Math.min(distance / YEAR_DURATION, 1));

    circle.style.strokeDashoffset =
        CIRCUMFERENCE * (1 - progress);
}

// COUNTDOWN
const update = setInterval(() => {
    const now = Date.now();
    const distance = countDown - now;

    if (distance <= 0) {
        clearInterval(update);
        timer.innerHTML = "";
        endTimer.innerHTML = "Happy<br>New Year!";
        circle.style.strokeDashoffset = 0;
        circle.style.display = "none";
        return;
    }

    // CALCOLI PULITI
    const days = Math.floor(distance / (1000 * 60 * 60 * 24));
    const hours = Math.floor((distance / (1000 * 60 * 60)) % 24);
    const minutes = Math.floor((distance / (1000 * 60)) % 60);
    const seconds = Math.floor((distance / 1000) % 60);

    // TESTO SMART
    let output = "";
    if (days > 0) output += days + "d  ";
    if (hours > 0 || days > 0) output += hours + " h ";
    if (minutes > 0 || hours > 0 || days > 0) output += minutes + " m ";
    output += seconds + " s";

    timer.innerHTML = output;

    // 🔵 AGGIORNA BARRA
    updateProgress(distance);

}, 1000);
