const convertToHumanTime = (theSeconds) => {
  var date = new Date(theSeconds * 1000);
  return date.toLocaleTimeString();
};

const currentWeatherContent = function ({
  weather,
  main: { temp },
  wind: { deg, speed },
  sys: { sunrise, sunset },
  name,
}) {
  return `
  <h2 class="text-center uppercase my-4 font-bold text-xl"> 
    Current Weather Report 
  </h2>
    <p
    class="flex justify-center items-center text-xl text-[var(--secondary-color)]"
  >
    <i class="fa-solid fa-location-dot"></i>
    <span class="p-2 font-bold uppercase">${name}, NIGERIA</span>
  </p>

  <div class="flex flex-col justify-center items-center">
    <img
      src="https://openweathermap.org/img/wn/${weather[0].icon}@2x.png"
      alt="Current weather icon"
      class="w-40"
    />
    <p
      class="weatherValue text-7xl font-bold my-4 text-[var(--secondary-color)]"
    >
      ${temp}°C
    </p>
    <p class="WeatherName text-2xl font-bold uppercase">${weather[0].main}</p>
    <p class="weatherDescription text-2xl">${weather[0].description}</p>
  </div>

  <div id="wind">
  <div
  style="transform:rotate(${deg}deg)"
    class="before:border-8 before:border-[var(--secondary-color)] before:rounded-[50%] rounded-[50%] before:w-[120px] w-[120px] before:h-[120px] h-[120px] before:absolute flex justify-center items-center m-auto mt-6 relative"
  >
    <p
      class="text-[var(--secondary-color)] flex flex-col items-center"
    >
      <span
        id="wind"
        class="block text-4xl top-[-33px] absolute font-bold text-blue-500"
        aria-label="Up pointing triangle"
      >
        ▲
      </span>
    </p>
  </div>
  <p class="">
    <span class="text-center block">${speed}</span>
    <span class="text-center block"> meter/sec</span>
  </p>
</div>

<p class="flex justify-center mb-6 mt-5 font-bold text-2xl">
  Wind Direction
</p>

  <div class="text-lg">
    <p class="mb-3">
      <span class="font-bold">Sun will RISE by:</span> 
      <time datetime="${new Date(sunrise * 1000)}"> ${convertToHumanTime(
    sunrise
  )} </time>
    </p>

    <p>
      <span class="font-bold">Sun will SET by:</span> 
      <time datetime="${new Date(sunset * 1000)}"> ${convertToHumanTime(
    sunset
  )} </time>
    </p>
  </div>
    `;
};

export default currentWeatherContent;
