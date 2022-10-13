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
  }
  if (!secondPage.hidden && thirdPage.hidden && username.trim() != "") {
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
    hideAndShow(forthPage, fithPage);
    return;
  }
  if (!fithPage.hidden && curiosity) {
    console.log(curiosity);
    onboardingForm.crypto.focus();
    hideAndShow(fithPage, sixthPage);
    return;
  }
  if (!sixthPage.hidden && crypto) {
    console.log(crypto);
    seventhPage.innerHTML = `<h1 class="hero__section__headline">
    That’s all ${username}!</br>Enjoy your day with kikaku!
  </h1>`;
    hideAndShow(sixthPage, seventhPage);
  }
}
// function moves to next page on pressing enter
function pressEnter(e) {
  if (e.key === "Enter") {
    nextPage(e);
  }
}

// Listiners
onboardingForm.addEventListener("click", radioSelection);
document.addEventListener("keydown", pressEnter);
nextBtn.addEventListener("click", nextPage);
