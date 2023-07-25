const audio = document.getElementById('audio');
const playBtn = document.getElementById('play-btn');
const progressBar = document.getElementById('progress-bar');
const timeDisplay = document.getElementById('time-display');
const overlay = document.querySelector('.overlay');
const volumeSlider = document.getElementById('volume-slider');

let isMusicPlaying = false;

playBtn.addEventListener('click', () => {
    toggleAudio();
});

audio.addEventListener('timeupdate', () => {
    const duration = audio.duration;
    const currentTime = audio.currentTime;

    if (duration) {
        const progress = (currentTime / duration) * 100;
        progressBar.style.width = `${progress}%`;
        timeDisplay.textContent = `${formatTime(currentTime)} / ${formatTime(duration)}`;
    }
});

audio.addEventListener('ended', () => {
    playBtn.innerHTML = '▶';
    progressBar.style.width = '0%';
    timeDisplay.textContent = `0:00 / 0:00`;
    isMusicPlaying = false;
});

function startPlaying() {
    if (!isMusicPlaying) {
        overlay.style.display = 'none';
        audio.play();
        playBtn.innerHTML = '⏸';
        isMusicPlaying = true;
    }
}

function toggleAudio() {
    if (isMusicPlaying) {
        audio.pause();
        playBtn.innerHTML = '▶';
        isMusicPlaying = false;
    } else {
        audio.play();
        playBtn.innerHTML = '⏸';
        isMusicPlaying = true;
    }
}

function formatTime(time) {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
}

function copyText(text) {
    const element = document.createElement('textarea');
    element.value = text;
    document.body.appendChild(element);
    element.select();
    document.execCommand('copy');
    document.body.removeChild(element);
    alert('Text copied: ' + text);
}

// Lautstärkeregler hinzufügen
volumeSlider.addEventListener('input', () => {
    audio.volume = volumeSlider.value;
});
