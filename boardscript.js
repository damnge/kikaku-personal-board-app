//main variables inside the board
const mainBoardPage = document.getElementById("main-board");
const grettingMsg = document.getElementById("gretting");
const switchBtn = document.getElementById("widget-swticher");
// const iconNav = document.getElementById("icon-nav");
const icons = document.querySelectorAll(".icon");
// const iconsInfo = document.querySelectorAll(".icon__info");

// data from the localStorage
let mainUsername = localStorage.getItem("userName");
let myCrypto = localStorage.getItem("crypto").toLowerCase();
let myTheme = localStorage.getItem("themes");
let myWikipedia = JSON.parse(localStorage.getItem("Wikipedia"));
let myCuriosity = JSON.parse(localStorage.getItem("curiosity"));

// reassignable variables
let myTime = [];
let date = "";
let weekday = "";
let day = "";
let month = "";
let monthNumber = "";
let currentDate = "";
let nextEvent = 0;

// Navigation through icons above the clock

icons[0].addEventListener("click", () => {
  document.getElementById("clock").style.display = "flex";
  document.getElementById("meditation").style.display = "none";
  document.getElementById("pomodoro-timer").style.display = "none";
  song.pause();
  document.getElementById("start-btn").textContent = "Start";
});

icons[1].addEventListener("click", () => {
  document.getElementById("clock").style.display = "none";
  document.getElementById("pomodoro-timer").style.display = "none";
  document.getElementById("meditation").style.display = "flex";
  document.getElementById("my-widgets").hidden = true;
  document.getElementById("widget-swticher").checked = false;
});

icons[2].addEventListener("click", () => {
  document.getElementById("clock").style.display = "none";
  document.getElementById("meditation").style.display = "none";
  document.getElementById("pomodoro-timer").style.display = "flex";
  document.getElementById("my-widgets").hidden = true;
  document.getElementById("widget-swticher").checked = false;
  song.pause();
});

// api Key for unslpash
const apiKey = "L3vkAHR1RZx6ycMWbsGzNucWccOq-ssQ3f7WVQKH9ng";

// BACKGROUND THEME WIDGET --- fetching unsplash photos

fetch(
  `https://api.unsplash.com/photos//random?orientation=landscape&query=${myTheme}&client_id=${apiKey}`
)
  .then((res) => {
    if (!res.ok) {
      throw Error("Can't load photos from unsplash!");
    }
    return res.json();
  })
  .then((data) => {
    mainBoardPage.style.backgroundImage = `url(${data.urls.regular})`;
    document.getElementById("author").textContent = `By: ${data.user.name}`;
  })
  .catch((err) => {
    console.error(err);
    // Use a default background image
    mainBoardPage.style.backgroundImage = `url(img/errorbg.png)`;
  });

