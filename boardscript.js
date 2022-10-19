//main variables inside the board
const mainBoardPage = document.getElementById("main-board");
const grettingMsg = document.getElementById("gretting");
const switchBtn = document.getElementById("widget-swticher");
// data from the localStorage

let icons = document.querySelectorAll(".icon");
let iconsInfo = document.querySelectorAll(".icon__info");

let mainUsername = localStorage.getItem("userName");
let myCrypto = localStorage.getItem("crypto");
let myTheme = localStorage.getItem("themes");
let myTime = [];

// api Key for unslpash
const apiKey = "L3vkAHR1RZx6ycMWbsGzNucWccOq-ssQ3f7WVQKH9ng";

// fetching unsplash photos
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

//   fetching Crytpo API from Coingecko
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

// Function getting current time
function getCurrentTime() {
  const date = new Date();
  document.getElementById("time").textContent = date.toLocaleTimeString(
    "en-GB",
    { timeStyle: "short" }
  );
  myTime = date.toLocaleTimeString("en-GB", { timeStyle: "short" }).split(":");
}
getCurrentTime();
setInterval(getCurrentTime, 1000);

// fetching weather API
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

function displayGretting() {
  if (parseInt(myTime[0]) < 12) {
    grettingMsg.innerHTML = `Good morning ${mainUsername}!`;
  } else if (parseInt(myTime[0]) >= 12 && parseInt(myTime[0]) < 18) {
    grettingMsg.innerHTML = `Good afternoon ${mainUsername}!`;
  } else if (parseInt(myTime[0]) >= 18) {
    grettingMsg.innerHTML = `Good evening ${mainUsername}!`;
  }
}

switchBtn.addEventListener("click", () => {
  console.log(switchBtn.checked);
  if (switchBtn.checked) {
    document.getElementById("my-widgets").hidden = false;
  } else if (!switchBtn.checked) {
    document.getElementById("my-widgets").hidden = true;
  }
});
displayGretting();
setInterval(displayGretting, 60000);

// icons[0].addEventListener("mouseover", () => {
//   iconsInfo[0].style.display = "block";
// });
