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
    alert("provide name!");
    return;
  }
  if (!secondPage.hidden && thirdPage.hidden && username.trim() != "") {
    localStorage.setItem("userName", username);
    thirdPage.innerHTML = `<p class="hero__section__paragraph"> Hi ${username}, we have a few simple questions to make your board more personal.
    `;
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
    alert("provide theme!");
    return;
  }
  if (!fithPage.hidden && curiosity) {
    console.log(curiosity);
    localStorage.setItem("curiosity", curiosity);
    hideAndShow(fithPage, sixthPage);
    onboardingForm.crypto.focus();
    return;
  } else if (!curiosity && theme) {
    alert("provide curiosoti!");
    return;
  }
  if (!sixthPage.hidden && crypto.trim() != "") {
    console.log(crypto);
    localStorage.setItem("crypto", crypto);
    seventhPage.innerHTML = `<h1 class="hero__section__headline">
    That’s all ${username}!</br>Enjoy your day with kikaku!
  </h1>`;
    hideAndShow(sixthPage, seventhPage);
  } else if (crypto.trim() === "" && curiosity) {
    alert("provide crypto!");
    return;
  }
  if (!seventhPage.hidden) {
    console.log("bye bye!");
    onboardingPage.hidden = true;
    mainBoardPage.hidden = false;
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
  console.log("Hello!");
  if (!localStorage.userName) {
    onboardingPage.hidden = false;
    document.getElementById("main-board").hidden = true;
  }
}

// Listiners
onboardingForm.addEventListener("click", radioSelection);
document.addEventListener("keydown", pressEnter);
nextBtn.addEventListener("click", nextPage);

// On Load
startBoarding();