// Swticher for left widgets
switchBtn.addEventListener("click", () => {
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
  .catch((err) => {
    console.error(err);
    document.querySelector(
      ".widget__crypto"
    ).innerHTML = `<p class="widget__crypto__error"> Unfortunately we don't have this coin in our database</p>`;
  });

document.getElementById("my-crypto-widget").addEventListener("click", () => {
  document.getElementById("onboarding-page").hidden = false;
  mainBoardPage.hidden = true;
  firstPage.hidden = true;
  sixthPage.hidden = false;
});

// DATE AND TIME WIDGET --- Function getting current time and date
function getCurrentTimeAndDate() {
  date = new Date();
  everyday = new Date(date);
  const options = { weekday: "long" };
  weekday = new Intl.DateTimeFormat("en-US", options).format(everyday);
  day = date.getDate();
  month = date.toLocaleString("default", { month: "long" });
  monthNumber = 1 + date.getMonth();
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

// Wikipedia API widget
if (myCuriosity) {
  fetch(`https://byabbe.se/on-this-day/${monthNumber}/${day}/events.json`)
    .then((res) => {
      if (!res.ok) {
        throw Error("Error we have a problem!");
      }
      return res.json();
    })

    .then((data) => {
      localStorage.setItem("Wikipedia", JSON.stringify(data.events));
      document.querySelector(
        ".widget__wiki__year"
      ).innerHTML = `In the year ${myWikipedia[nextEvent].year}`;
      document.querySelector(
        ".widget__wiki__description"
      ).innerHTML = `${myWikipedia[nextEvent].description}`;
    })
    .catch((err) => {
      console.error(err);
    });
} else {
  document.getElementById("wikipedia").style.display = "none";
}

//  Next Event on click from Wikipedia
document.querySelector(".widget__wiki__btn").addEventListener("click", () => {
  nextEvent += 1;
  document.querySelector(
    ".widget__wiki__year"
  ).innerHTML = `In the year ${myWikipedia[nextEvent].year}`;
  document.querySelector(
    ".widget__wiki__description"
  ).innerHTML = `${myWikipedia[nextEvent].description}`;
});

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

timeDisplay.textContent = `${Math.floor(fakeDuration / 60)}:00`;

// play sound
play.addEventListener("click", function () {
  // add an event listener to the play button
  checkPlaying(song); // call the checkPlaying function
});

// Select the duration of the meditation
const restartSong = (song) => {
  // call the restartSong function
  let currentTime = song.currentTime; // get the current time
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

song.ontimeupdate = function () {
  // add an event listener to the song
  let currentTime = song.currentTime; // get the current time of the song
  let elapsed = fakeDuration - currentTime; // get the elapsed time of the song
  let seconds = Math.floor(elapsed % 60); // seconds since the song started
  let minutes = Math.floor(elapsed / 60); // minutes since the song started
  if (song.paused && seconds === 0) {
    timeDisplay.textContent = `${minutes}:${seconds}0`;
  } else if (!song.paused && seconds > 9) {
    timeDisplay.textContent = `${minutes}:${seconds}`; // display the minutes and seconds
  } else if (seconds < 10) {
    timeDisplay.textContent = `${minutes}:0${seconds}`;
  }
  if (currentTime >= fakeDuration) {
    // if the current time is greater than or equal to the fake duration
    song.pause(); // pause the song
    song.currentTime = 0; // set the current time to 0
    // change the play button to a  new path to play the song from the beginning
  }
};

// POMODORO APP

// Start by creating a timer variable with the following properties
const timer = {
  pomodoro: 25,
  shortBreak: 5,
  longBreak: 15,
  longBreakInterval: 4,
  sessions: 0,
};
// Add the ability to start the timer and countdown to zero.
let interval;
//
const buttonSound = new Audio("./sounds/button-sound.mp3");
const mainButton = document.getElementById("js-btn");
mainButton.addEventListener("click", () => {
  buttonSound.play();
  const { action } = mainButton.dataset;
  if (action === "start") {
    startTimer();
  } else {
    stopTimer();
  }
});
// The next thing we need to do is update the countdown with the appropriate amount of minutes and seconds once any of the three buttons above it is clicked. To do this we need to create an event listener that detects a click on the buttons and a function to switch the mode of the timer appropriately.
const modeButtons = document.querySelector("#js-mode-buttons");
modeButtons.addEventListener("click", handleMode);
// This function takes a timestamp argument and finds the difference between the current time and the end time in milliseconds. This value is stored in the difference variable and used to compute the total number of seconds left by dividing by 1000. The result is subsequently converted to an integer in base 10 through the Number.parseInt() method and stored in the total variable.
function getRemainingTime(endTime) {
  const currentTime = Date.parse(new Date());
  const difference = endTime - currentTime;

  const total = Number.parseInt(difference / 1000, 10);
  const minutes = Number.parseInt((total / 60) % 60, 10);
  const seconds = Number.parseInt(total % 60, 10);

  return {
    total,
    minutes,
    seconds,
  };
}
//  The switchMode function is called with the current mode as an argument. The switchMode function then updates the timer object with the current mode and the remaining time for that mode. The updateClock function is then called to update the UI with the current mode and remaining time.
function startTimer() {
  let { total } = timer.remainingTime;
  const endTime = Date.parse(new Date()) + total * 1000;

  if (timer.mode === "pomodoro") timer.sessions++;

  mainButton.dataset.action = "stop";
  mainButton.textContent = "Stop";
  mainButton.classList.add("active");

  interval = setInterval(function () {
    timer.remainingTime = getRemainingTime(endTime);
    updateClock();

    total = timer.remainingTime.total;
    if (total <= 0) {
      clearInterval(interval);

      switch (timer.mode) {
        case "pomodoro":
          if (timer.sessions % timer.longBreakInterval === 0) {
            switchMode("longBreak");
          } else {
            switchMode("shortBreak");
          }
          break;
        default:
          switchMode("pomodoro");
      }
      document.querySelector(`[data-sound="${timer.mode}"]`).play();

      startTimer();
    }
  }, 100);
}

function stopTimer() {
  clearInterval(interval);

  mainButton.dataset.action = "start";
  mainButton.textContent = "Start";
  mainButton.classList.remove("active");
}
// updateClock() function is invoked. This function is how the countdown portion of the application is updated. It first updates the text of the timer to reflect the current time remaining. Next, it updates the progress bar to reflect the current time remaining. Finally, it updates the title of the page to reflect the current time remaining.
function updateClock() {
  const { remainingTime } = timer;
  const minutes = `${remainingTime.minutes}`;
  const seconds = `${remainingTime.seconds}`.padStart(2, "0");

  const min = document.getElementById("js-minutes");
  const sec = document.getElementById("js-seconds");
  min.textContent = minutes;
  sec.textContent = seconds;

  document.title = `${minutes}:${seconds} — ${text}`;

  progress.value = timer[timer.mode] * 60 - timer.remainingTime.total;
}
// The switchMode() function adds two new properties to the timer object. First, a mode property is set to the current mode which could be pomodoro, shortBreak or longBreak. Next, a remainingTime property is set on the timer.
function switchMode(mode) {
  timer.mode = mode;
  timer.remainingTime = {
    total: timer[mode] * 60,
    minutes: timer[mode],
    seconds: 0,
  };
  stopTimer();

  document
    .querySelectorAll("button[data-mode]")
    .forEach((e) => e.classList.remove("active"));
  document.querySelector(`[data-mode="${mode}"]`).classList.add("active");
  updateClock();
}

function handleMode(event) {
  const { mode } = event.target.dataset;

  if (!mode) return;

  switchMode(mode);
  stopTimer();
}

document.addEventListener("DOMContentLoaded", () => {
  if ("Notification" in window) {
    if (
      Notification.permission !== "granted" &&
      Notification.permission !== "denied"
    ) {
      Notification.requestPermission().then(function (permission) {
        if (permission === "granted") {
          new Notification(
            "Awesome! You will be notified at the start of each session"
          );
        }
      });
    }
  }

  switchMode("pomodoro");
});

// TO-DO LIST APP

// On Load
displayGretting();
