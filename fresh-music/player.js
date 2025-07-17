//Format time in MM:SS
function formatTime(seconds) {
  const min = Math.floor(seconds / 60);
  const sec = Math.floor(seconds % 60).toString().padStart(2, "0");
  return `${min}:${sec}`;
}

// Load a song 
function loadSongData(song, sourceEl, audioEl, artEl, titleEl, artistEl, playBtn, shouldAutoplay = true) {
  sourceEl.src = song.file;
  audioEl.load();

  if (shouldAutoplay) {
    audioEl.play();
    playBtn.innerHTML = "❚❚"; 
  } else {
    playBtn.innerHTML = "▶"; 
  }

  titleEl.textContent = song.title;
  artistEl.textContent = song.artist || "";
  artEl.src = song.image;

  playBtn.style.display = "flex";
}


function setupPlayer(audioEl, playBtn, seekBar, timeNowEl, timeEndEl, prevBtn = null, onPrevSongCallback = null) {
  const icons = {
    play: "▶",
    pause: "❚❚"
  };

  // Toggle play/pause icon
  playBtn.addEventListener("click", () => {
    if (audioEl.paused) {
      audioEl.play();
      playBtn.innerHTML = icons.pause;
    } else {
      audioEl.pause();
      playBtn.innerHTML = icons.play;
    }
  });

  // Update time + seek bar
  audioEl.addEventListener("timeupdate", () => {
    if (!isNaN(audioEl.duration)) {
      seekBar.max = audioEl.duration;
      seekBar.value = audioEl.currentTime;
      timeNowEl.textContent = formatTime(audioEl.currentTime);
      timeEndEl.textContent = formatTime(audioEl.duration);
    }
  });

  // Seek functionality
  seekBar.addEventListener("input", () => {
    audioEl.currentTime = seekBar.value;
  });

  // Reset play button on end
  audioEl.addEventListener("ended", () => {
    playBtn.innerHTML = icons.play;
  });

  // Optional prev button behavior (restart or go back)
  if (prevBtn) {
    let lastClick = 0;
    prevBtn.addEventListener("click", () => {
      const now = Date.now();
      if (now - lastClick < 500 && typeof onPrevSongCallback === "function") {
        onPrevSongCallback();
      } else {
        audioEl.currentTime = 0;
        audioEl.play();
      }
      lastClick = now;
    });
  }
}


export { formatTime, loadSongData, setupPlayer };
