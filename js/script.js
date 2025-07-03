console.log('Lets write JavaScript');

let currentSong = new Audio();
let songs = [];
let currFolder = "";
let songLoaded = false;

function secondsToMinutesSeconds(seconds) {
    if (isNaN(seconds) || seconds < 0) return "00:00";
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = Math.floor(seconds % 60);
    return `${String(minutes).padStart(2, '0')}:${String(remainingSeconds).padStart(2, '0')}`;
}

async function getSongs(folder) {
    currFolder = folder;
    songs = [];

    try {
        let res = await fetch(`${folder}/info.json`);
        let data = await res.json();
        songs = data.songs || [];
    } catch (error) {
        console.error("Error loading info.json:", error);
        return;
    }

    let songUL = document.querySelector(".songList ul");
    songUL.innerHTML = "";

    for (const song of songs) {
        songUL.innerHTML += `<li><img class="invert" width="34" src="img/music.svg" alt="">
            <div class="info">
                <div>${song}</div>
                <div>Santoshi</div>
            </div>
            <div class="playnow">
                <span>Listen</span>
                <img class="invert" src="img/play.svg" alt="">
            </div>
        </li>`;
    }

    Array.from(songUL.getElementsByTagName("li")).forEach(e => {
        e.addEventListener("click", () => {
            const track = e.querySelector(".info div").innerHTML.trim();
            playMusic(track);
            songLoaded = true;
        });
    });

    return songs;
}

function playMusic(track, pause = false) {
    if (!track) return;

    currentSong.src = `${currFolder}/${track}`;
    currentSong.load();
    if (!pause) {
        currentSong.play().catch(e => console.error("Playback error:", e));
        play.src = "img/pause.svg";
    }
    document.querySelector(".songinfo").innerHTML = decodeURI(track);
    document.querySelector(".songtime").innerHTML = "00:00 / 00:00";
}

async function displayAlbums() {
    let cardContainer = document.querySelector(".cardContainer");

    try {
        let res = await fetch("songs/index.json");
        let data = await res.json();
        let albums = data.albums;

        for (let folder of albums) {
            try {
                let metaRes = await fetch(`songs/${folder}/info.json`);
                let metadata = await metaRes.json();

                cardContainer.innerHTML += `<div data-folder="${folder}" class="card">
                    <div class="play">
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none"
                            xmlns="http://www.w3.org/2000/svg">
                            <path d="M5 20V4L19 12L5 20Z" stroke="#141B34" fill="#000" stroke-width="1.5"
                                stroke-linejoin="round" />
                        </svg>
                    </div>
                    <img src="songs/${folder}/cover.jpg" alt="">
                    <h2>${metadata.title}</h2>
                    <p>${metadata.description}</p>
                </div>`;
            } catch (err) {
                console.warn(`Error loading songs/${folder}/info.json`);
            }
        }

        Array.from(document.getElementsByClassName("card")).forEach(e => {
            e.addEventListener("click", async item => {
                songs = await getSongs(`songs/${item.currentTarget.dataset.folder}`);
                if (songs.length > 0) {
                    playMusic(songs[0]);
                    songLoaded = true;
                }
            });
        });

    } catch (error) {
        console.error("Failed to load songs/index.json", error);
    }
}

async function main() {
    await displayAlbums();

    play.addEventListener("click", () => {
        if (!songLoaded) return;
        if (currentSong.paused) {
            currentSong.play();
            play.src = "img/pause.svg";
        } else {
            currentSong.pause();
            play.src = "img/play.svg";
        }
    });

    currentSong.addEventListener("timeupdate", () => {
        if (!isNaN(currentSong.duration)) {
            document.querySelector(".songtime").innerHTML =
                `${secondsToMinutesSeconds(currentSong.currentTime)} / ${secondsToMinutesSeconds(currentSong.duration)}`;
            document.querySelector(".circle").style.left = (currentSong.currentTime / currentSong.duration) * 100 + "%";
        }
    });

    document.querySelector(".seekbar").addEventListener("click", e => {
        let percent = (e.offsetX / e.target.getBoundingClientRect().width) * 100;
        document.querySelector(".circle").style.left = percent + "%";
        if (!isNaN(currentSong.duration)) {
            currentSong.currentTime = (currentSong.duration * percent) / 100;
        }
    });

    document.querySelector(".hamburger").addEventListener("click", () => {
        document.querySelector(".left").style.left = "0";
    });

    document.querySelector(".close").addEventListener("click", () => {
        document.querySelector(".left").style.left = "-120%";
    });

    previous.addEventListener("click", () => {
        let index = songs.indexOf(currentSong.src.split("/").pop());
        if (index > 0) {
            playMusic(songs[index - 1]);
        }
    });

    next.addEventListener("click", () => {
        let index = songs.indexOf(currentSong.src.split("/").pop());
        if (index < songs.length - 1) {
            playMusic(songs[index + 1]);
        }
    });

    document.querySelector(".range input").addEventListener("input", (e) => {
        const volume = parseInt(e.target.value) / 100;
        currentSong.volume = volume;
        const volIcon = document.querySelector(".volume>img");

        volIcon.src = volume === 0 ? "img/mute.svg" : "img/volume.svg";
    });

    document.querySelector(".volume>img").addEventListener("click", () => {
        const volIcon = document.querySelector(".volume>img");
        const volumeSlider = document.querySelector(".range input");

        if (volIcon.src.includes("volume.svg")) {
            volIcon.src = "img/mute.svg";
            currentSong.volume = 0;
            volumeSlider.value = 0;
        } else {
            volIcon.src = "img/volume.svg";
            currentSong.volume = 0.1;
            volumeSlider.value = 10;
        }
    });
}

main();
