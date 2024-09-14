// Select DOM elements
const container = document.querySelector(".container"),
    musicImg = container.querySelector(".img-area img"),
    musicName = container.querySelector(".song-details .name"),
    musicArtist = container.querySelector(".song-details .artist"),
    playPauseBtn = container.querySelector(".play-pause"),
    prevBtn = container.querySelector("#prev"),
    nextBtn = container.querySelector("#next"),
    mainAudio = container.querySelector("#main-audio"),
    progressArea = container.querySelector(".progress-area"),
    progressBar = progressArea.querySelector(".progress-bar"),
    repeatBtn = container.querySelector("#repeat-plist"),
    nowPlayingSpan = container.querySelector('#now-playing'),
    volumeSlider = document.querySelector("#volume-slider"),
    volumeIcon = document.querySelector("#volume-icon");

let musicIndex = 0; // Current song index
let isPlaying = false; // Play / pause state
let lastVolume = 1; 

window.addEventListener("load", () => loadMusic(musicIndex));

// Load and display the music info
const loadMusic = index => {
    const music = allMusic[index];
    musicName.textContent = music.name;
    musicArtist.textContent = music.artist;
    musicImg.src = music.img;
    mainAudio.src = music.src;
};

// Play or pause the music
const playMusic = () => {
    isPlaying = true;
    playPauseBtn.querySelector("i").textContent = "pause";
    mainAudio.play();
    nowPlayingSpan.innerText = 'Now Playing';
};

const pauseMusic = () => {
    isPlaying = false;
    playPauseBtn.querySelector("i").textContent = "play_arrow";
    mainAudio.pause();
    nowPlayingSpan.innerText = 'Pause';
};

// Toggle play/pause on button click
playPauseBtn.addEventListener("click", () => isPlaying ? pauseMusic() : playMusic());

// Play next song
const nextMusic = () => {
    musicIndex = (musicIndex + 1) % allMusic.length;
    loadMusic(musicIndex);
    playMusic();
};

// Play previous song
const prevMusic = () => {
    musicIndex = (musicIndex - 1 + allMusic.length) % allMusic.length;
    loadMusic(musicIndex);
    playMusic();
};

// Next and previous buttons functionality
nextBtn.addEventListener("click", nextMusic);
prevBtn.addEventListener("click", prevMusic);

// Toggle repeat mode on button click
repeatBtn.addEventListener("click", () => {
    const text = repeatBtn.textContent;
    switch (text) {
        case "repeat":
            repeatBtn.textContent = "repeat_one";
            repeatBtn.setAttribute("title", "Song looped");
            break;
        case "repeat_one":
            repeatBtn.textContent = "shuffle";
            repeatBtn.setAttribute("title", "Playback shuffled");
            break;
        case "shuffle":
            repeatBtn.textContent = "repeat";
            repeatBtn.setAttribute("title", "Playlist looped");
            break;
    }
});

// Handle music end based on repeat mode
mainAudio.addEventListener("ended", () => {
    const text = repeatBtn.textContent;
    switch (text) {
        case "repeat":
            nextMusic();
            break;
        case "repeat_one":
            mainAudio.currentTime = 0;
            playMusic();
            break;
        case "shuffle":
            let randomIndex;
            do {
                randomIndex = Math.floor(Math.random() * allMusic.length);
            } while (musicIndex === randomIndex);
            musicIndex = randomIndex;
            loadMusic(musicIndex);
            playMusic();
            break;
    }
});

// Update progress bar and time display
mainAudio.addEventListener("timeupdate", () => {
    const { currentTime, duration } = mainAudio;
    progressBar.style.width = `${(currentTime / duration) * 100}%`;

    const musicCurrentTime = container.querySelector(".current-time"),
            musicDuration = container.querySelector(".max-duration");

    musicCurrentTime.textContent = formatTime(currentTime);
    musicDuration.textContent = formatTime(duration);
});

// Seek through the song by clicking on the progress bar
progressArea.addEventListener("click", e => {
    const progressWidth = progressArea.clientWidth;
    const clickedOffsetX = e.offsetX;
    if (clickedOffsetX >= 0 && clickedOffsetX <= progressWidth) {
        const songDuration = mainAudio.duration;
        mainAudio.currentTime = (clickedOffsetX / progressWidth) * songDuration;
        playMusic();
    }
});

// Format time as MM:SS
const formatTime = time => {
    if (isNaN(time) || time < 0) return "00:00";
    const minutes = Math.floor(time / 60).toString().padStart(2, '0');
    const seconds = Math.floor(time % 60).toString().padStart(2, '0');
    return `${minutes}:${seconds}`;
};

// Update volume and icon
volumeSlider.addEventListener("input", () => {
    mainAudio.volume = volumeSlider.value;
    updateVolumeIcon(volumeSlider.value);
    updateVolumeSliderBackground(volumeSlider.value);
});