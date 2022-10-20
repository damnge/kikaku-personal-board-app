//main variables inside the board
const mainBoardPage = document.getElementById("main-board");
const grettingMsg = document.getElementById("gretting");
const switchBtn = document.getElementById("widget-swticher");
const icons = document.querySelectorAll(".icon");
const iconsInfo = document.querySelectorAll(".icon__info");

// data from the localStorage
let mainUsername = localStorage.getItem("userName");
let myCrypto = localStorage.getItem("crypto");
let myTheme = localStorage.getItem("themes");

// reassignable variables
let myTime = [];
let date = "";
let weekday = "";
let day = "";
let month = "";
let currentDate = "";

// Navigation through icons above the clock

icons[0].addEventListener("click", () => {
  document.getElementById("clock").style.display = "flex";
  document.getElementById("meditation").style.display = "none";
  song.pause();
  document.getElementById("start-btn").textContent = "Start";
});

icons[1].addEventListener("click", () => {
  document.getElementById("clock").style.display = "none";
  document.getElementById("meditation").style.display = "flex";
  document.getElementById("my-widgets").hidden = true;
  document.getElementById("widget-swticher").checked = false;
});

// api Key for unslpash
const apiKey = "L3vkAHR1RZx6ycMWbsGzNucWccOq-ssQ3f7WVQKH9ng";

// BACKGROUND THEME WIDGET --- fetching unsplash photos
fetch(
  `https://api.unsplash.com/photos//random?orientation=landscape&query=${myTheme}&client_id=${apiKey}`
)
  .then((res) => res.json())
  .then((data) => {
    mainBoardPage.style.backgroundImage = `url(${data.urls.regular})`;
    document.getElementById("author").textContent = `By: ${data.user.name}`;
  })
  .catch((err) => {
    // Use a default background image
    mainBoardPage.style.backgroundImage = `url(img/errorbg.png)`;
  });

// Swticher for left widgets
switchBtn.addEventListener("click", () => {
  console.log(switchBtn.checked);
  if (switchBtn.checked) {
    document.getElementById("my-widgets").hidden = false;
  } else if (!switchBtn.checked) {
    document.getElementById("my-widgets").hidden = true;
  }
});

//   CRYPTO WIDGET ---- fetching Crytpo API from Coingecko
fetch(
  `https://api.coingecko.com/api/v3/coins/${myCrypto}?tickers=true&market_data=true&community_data=true&developer_data=true&sparkline=true`
)
  .then((res) => {
    if (!res.ok) {
      throw Error("Something went wrong");
    }
    return res.json();
  })
  .then((data) => {
    console.log(data);
    document.getElementById("crypto-img").innerHTML = `
            <img src=${data.image.small} />
        `;
    document.getElementById("crypto-data").innerHTML += `
            <p class="current__price">$${data.market_data.current_price.usd}</p>
            <p class="price__change">${data.market_data.price_change_24h_in_currency.usd.toFixed(
              2
            )}</p>
        `;
    if (data.market_data.price_change_24h_in_currency.usd < 0) {
      document.querySelector(".price__change").style.color = "red";
      document.getElementById(
        "crypto-chart"
      ).innerHTML = `<img src="img/minuschart.svg" alt="daily chart of ${myCrypto}">`;
    } else {
      document.querySelector(".price__change").style.color = "green";
      document.getElementById(
        "crypto-chart"
      ).innerHTML = `<img src="img/pluschart.svg" alt="daily chart of ${myCrypto}">`;
    }
  })
  .catch((err) => console.error(err));

// DATE AND TIME WIDGET --- Function getting current time and date
function getCurrentTimeAndDate() {
  date = new Date();
  everyday = new Date(date);
  const options = { weekday: "long" };
  weekday = new Intl.DateTimeFormat("en-US", options).format(everyday);
  day = date.getDate();
  month = date.toLocaleString("default", { month: "long" });
  let year = date.getFullYear();
  currentDate = `${day}-${month}-${year}`;
  document.getElementById("weekday").textContent = weekday;
  document.getElementById("weekday-number").textContent = day;
  document.getElementById("current-month").innerHTML = `<h3>${month}`;
  document.getElementById("time").textContent = date.toLocaleTimeString(
    "en-GB",
    { timeStyle: "short" }
  );
  myTime = date.toLocaleTimeString("en-GB", { timeStyle: "short" }).split(":");
}
getCurrentTimeAndDate();
setInterval(getCurrentTimeAndDate, 1000);

