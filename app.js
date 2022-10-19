// Meditation app built with vanilla javascript
const song = document.querySelector(".song");
const play = document.querySelector(".play");
const replay = document.querySelector(".replay");
const outline = document.querySelector(".moving-outline circle");
const video = document.querySelector(".vid-container video");
//Sounds 
const sounds = document.querySelectorAll(".song");
//Time Display 
const timeDisplay = document.querySelector(".time-display");
// Get the length of the outline for the time ring
const outlineLength = outline.getTotalLength();
//Duration  for the meditations
const timeSelect = document.querySelectorAll(".time-select button");
let fakeDuration = 600;
//  how long to wait for the duration to complete.
outline.style.strokeDashoffset = outlineLength; // stroke dash offset for the duration to complete
outline.style.strokeDasharray = outlineLength; // stroke dash array for the duration to complete
timeDisplay.textContent = `${Math.floor(fakeDuration / 60)}:${Math.floor( // minutes since the song started
  fakeDuration % 60
)}`;

// play sound
play.addEventListener("click", function() { // add an event listener to the play button
  checkPlaying(song); // call the checkPlaying function
});

replay.addEventListener("click", function() { 
    restartSong(song); 
    
  });

// Select the duration of the meditation
const restartSong = song =>{  // call the restartSong function
    let currentTime = song.currentTime;  // get the current time
    song.currentTime = 0;  // set the current time to 0
    console.log("ciao")  

}
// Select sound to play
timeSelect.forEach(option => { // select option from list of options 
  option.addEventListener("click", function() { // add an event listener to the list of options selected 
    fakeDuration = this.getAttribute("data-time");  // get the data time attribute from each options selected
    timeDisplay.textContent = `${Math.floor(fakeDuration / 60)}:${Math.floor(  // minutes since the song started
      fakeDuration % 60
    )}`;
  });
});
// Create a function that will be called when the play button is clicked and will check if the song is playing or not
const checkPlaying = song => { // pass the song as a parameter
  if (song.paused) { // if the song is paused
    song.play(); // play the song if it is playing and if it is not playing then stop playing
    video.play(); // play the video if it is playing and if it is not playing then stop playing
    play.src = "./svg/pause.svg"; // change the play button to a pause button
  } else {
    song.pause();
    video.pause();
    play.src = "./svg/play.svg"; // change the play button to a play button
  }
};
// We can animate the circle
song.ontimeupdate = function() { // add an event listener to the song
  let currentTime = song.currentTime; // get the current time of the song
  let elapsed = fakeDuration - currentTime; // get the elapsed time of the song
  let seconds = Math.floor(elapsed % 60); // seconds since the song started
  let minutes = Math.floor(elapsed / 60); // minutes since the song started
  timeDisplay.textContent = `${minutes}:${seconds}`; // display the minutes and seconds
  let progress = outlineLength - (currentTime / fakeDuration) * outlineLength; // calculate the progress of the song
  outline.style.strokeDashoffset = progress; // set the progress of the song

  if (currentTime >= fakeDuration) { // if the current time is greater than or equal to the fake duration
    song.pause(); // pause the song
    song.currentTime = 0; // set the current time to 0
    play.src = "./svg/play.svg"; // change the play button to a  new path to play the song from the beginning
    video.pause(); // pause the video
  }
};