
    // Open Weather Map API key
    const apiKey = "4335bc272590b8efc3d2677cb813efdf";

    // API endpoint for current weather
    const apiUrl = "https://api.openweathermap.org/data/2.5/weather?";

    const searchBox = document.querySelector(".search input");
    const searchBtn = document.querySelector(".search button");
    const weatherIcon = document.querySelector(".weather-icon");

    async function checkWeather(city){
        const response = await fetch(`${apiUrl}q=${city}&appid=${apiKey}&units=metric`);
        const data = await response.json();

        if(response.status == 404){
            document.querySelector(".error").style.display = "block";
            document.querySelector(".weather").style.display = "none";
        }else{
            document.querySelector(".error").style.display = "none";
            document.querySelector(".weather").style.display = "block";


        document.querySelector(".city").textContent = data.name;
        document.querySelector(".temp").textContent = Math.round(data.main.temp) + "°C";
        document.querySelector(".humidity").textContent = data.main.humidity + "%";
        document.querySelector(".wind").textContent = data.wind.speed + " kmph";


        const weatherMain = data.weather[0].main;
            if (weatherMain === "Clouds") {
                weatherIcon.src = "img/clouds.png";
            } else if (weatherMain === "Clear") {
                weatherIcon.src = "img/clear.png";
            } else if (weatherMain === "Rain") {
                weatherIcon.src = "img/rain.png";
            } else if (weatherMain === "Drizzle") {
                weatherIcon.src = "img/drizzle.png";
            } else if (weatherMain === "Mist") {
                weatherIcon.src = "img/mist.png";
            }
                // Check if it's night time
                const currentTime = new Date().getTime() / 1000; // Convert to seconds
                const sunsetTime = data.sys.sunset;
                const sunriseTime = data.sys.sunrise;

                // If the current time is after sunset and before sunrise, it's night time
                if (currentTime > sunsetTime || currentTime < sunriseTime) {
                    document.body.style.backgroundColor = "#1e2324"; // Set background color to dark
                } else {
                    document.body.style.backgroundColor = "#e7feff"; // Set background color to light
                }
            }
        }
    // Function to handle search
    function handleSearch() {
        checkWeather(searchBox.value);
    }

    // Event listener for search button click
    searchBtn.addEventListener("click", handleSearch);

    // Event listener for Enter key press in input field
    searchBox.addEventListener("keyup", function(event) {
        if (event.key === "Enter") {
            handleSearch();
        }
    });

    // Event listener to refresh page when clicking outside the card
    document.addEventListener("click", function(event) {
        const card = document.querySelector(".card");
        if (!card.contains(event.target)) {
            location.reload();
        }
    });