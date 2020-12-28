const video = document.getElementById('video');
const play = document.getElementById('play');
const stop = document.getElementById('stop');
const fastForward = document.getElementById('skip');
const fastBackward = document.getElementById('back');
const progress = document.getElementById('progress');
const timestamp = document.getElementById('timestamp');
const replay = document.getElementById('replay');
const loop = document.getElementById('loop');
const loopIcon = document.getElementById('loopIcon');
const plusVolume = document.getElementById('plusVolume');
const minusVolume = document.getElementById('minusVolume');
const volumevalue = document.getElementById('volumevalue');
const fsIcon = document.getElementById('fsIcon');

// Play & Pause video
const toggleVideoStatus = () =>{
    if (video.paused) {
        video.play();
    }else{
        video.pause();
    }
}

// Update play/pause icon
const updatePlayIcon = () =>{
    if(video.paused){
        play.innerHTML = '<i class="fa fa-play fa-2x"></i>'
    }else{
        play.innerHTML = '<i class="fa fa-pause fa-2x"></i>'
    }
}

// Update progress & timestamp
const updateProgress = () =>{
    progress.value = (video.currentTime / video.duration)*100;

    // Get minutes
    let mins = Math.floor(video.currentTime/60);
    if (mins < 10) {
        mins = '0' + String(mins)
    }

    // Get seconds
    let secs = Math.floor(video.currentTime % 60);
    if (secs < 10) {
        secs = '0' + String(secs);
    }

    timestamp.innerHTML =  `${mins}:${secs}`
}

// Set video time to progress
const setVideoProgress = () =>{
    video.currentTime = (+progress.value * video.duration) / 100;
    video.pause();
    setTimeout(()=>{
        video.play();
    }, 300)
}

// Stop video
const stopVideo = () =>{
    video.currentTime = 0;
    video.pause();
}

// Replay video
const replayVideo = () =>{
    video.currentTime = 0;
    video.pause();
    setTimeout(()=>{
        video.play();
    }, 3000)
}

// Set loop icon
const setLoopIcon = () => {
    if (video.loop) {
        loopIcon.classList = "fas fa-sync fa-2x loop";
    }else{
        loopIcon.classList = "fas fa-sync fa-2x unloop";
    }
}
// Set loop video
const setLoopVideo = ()=>{
    if (video.loop === true) {
        video.loop = false;
        setLoopIcon();
    }else{
        video.loop = true;
        setLoopIcon();
    }
}


// Fast forward the video
const skipVideo = () =>{
    video.currentTime = video.currentTime + 3;
}

// Fast backward the video
const backVideo = () =>{
    if (video.currentTime <= 3) {
        video.currentTime = 0;
    }else{
        video.currentTime = video.currentTime - 3;
    }
}

// Set Volume Text
const setVolumnText = () =>{
    volumevalue.innerHTML = `${Math.floor(video.volume * 100)}`
}

const addVideoVolume = () =>{
    if (video.volume === 1) {
        video.volume = 1;
        setVolumnText();
    }else{
        video.volume = video.volume + 0.1
        setVolumnText();
    }
}

const reduceVideoVolume = () =>{
    if (video.volume === 0) {
        video.volume = 0;
        setVolumnText();
    }else{
        video.volume = video.volume - 0.1
        setVolumnText();
    }
}

const setFullScreen = () =>{
    if (video.requestFullscreen) {
        video.requestFullscreen();
      } else if (video.webkitRequestFullscreen) { /* Safari */
        video.webkitRequestFullscreen();
      } else if (video.msRequestFullscreen) { /* IE11 */
        video.msRequestFullscreen();
      }
}

setLoopIcon();

// Event listeners
video.addEventListener('click', toggleVideoStatus);
video.addEventListener('pause', updatePlayIcon);
video.addEventListener('play', updatePlayIcon);
video.addEventListener('timeupdate', updateProgress);

play.addEventListener('click', toggleVideoStatus);

stop.addEventListener('click', stopVideo);

fastForward.addEventListener('click', skipVideo);
fastBackward.addEventListener('click', backVideo);
replay.addEventListener('click', replayVideo);
loop.addEventListener('click', setLoopVideo);
plusVolume.addEventListener('click', addVideoVolume);
minusVolume.addEventListener('click', reduceVideoVolume);
fsIcon.addEventListener('click', setFullScreen)

progress.addEventListener('change', setVideoProgress);