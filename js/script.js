let currentSong = new Audio();
let songs;
let currfolder;

// Define song lists directly in JavaScript
const songLibrary = {
    'ashiqui': [
        '1._Tum_Hi_Ho_.mp3',
        '2.Chahun_Main_Ya_Naa_.mp3',
        '3._Milne_Hai_Mujhse_Aayi.mp3',
        '4.Meri_Aashiqui_Ab_Tum_Ho.mp3',
        '5._Piya_Aaye_Na_.mp3',
        '6._Hum_Mar_Jayenge_.mp3',
        '7.Bhula_Dena_Mujhe.mp3',
        '8.Sunn_Raha_Hai_Na_Tu_.mp3'
    ],
    'Atif-Aslam': [
        '_Pehli_Dafa.mp3',
        'Dekhte_Dekhte.mp3',
        'Pehle_Bhi_Main_Tum_Se_Mila_Hu_.mp3',
        'Pehli_Nazar_Mein_Kaise_Jaado_Kar_Diya_.mp3',
        'Rafta_Rafta(48k).mp3',
        'Tu_Jaane_Na_.mp3',
        'Zindagi_Aa_Raha_Hoon_Main_.mp3'
    ],
    'hindi': [
        '_Milne_Hai_Mujhse_Aayi.mp3',
        '_Pehli_Dafa.mp3',
        '_Piya_Aaye_Na__.mp3',
        'Dekhte_Dekhte.mp3',
        'Hum_Mar_Jayenge_.mp3',
        'Pasoori___Ali_Sethi_x_Shae_Gill.mp3',
        'Pehli_Nazar_Mein_Kaise_Jaado_Kar_Diya_.mp3',
        'Zindagi_Aa_Raha_Hoon_Main_.mp3'
    ],
    'english': [
        '1. Ed_Sheeran_-_Shape_of_You.mp3',
        '2. Luis_Fonsi_-_Despacito_ft.mp3'
    ],
    'arabic': [
        '-_Tamally_Maak___.mp3',
        'Balti_feat._Hamouda_-_Ya_Lili__.mp3',
        'Guli_Mata_-_Saad_Lamjarred___Shreya_Ghoshal.mp3',
        'Hala_Alturk___Mashael_-_Bnayty_ElHabooba.mp3',
        'Saad_Lamjarred_-_LM3ALLEM__.mp3',
        'Saad_Lamjarred_-_MAL_HBIBI_MALOU____.mp3'
    ],
    'bhoolbhulayya': [
        '__Ami_Je_Tomar_.mp3',
        '_Hukkush_Phukkush_.mp3'
    ],
    'hamariAdhuri': [
        'Humnava_.mp3'
    ],
    'jab we met': [
        '_Yeh_Ishq_Haaye.mp3',
        'Tum_Se_Hi_.mp3'
    ],
    'honey': [],
    'jawani': [],
    'memories': [],
    'ultimate': ['No Songs In This File.mp3']
};

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
    currfolder = `songs/${folder}`;
    console.log(currfolder);
    
    // Get songs from our predefined library
    songs = songLibrary[folder] || [];
    
    if (songs.length === 0) {
        console.log('No songs found for folder:', folder);
        return [];
    }

    // Show all the songs in the playlist
    let songUL = document.querySelector(".songlist").getElementsByTagName('ul')[0]
    songUL.innerHTML = ""
    for (const song of songs) {
        // Create a user-friendly display name
        const displayName = song.replaceAll('%20', ' ').replaceAll('_', ' ').replaceAll('__', '_');
        songUL.innerHTML = songUL.innerHTML + `<li><img class="invert" src="images/music.svg" alt="">
               <div class="info">
                 <div>${displayName}
                 </div>
                 <div>Artist</div>
               </div>
 
               <div class="playnow">
                 <span>Play Now</span>
                 <img class="invert" src="images/play.svg" alt="">
 
               </div>
       </li>`;
    }

    //attach an event listener to each song 
    Array.from(document.querySelector(".songlist").getElementsByTagName('li')).forEach(e => {
        e.addEventListener('click', element => {
            playMusic(e.querySelector('.info').firstElementChild.innerHTML.trim())
        })
    })

    return songs
}

