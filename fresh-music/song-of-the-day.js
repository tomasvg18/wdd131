import { formatTime, setupPlayer, loadSongData } from './player.js';
import { songs } from './songs.js';

const TOTAL_DAYS = 24;
const STORAGE_KEY = 'freshMusic_sotd_startDate';

const allSongs = Object.values(songs).flat().sort((a, b) => a.title.localeCompare(b.title));

function getStartDate() {
  const stored = localStorage.getItem(STORAGE_KEY);
  if (stored) return new Date(stored);
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  localStorage.setItem(STORAGE_KEY, today.toISOString());
  return today;
}

function getDayOffset(startDate) {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const daysPassed = Math.floor((today - startDate) / (1000 * 60 * 60 * 24));
  return daysPassed % TOTAL_DAYS;
}

function getSongOfTheDay() {
  const offset = getDayOffset(getStartDate());
  return allSongs[offset];
}

// Update the date displayed
const dateEl = document.getElementById('sotd-date');
if (dateEl) {
 const today = new Date();
const formattedDate = today.toLocaleDateString('en-US', {
  weekday: 'long',
  month: 'long',
  day: 'numeric'
});
dateEl.textContent = formattedDate;

}

// DOM elements from the actual page
const audio = document.getElementById("dailyAudio");
const source = document.getElementById("dailySource");
const playBtn = document.getElementById("dailyPlayPauseBtn");
const seekBar = document.getElementById("dailySeekBar");
const currentTime = document.getElementById("dailyCurrentTime");
const duration = document.getElementById("dailyTotalTime");
const art = document.getElementById("dailyArt");
const title = document.getElementById("songTitle");
const artist = document.getElementById("songArtist");

// Setup the player (time + play button + seek)
setupPlayer(audio, playBtn, seekBar, currentTime, duration);

// Load the SOTD song
const song = getSongOfTheDay();
loadSongData(song, source, audio, art, title, artist, playBtn, false); // no autoplay

// Restart song on back button click
const backBtn = document.getElementById("backBtn");
if (backBtn) {
  backBtn.addEventListener("click", () => {
    audio.currentTime = 0;
    if (audio.paused) {
      playBtn.innerHTML = "▶";
    }
  });
}
