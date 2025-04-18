let lastSongId = null;

const audio = document.getElementById("audio");
const playPauseBtn = document.getElementById("playPause");
const volumeSlider = document.getElementById("volume");

let isPlaying = false;

playPauseBtn.addEventListener("click", () => {
  if (isPlaying) {
    audio.pause();
    playPauseBtn.textContent = "▶️ Воспроизвести";
  } else {
    audio.play();
    playPauseBtn.textContent = "⏸️ Пауза";
  }
  isPlaying = !isPlaying;
});

volumeSlider.addEventListener("input", () => {
  audio.volume = volumeSlider.value;
});

async function fetchNowPlaying() {
  try {
    const res = await fetch("https://radio.somedott.space/api/nowplaying/rap");
    const data = await res.json();

    const { song } = data.now_playing;
    const songId = song.id;
    const title = song.text;
    const art = song.art || "default.jpg";

    if (songId !== lastSongId) {
      document.getElementById("title").textContent = title;

      const coverImg = document.getElementById("cover");
      coverImg.style.opacity = 0;
      setTimeout(() => {
        coverImg.src = art;
        coverImg.style.opacity = 1;
      }, 300);

      document.getElementById("bg").style.backgroundImage = `url(${art})`;
      lastSongId = songId;
    }
  } catch (e) {
    console.error("Ошибка загрузки данных", e);
  }
}

fetchNowPlaying();
setInterval(fetchNowPlaying, 10000);
