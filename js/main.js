const player = document.querySelector('.player'),
        audio = document.querySelector('.audio'),
        cover = document.querySelector('.cover__img'),
        titleName = document.querySelector('.title__name'),
        titleArtist = document.querySelector('.title__artist'),
        current = document.querySelector('.current'),
        durationTime = document.querySelector('.duration'),
        track = document.querySelector('.track'),
        trackProgress = document.querySelector('.track__progress'),
        trackPoint = document.querySelector('.point'),
        playBtn = document.querySelector('.play'),
        prevBtn = document.querySelector('.prev'),
        nextBtn = document.querySelector('.next'),
        imgSrc = document.querySelector('.img__src')

// Music titles
const songs = ['Dee Yan-Key - Snowflake Patterns', 'Scott Holmes Music - Silent Night', 'Siddhartha Corsus - Surrender']

// Default song
let songIndex = 0

// Load song details into DOM
function loadSong(song) {
    titleName.textContent = song.split(' - ')[1]
    titleArtist.textContent = song.split(' - ')[0]
    audio.src = `../audio/${song}.mp3`
    cover.src = `../img/cover-${songs.indexOf(song) + 1}.svg`

    audio.onloadedmetadata = () => {
        current.textContent = '0:00'
        durationTime.textContent = `${Math.floor(audio.duration / 60)}:${Math.floor(audio.duration % 60)}`
    } 
}

loadSong(songs[songIndex])

// Play song
function playSong() {
    player.classList.add('play')
    cover.classList.add('active')
    imgSrc.src = '../img/pause.svg'
    audio.play()
}

// Pause song
function pauseSong() {
    player.classList.remove('play')
    cover.classList.remove('active')
    imgSrc.src = '../img/play.svg'
    audio.pause()
}

// Play or pause song
playBtn.addEventListener('click', () => {
    const isPlaying = player.classList.contains('play')

    if (isPlaying) {
        pauseSong()
    } else {
        playSong()
    }
})

function nextSong() {
    songIndex = (songIndex + 1) % songs.length
    loadSong(songs[songIndex])
    playSong()
}

// Next song
nextBtn.addEventListener('click', nextSong)

// Previous song
prevBtn.addEventListener('click', () => {
    songIndex = (songIndex - 1 + songs.length) % songs.length
    loadSong(songs[songIndex])
    playSong()
})

// Update progress bar
function updateProgress(e) {
    const { duration, currentTime } = e.srcElement

    // Seconds with 2 digits
    const seconds = Math.floor(currentTime % 60)
    const secondsWithZero = seconds < 10 ? `0${seconds}` : seconds
    current.textContent = `${Math.floor(currentTime / 60)}:${secondsWithZero}`

    var progress = Math.floor(currentTime) / Math.floor(duration)
    trackProgress.style.width = `${progress * 100}%`
    trackPoint.style.left = `${220 * progress - 10}` + 'px'
}

audio.addEventListener('timeupdate', updateProgress)

// Set progress bar
function setProgress(e) {
    const width = this.clientWidth
    const clickX = e.offsetX
    const duration = audio.duration

    audio.currentTime = (clickX / width) * duration
}

track.addEventListener('click', setProgress)

// End of song
audio.addEventListener('ended', nextSong)