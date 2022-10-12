// Onboarding Pages
const firstPage = document.getElementById("first-info");
const secondPage = document.getElementById("second-info");
const thirdPage = document.getElementById("third-info");

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

function changePage(e) {
  e.preventDefault();
  let username = onboardingForm.username.value;
  if (!firstPage.hidden && secondPage.hidden) {
    hideAndShow(firstPage, secondPage);
    return;
  }
  if (!secondPage.hidden && thirdPage.hidden) {
    thirdPage.innerHTML = `<p class="hero__wrapper__paragraph"> Hi ${username}, we have a few simple questions to make your board more personal.
    `;
    hideAndShow(secondPage, thirdPage);
    skipBtn.hidden = false;
    return;
  }
}

nextBtn.addEventListener("click", changePage);
