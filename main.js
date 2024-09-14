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