// WEATHER WIDGET --- fetching weather API
navigator.geolocation.getCurrentPosition((position) => {
  fetch(
    `https://apis.scrimba.com/openweathermap/data/2.5/weather?lat=${position.coords.latitude}&lon=${position.coords.longitude}&units=metric`
  )
    .then((res) => {
      if (!res.ok) {
        throw Error("Weather data not available");
      }
      return res.json();
    })
    .then((data) => {
      const iconUrl = `http://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`;
      document.getElementById("weather").innerHTML = `
                <img src=${iconUrl} />
                <p class="weather-temp">${Math.round(data.main.temp)}º</p>
                <p class="weather-city">${data.name}</p>
            `;
    })
    .catch((err) => console.error(err));
});

// Display Greeting depending on the time of the day
function displayGretting() {
  if (parseInt(myTime[0]) < 12) {
    grettingMsg.innerHTML = `Good morning ${mainUsername}!`;
  } else if (parseInt(myTime[0]) >= 12 && parseInt(myTime[0]) < 18) {
    grettingMsg.innerHTML = `Good afternoon ${mainUsername}!`;
  } else if (parseInt(myTime[0]) >= 18) {
    grettingMsg.innerHTML = `Good evening ${mainUsername}!`;
  }
}

displayGretting();
setInterval(displayGretting, 60000);

// ----- MEDITATION APP ------

const song = document.querySelector(".song");
const play = document.querySelector(".play");

//Sounds
const sounds = document.querySelectorAll(".song");
//Time Display
const timeDisplay = document.querySelector(".time-display");
// Get the length of the outline for the time ring
//Duration  for the meditations
const timeSelect = document.querySelectorAll(".time__btn");
let fakeDuration = 600;

timeDisplay.textContent = `${Math.floor(fakeDuration / 60)}:${Math.floor(
  // minutes since the song started
  fakeDuration % 60
)}`;

// play sound
play.addEventListener("click", function () {
  // add an event listener to the play button
  checkPlaying(song); // call the checkPlaying function
});

// Select the duration of the meditation
const restartSong = (song) => {
  // call the restartSong function
  let currentTime = song.currentTime; // get the current time
  console.log(currentTime);
  song.currentTime = 0; // set the current time to 0
};

timeSelect.forEach((option) => {
  // select option from list of options
  option.addEventListener("click", function () {
    restartSong(song);
    // add an event listener to the list of options selected
    fakeDuration = this.getAttribute("data-time"); // get the data time attribute from each options selected
    timeDisplay.textContent = `${Math.floor(fakeDuration / 60)}:${Math.floor(
      // minutes since the song started
      fakeDuration % 60
    )}`;
  });
});
// Create a function that will be called when the play button is clicked and will check if the song is playing or not
const checkPlaying = (song) => {
  // pass the song as a parameter
  if (song.paused) {
    // if the song is paused
    document.getElementById("start-btn").textContent = "Pause";
    song.play(); // play the song if it is playing and if it is not playing then stop playing
  } else {
    document.getElementById("start-btn").textContent = "Start";
    song.pause();
  }
};
// We can animate the circle
song.ontimeupdate = function () {
  // add an event listener to the song
  let currentTime = song.currentTime; // get the current time of the song
  let elapsed = fakeDuration - currentTime; // get the elapsed time of the song
  let seconds = Math.floor(elapsed % 60); // seconds since the song started
  let minutes = Math.floor(elapsed / 60); // minutes since the song started
  timeDisplay.textContent = `${minutes}:${seconds}`; // display the minutes and seconds

  if (currentTime >= fakeDuration) {
    // if the current time is greater than or equal to the fake duration
    song.pause(); // pause the song
    song.currentTime = 0; // set the current time to 0
    // change the play button to a  new path to play the song from the beginning
  }
};
