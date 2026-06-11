let currentSong = new Audio();
let songs;
let currfolder;
function secondsToMinutesSeconds(seconds) {
    if (isNaN(seconds) || seconds < 0) {
        return "00:00";
    }

    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = Math.floor(seconds % 60);

    const formattedMinutes = String(minutes).padStart(2, '0');
    const formattedSeconds = String(remainingSeconds).padStart(2, '0');

    return `${formattedMinutes}:${formattedSeconds}`;
}


async function getSongs(folder) {
    currfolder = folder;
    // console.log(currfolder)
    //http://127.0.0.1:5500
    let a = await fetch(`/${folder}/`)
    // console.log(a)
    let response = await a.text();
    // console.log(response)

    let div = document.createElement("div");
    div.innerHTML = response;
    let as = div.getElementsByTagName("a")

    songs = [];
    for (let index = 0; index < as.length; index++) {
        const element = as[index];
        if (element.href.endsWith(".mp3")) {
            songs.push(element.href.split(`/${folder}/`)[1])
        }
    }


    // Show all the songs in the playlist

    let songUL = document.querySelector(".songlist").getElementsByTagName('ul')[0]
    songUL.innerHTML = ""
    for (const song of songs) {
        songUL.innerHTML = songUL.innerHTML + `<li><img class="invert" src="images/music.svg" alt="">
               <div class="info">
                 <div>${song.replaceAll('%20', ' ')}
                 </div>
                 <div>stefen</div>
               </div>
 
               <div class="playnow">
                 <span>Play Now</span>
                 <img class="invert" src="/images/play.svg" alt="">
 
               </div>
       </li>`;
    }

    //attach an event listener to each song 
    Array.from(document.querySelector(".songlist").getElementsByTagName('li')).forEach(e => {
        e.addEventListener('click', element => {
            // console.log(e.querySelector('.info').firstElementChild.innerHTML)

            playMusic(e.querySelector('.info').firstElementChild.innerHTML.trim())
        })
    })

    return songs

}


const playMusic = (track, pause = false) => {

    currentSong.src = `/${currfolder}/` + track;

    if (!pause) {
        currentSong.play();
        playbtn.src = "images/pause.svg"
    }
    document.querySelector('.songinfo').innerHTML = decodeURI(track)
    document.querySelector('.songtime').innerHTML = "00:00 / 00:00"


}

async function displayAlbums() {
    let a = await fetch(`/songs/`)
    let response = await a.text();
    let div = document.createElement("div");
    div.innerHTML = response;
    let anchors = div.getElementsByTagName('a')
    let cardContainer = document.querySelector('.cardContainer')

    let array = Array.from(anchors);



    for (let index = 0; index < array.length; index++) {
        const e = array[index];


        if (e.href.includes(`/songs/`)) {
            // console.log(e.href.split('/').slice(-2)[0])
            let folder = e.href.split('/').slice(-2)[0]

            //get metadata of the folder
            let a = await fetch(`/songs/${folder}/info.json`)

            // console.log(a)
            let response = await a.json();
            //  console.log(response)
            cardContainer.innerHTML = cardContainer.innerHTML + `<div data-folder="${folder}" class="card">
            <div class="play">

              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" width="40" height="40">
                <!-- Background -->
                <rect width="31" height="32" rx="16" fill="green" />

                <!-- Larger Play Button -->
                <path d="M10 8L22 16L10 24V8Z" fill="black" />

              </svg>


            </div>
            <img src="/songs/${folder}/cover.jpg" alt="Album Img error">
            <h2>${response.title} </h2>
            <p> ${response.description}</p>
          </div> `
        }
    }

    //loading the playlist on clicking card
    Array.from(document.getElementsByClassName('card')).forEach(e => {
        e.addEventListener('click', async item => {
            // console.log(item.currentTarget, item.currentTarget.dataset)
            songs = await getSongs(`songs/${item.currentTarget.dataset.folder}`)
            playMusic(songs[0])
        })
    });

}


async function main() {

    //to get the list of all the songs
    await getSongs('songs/ashiqui')

    playMusic(songs[0], true)


    //Displaying All the album on the page

    displayAlbums();


    //attach an event listener to play 

    playbtn.addEventListener('click', () => {
        if (currentSong.paused) {
            currentSong.play()
            playbtn.src = "images/pause.svg"
        }
        else {
            currentSong.pause()
            playbtn.src = "images/play.svg"
        }
    })

    //listener for timeupdate event

    currentSong.addEventListener("timeupdate", () => {
        // console.log(currentSong.currentTime, currentSong.duration);

        document.querySelector('.songtime').innerHTML = `${secondsToMinutesSeconds(currentSong.currentTime)} / ${secondsToMinutesSeconds(currentSong.duration)}`

        document.querySelector('.circle').style.left = (currentSong.currentTime / currentSong.duration) * 100 + "%";
    })

    //add eventlistener to seekbar

    document.querySelector('.seekbar').addEventListener('click', e => {
        let percent = (e.offsetX / e.target.getBoundingClientRect().width) * 100

        document.querySelector('.circle').style.left = percent + "%";

        currentSong.currentTime = ((currentSong.duration) * percent) / 100;
    })

    // //add eventlistener to seekbar to play next song when current song is end

    // document.querySelector('.seekbar').addEventListener('', e => {
    //     let percent = (e.offsetX / e.target.getBoundingClientRect().width) * 100

    //     document.querySelector('.circle').style.left = "100" + "%";
    //     let index = songs.indexOf(currentSong.src.split('/').slice(-1)[0])
    //    playMusic(songs[index+1])
    // })





    //add an eventlistener to display hamburger

    document.querySelector(".hamburger").addEventListener("click", () => {
        document.querySelector(".left").style.left = "0";
    })
    //add an eventlistener to close hamburger

    document.querySelector(".close").addEventListener("click", () => {
        document.querySelector(".left").style.left = "-500%";
    })

    //add event listener for  prev
    previous.addEventListener('click', () => {
        currentSong.pause()
        // console.log('prev')
        let index = songs.indexOf(currentSong.src.split('/').slice(-1)[0])

        if ((index - 1) >= 0) {
            playMusic(songs[index - 1])
        }
        else {
            playMusic(songs[songs.length - 1])

        }
    })

    //add event listener for  next
    next.addEventListener('click', () => {
        currentSong.pause()
        // console.log("next")
        let index = songs.indexOf(currentSong.src.split('/').slice(-1)[0])

        if ((index + 1) < songs.length) {
            playMusic(songs[index + 1])
        }
        else {
            playMusic(songs[0])

        }
    })

   

    //add event to volume

    document.querySelector(".range").getElementsByTagName('input')[0].addEventListener('change', (e) => {
        // console.log("Setting volume to", e.target.value, "/100")
        currentSong.volume = parseInt(e.target.value) / 100

        if (currentSong.volume > 0) {
            document.querySelector(".volume>img").src = document.querySelector(".volume>img").src.replace("mute.svg", "volume.svg")
        }
    })

    //add eventlistener to mute when clicked

    document.querySelector(".volume>img").addEventListener("click", e => {
        console.log(e.target)

        if (e.target.src.includes("volume.svg")) {
            e.target.src = e.target.src.replace("volume.svg", "mute.svg")
            currentSong.volume = 0;
            document.querySelector(".range").getElementsByTagName('input')[0].value = 0
        }
        else {
            e.target.src = e.target.src.replace("mute.svg", "volume.svg")
            currentSong.volume = .10;
            document.querySelector(".range").getElementsByTagName('input')[0].value = 10
        }
    })



}

main();
