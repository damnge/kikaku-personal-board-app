// Onboarding Page
const onboardingPage = document.getElementById("onboarding-page");
// that includes each indvidual page with different info:
const firstPage = document.getElementById("first-info");
const secondPage = document.getElementById("second-info");
const thirdPage = document.getElementById("third-info");
const forthPage = document.getElementById("forth-info");
const fithPage = document.getElementById("fifth-info");
const sixthPage = document.getElementById("sixth-info");
const seventhPage = document.getElementById("seventh-info");

const errorMsg = document.querySelectorAll(".error__msg");

//Inputs
const radioInputs = document.querySelectorAll(".radio__inputs__box");

//User Data
const onboardingForm = document.getElementById("onbording-form");

// Paragraphs
const infoTextP3 = document.getElementById("info-paragraph");

// Butons
const nextBtn = document.getElementById("next-btn");
const skipBtn = document.getElementById("skip-btn");

// function to show and hide different pages

function hideAndShow(hidePage, showPage) {
  hidePage.hidden = true;
  showPage.hidden = false;
}

// function that gives style to selected category
function radioSelection() {
  radioInputs.forEach((radioEl) => {
    // At the beginning remove selected label styling
    radioEl.classList.remove("selected__label");
    // add selected label back if radio input is checked
    if (radioEl.children[1].checked) {
      radioEl.classList.add("selected__label");
    }
  });
}

// Function that switch the between pages
function nextPage(e) {
  e.preventDefault();

  let username = onboardingForm.username.value;
  let theme = onboardingForm.themes.value;
  let curiosity = onboardingForm.answer.value;
  let crypto = onboardingForm.crypto.value;

  if (!firstPage.hidden && secondPage.hidden) {
    hideAndShow(firstPage, secondPage);
    onboardingForm.username.focus();
    return;
  } else if (username.trim() === "") {
    console.log("Please provide the answer0!");
    errorMsg[0].textContent = "Please provide the name";
  }
  if (!secondPage.hidden && thirdPage.hidden && username.trim() != "") {
    localStorage.setItem("userName", username);
    localStorage.setItem("themes", "786923");
    localStorage.setItem("curiosity", "false");
    thirdPage.innerHTML = `<p class="hero__section__paragraph"> Hi ${username}, we have a few simple questions to make your board more personal.
    `;
    errorMsg[0].textContent = "";
    hideAndShow(secondPage, thirdPage);
    skipBtn.hidden = false;
    return;
  }
  if (!thirdPage.hidden && forthPage.hidden) {
    hideAndShow(thirdPage, forthPage);
    return;
  }
  if (!forthPage.hidden && theme) {
    console.log(theme);
    localStorage.setItem("themes", theme);
    hideAndShow(forthPage, fithPage);
    return;
  } else if (!theme && username) {
    errorMsg[1].textContent = "Please provide the answer";
    return;
  }
  if (!fithPage.hidden && curiosity) {
    console.log(curiosity);
    localStorage.setItem("curiosity", curiosity);
    hideAndShow(fithPage, sixthPage);
    onboardingForm.crypto.focus();
    errorMsg[1].textContent = "";
    return;
  } else if (!curiosity && theme) {
    errorMsg[2].textContent = "Please provide the answer";
    return;
  }
  if (!sixthPage.hidden && crypto.trim() != "") {
    console.log(crypto);
    localStorage.setItem("crypto", crypto.toLowerCase());
    seventhPage.innerHTML = `<h1 class="hero__section__headline">
    That’s all ${username}!</br>Enjoy your day with kikaku!
  </h1>`;
    hideAndShow(sixthPage, seventhPage);
    errorMsg[2].textContent = "";
    return;
  } else if (crypto.trim() === "" && curiosity) {
    errorMsg[3].textContent = "Please provide the answer";
    return;
  }
  if (!seventhPage.hidden) {
    document.getElementById("my-crypto-widget").hidden = false;
    onboardingPage.hidden = true;
    mainBoardPage.hidden = false;
    errorMsg[3].textContent = "";
    location.reload();
    return;
  }
}
// function moves to next page on pressing enter
function pressEnter(e) {
  if (e.key === "Enter") {
    nextPage(e);
  }
  return;
}

function startBoarding() {
  console.log("Welcome Back!");
  if (!localStorage.userName) {
    onboardingPage.hidden = false;
    document.getElementById("main-board").hidden = true;
  }
}

// Listiners
onboardingForm.addEventListener("click", radioSelection);
document.addEventListener("keydown", pressEnter);
nextBtn.addEventListener("click", nextPage);
skipBtn.addEventListener("click", () => {
  onboardingPage.hidden = true;
  document.getElementById("main-board").hidden = false;
});

// On Load
startBoarding();
