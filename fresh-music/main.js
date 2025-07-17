import { formatTime, setupPlayer, loadSongData } from './player.js';
import { songs } from './songs.js';

// DOM Elements
const audioPlayer = document.getElementById("audioPlayer");
const audioSource = document.getElementById("audioSource");
const songArt = document.getElementById("songArt");
const songTitle = document.getElementById("songTitle");
const songArtist = document.getElementById("songArtist");

const playPauseBtn = document.getElementById("playPauseBtn");
const seekBar = document.getElementById("seekBar");
const currentTimeDisplay = document.getElementById("currentTime");
const durationDisplay = document.getElementById("duration");

// Initialize player logic
setupPlayer(audioPlayer, playPauseBtn, seekBar, currentTimeDisplay, durationDisplay);

let currentGenre = null;
let currentIndex = 0;
let lastBackClickTime = 0;

function loadSongByIndex(genre, index) {
  const genreSongs = songs[genre];
  if (!genreSongs || index < 0 || index >= genreSongs.length) return;

  const song = genreSongs[index];
  currentGenre = genre;
  currentIndex = index;

  loadSongData(song, audioSource, audioPlayer, songArt, songTitle, songArtist, playPauseBtn);
}

// Genre button click handlers
document.querySelectorAll(".genre-btn").forEach(button => {
  button.addEventListener("click", () => {
    const genre = button.getAttribute("data-genre");
    const index = Math.floor(Math.random() * songs[genre].length);
    loadSongByIndex(genre, index);
  });
});

// Next button
document.getElementById("nextBtn").addEventListener("click", () => {
  if (!currentGenre) return;
  const songsInGenre = songs[currentGenre];
  currentIndex = (currentIndex + 1) % songsInGenre.length;
  loadSongByIndex(currentGenre, currentIndex);
});

// Improved Prev button
document.getElementById("prevBtn").addEventListener("click", () => {
  const now = Date.now();
  const clickDelay = 400; // ms
  const isDoubleClick = now - lastBackClickTime < clickDelay;
  lastBackClickTime = now;

  if (!currentGenre) {
    // SOTD fallback: just restart
    audioPlayer.currentTime = 0;
    return;
  }

  if (audioPlayer.currentTime > 3 && !isDoubleClick) {
    // Restart current song if it's been playing more than 3 seconds
    audioPlayer.currentTime = 0;
  } else {
    // Go to previous song
    const songsInGenre = songs[currentGenre];
    currentIndex = (currentIndex - 1 + songsInGenre.length) % songsInGenre.length;
    loadSongByIndex(currentGenre, currentIndex);
  }
});

// Random song
document.getElementById("randomBtn").addEventListener("click", () => {
  const genreList = Object.keys(songs);
  const randomGenre = genreList[Math.floor(Math.random() * genreList.length)];
  const randomIndex = Math.floor(Math.random() * songs[randomGenre].length);
  loadSongByIndex(randomGenre, randomIndex);
});

// Autoplay next song on end
audioPlayer.addEventListener("ended", () => {
  if (!currentGenre) return;
  const songsInGenre = songs[currentGenre];
  currentIndex = (currentIndex + 1) % songsInGenre.length;
  loadSongByIndex(currentGenre, currentIndex);
});

export { songs };
