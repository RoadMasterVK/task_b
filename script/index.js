var slideshowContainer = document.querySelector(".slideshow");
var slideImage = slideshowContainer.querySelector(".slide");
var slideTitle = slideshowContainer.querySelector(".slide-title");
var slideDescription = slideshowContainer.querySelector(".slide-description");
var columnDiv = document.getElementById("column-index");
var currentSlide = 0;
var slides = [];

fetch("json/index.json")
  .then(function (response) {
    return response.json();
  })
  .then(function (data) {
    slides = data.slides;
    showSlide();
    setInterval(nextSlide, 3000);
  });

function showSlide() {
  var slide = slides[currentSlide];
  slideImage.src = slide.image;
  slideTitle.textContent = slide.title;
  slideDescription.textContent = slide.description;
}

function nextSlide() {
  currentSlide = (currentSlide + 1) % slides.length;
  showSlide();
}

// cookie
function setCookie(cookieName, cookieValue, expirationDays) {
  var date = new Date();
  date.setTime(date.getTime() + expirationDays * 24 * 60 * 60 * 1000);
  var expires = "expires=" + date.toUTCString();
  document.cookie = cookieName + "=" + cookieValue + ";" + expires + ";path=/";
}

function checkCookie(cookieName) {
  var cookies = document.cookie.split(";");
  for (var i = 0; i < cookies.length; i++) {
    var cookie = cookies[i].trim();
    if (cookie.indexOf(cookieName + "=") === 0) {
      return true;
    }
  }
  return false;
}

function handleAcceptCookies() {
  var cookieConsentPopup = document.getElementById("cookieConsentPopup");
  var acceptCookiesBtn = document.getElementById("acceptCookiesBtn");

  acceptCookiesBtn.addEventListener("click", function () {
    setCookie("cookieConsent", "accepted", 30); // Cookie 30 days
    cookieConsentPopup.style.display = "none";
  });
}

function showCookieConsentPopup() {
  var cookieConsentPopup = document.getElementById("cookieConsentPopup");

  if (!checkCookie("cookieConsent")) {
    cookieConsentPopup.style.display = "block";
    handleAcceptCookies();
  } else {
    cookieConsentPopup.style.display = "none";
  }
}

showCookieConsentPopup();


 var popup = document.getElementById('popup');
    var video = document.getElementById('video');
    var videoList = document.getElementById('videoList');
    var isVideoPlaying = false;

    function togglePopup() {
      if (isVideoPlaying) {
        video.pause();
        isVideoPlaying = false;
      }
      videoList.classList.toggle('show');
      popup.classList.remove('show');
    }

    function openVideo(src) {
      video.src = src;
      video.play();
      isVideoPlaying = true;
      videoList.classList.remove('show');
      popup.classList.add('show');
    }

    video.onclick = function() {
      video.pause();
      isVideoPlaying = false;
      popup.classList.remove('show');
    };

   // Toggle the active class on the navigation list when the button is clicked
document.getElementById('menu-toggle').addEventListener('click', function() {
  document.querySelector('.navigation').classList.toggle('active');
});
