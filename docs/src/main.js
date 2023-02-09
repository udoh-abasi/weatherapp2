import currentWeatherContent from "./currentWeather.js";
import tomorrowWeatherContent from "./todayWeather.js";

// UPDATE THE HTML TO CURRENT DATE AND TIME
const updateCurrentDate = () => {
  const dateTag = document.querySelector(".todayDate");
  const today = new Date();
  const formattedDate = today.toLocaleString("default", {
    day: "2-digit",
    month: "long",
    year: "numeric",
    hour: "numeric",
    minute: "numeric",
  });

  dateTag.setAttribute("datetime", today);
  dateTag.innerHTML = formattedDate;
};

updateCurrentDate();

const apiKey = "65ad7b1521f91ef0d003bdb9ff51bd1f";
let location = "lagos,ng";

// CHANGE THE CITY WHEN A NEW CITY IS SELECTED FROM THE <select> TAG

const getSelectedCity = () => {
  const selectTag = document.querySelector("select");
  selectTag.addEventListener("change", () => {
    location = selectTag.value;

    const currentButton = document.querySelector("#currentWeather");
    const tomorrowButton = document.querySelector("#todayWeather");

    if (currentButton.checked) {
      currentFuncCall();
    } else if (tomorrowButton.checked) {
      tomorrowFuncCall();
    }
  });
};

// FUNCTION CALL FOR CURRENT WEATHER
const currentFuncCall = function () {
  fetch(
    `https://api.openweathermap.org/data/2.5/weather?appid=${apiKey}&units=metric&q=${location}`
  )
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      const errorElement = document.querySelector("p.errorElement");
      errorElement.classList.add("hidden");

      const content_Replaced = document.querySelector(".content_Replaced");
      content_Replaced.innerHTML = currentWeatherContent(data);
    })
    .then(() => {
      updateCurrentDate();
    })
    .then(function () {
      getSelectedCity();
    })
    .catch((error) => {
      const errorElement = document.querySelector("p.errorElement");
      errorElement.classList.remove("hidden");
      errorElement.innerHTML = `<div class="font-bold text-red-600"> Something went wrong, Please try again <div>`;

      console.log("Error is from Current call. And it is:", error);
    });
};

currentFuncCall(); // The today function will load by default

// FUNCTION CALL FOR TOMORROW WEATHER
const tomorrowFuncCall = function () {
  const currentHour = new Date().getHours();
  const countToNextDay = ((24 - currentHour) / 3 + 1).toFixed();

  fetch(
    `https://api.openweathermap.org/data/2.5/forecast?appid=${apiKey}&q=${location}&cnt=${countToNextDay}&units=metric`
  )
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      const errorElement = document.querySelector("p.errorElement");
      errorElement.classList.add("hidden");

      const content_Replaced = document.querySelector(".content_Replaced");
      content_Replaced.innerHTML = tomorrowWeatherContent(data);
    })
    .then(() => {
      updateCurrentDate();
    })
    .then(function () {
      getSelectedCity();
    })
    .catch((error) => {
      const errorElement = document.querySelector("p.errorElement");
      errorElement.classList.remove("hidden");
      errorElement.innerHTML = `<div class="font-bold text-red-600"> Something went wrong, Please try again <div>`;

      console.log("Error is from Tommorow's call. And it is:", error);
    });
};

// ADD DARK/LIGHT EFFECT WHEN BUTTON IS CLICKED

const setDarkLightMode = () => {
  const darkLightCheckbox = document.querySelector("#darkLightCheckbox");
  const html = document.documentElement;

  if (window.matchMedia("(prefers-color-scheme: dark)").matches) {
    darkLightCheckbox.removeAttribute("checked");
    html.classList.toggle("dark");
  } else {
    darkLightCheckbox.setAttribute("checked", true);
    html.classList.toggle("light");
  }

  darkLightCheckbox.addEventListener("click", () => {
    html.classList.toggle("light");
    html.classList.toggle("dark");
    darkLightCheckbox.check = !darkLightCheckbox.check; // This unchecks the checkbox if it is checked, and vice-versa
  });
};

setDarkLightMode();

// ADD EVENT LISTENERS TO THE RADIO BUTTONS AND CALL EACH FUNCTION ON CLICK

const currentButton = document.querySelector("#currentWeather");
currentButton.addEventListener("click", currentFuncCall);
// console.log(currentButton.check);

const tomorrowButton = document.querySelector("#todayWeather");
tomorrowButton.addEventListener("click", tomorrowFuncCall);
// console.log(tomorrowButton.hasAttribute("checked"));