const playMusic = (track, pause = false) => {
    // Get the exact filename from our songLibrary
    const songIndex = songs.indexOf(track);
    if (songIndex !== -1) {
        const exactFilename = songs[songIndex];
        currentSong.src = `${currfolder}/${exactFilename}`;
    } else {
        // Fallback: try to convert display name to filename
        const cleanTrack = track.replaceAll(' ', '_').replaceAll('__', '_');
        currentSong.src = `${currfolder}/${cleanTrack}`;
    }

    if (!pause) {
        currentSong.play();
        playbtn.src = "images/pause.svg"
    }
    document.querySelector('.songinfo').innerHTML = track
    document.querySelector('.songtime').innerHTML = "00:00 / 00:00"

}

async function displayAlbums() {
    const albums = [
        { folder: 'ashiqui', title: 'Aashiqui 2', description: 'Romantic Hindi songs' },
        { folder: 'Atif-Aslam', title: 'Atif Aslam', description: 'Best of Atif Aslam' },
        { folder: 'hindi', title: 'Hindi Hits', description: 'Popular Hindi tracks' },
        { folder: 'english', title: 'English Pop', description: 'International hits' },
        { folder: 'arabic', title: 'Arabic Music', description: 'Regional Arabic songs' },
        { folder: 'bhoolbhulayya', title: 'Bhool Bhulaiyaa', description: 'Bollywood soundtrack' },
        { folder: 'hamariAdhuri', title: 'Hamari Adhuri', description: 'Emotional tracks' },
        { folder: 'jab we met', title: 'Jab We Met', description: 'Bollywood romance' }
    ];
    
    let cardContainer = document.querySelector('.cardContainer');

    for (const album of albums) {
        cardContainer.innerHTML = cardContainer.innerHTML + `<div data-folder="${album.folder}" class="card">
        <div class="play">

          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" width="40" height="40">
            <rect width="31" height="32" rx="16" fill="green" />
            <path d="M10 8L22 16L10 24V8Z" fill="black" />
          </svg>

        </div>
        <img src="songs/${album.folder}/cover.jpg" alt="Album Img error">
        <h2>${album.title}</h2>
        <p>${album.description}</p>
      </div> `;
    }

    //loading the playlist on clicking card
    Array.from(document.getElementsByClassName('card')).forEach(e => {
        e.addEventListener('click', async item => {
            songs = await getSongs(item.currentTarget.dataset.folder)
            if (songs.length > 0) {
                playMusic(songs[0])
            }
        })
    });
}

async function main() {
    //to get the list of all the songs
    await getSongs('ashiqui')

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
        document.querySelector('.songtime').innerHTML = `${secondsToMinutesSeconds(currentSong.currentTime)} / ${secondsToMinutesSeconds(currentSong.duration)}`
        document.querySelector('.circle').style.left = (currentSong.currentTime / currentSong.duration) * 100 + "%";
    })

    //add eventlistener to seekbar
    document.querySelector('.seekbar').addEventListener('click', e => {
        let percent = (e.offsetX / e.target.getBoundingClientRect().width) * 100
        document.querySelector('.circle').style.left = percent + "%";
        currentSong.currentTime = ((currentSong.duration) * percent) / 100;
    })

    //add an eventlistener to display hamburger
    document.querySelector(".hamburger").addEventListener("click", () => {
        document.querySelector(".left").style.left = "0";
    })
    
    //add an eventlistener to close hamburger
    document.querySelector(".close").addEventListener("click", () => {
        document.querySelector(".left").style.left = "-500%";
    })

    //add event listener for prev
    previous.addEventListener('click', () => {
        currentSong.pause()
        let index = songs.indexOf(currentSong.src.split('/').slice(-1)[0])
        if ((index - 1) >= 0) {
            playMusic(songs[index - 1])
        }
        else {
            playMusic(songs[songs.length - 1])
        }
    })

    //add event listener for next
    next.addEventListener('click', () => {
        currentSong.pause()
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
        currentSong.volume = parseInt(e.target.value) / 100
        if (currentSong.volume > 0) {
            document.querySelector(".volume>img").src = document.querySelector(".volume>img").src.replace("mute.svg", "volume.svg")
        }
    })

    //add eventlistener to mute when clicked
    document.querySelector(".volume>img").addEventListener("click", e => {
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
