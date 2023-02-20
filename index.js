// Select elements from the each HTML document.
const show = document.querySelector('#card');
const countries = document.querySelector('.info');
const search = document.querySelector('.search input');
const regions = document.querySelectorAll('.region select');
const favoriteList = document.querySelector('.favorite-list');

// Initialize an empty array for favorite countries.
let favoriteCountries = [];

// Async function to fetch country data from the Given API.
async function getCountries() {
  const response = await fetch("https://restcountries.com/v2/all");
  const data = await response.json();
  data.forEach(item => showCountry(item));
}

// Function to display individual country information.
function showCountry(item) {
  const country = document.createElement('div');
  country.classList.add('country');

  // Add HTML for each country:Flags,Name,Population,Region,Button.
  country.innerHTML = `
    <div class="imageCountainer">
      <img src="${item.flag}">
    </div>
    <div class="mainCountainer">
      <p class="countryName">${item.name}</p>
      <p>Population: ${item.population}</p>
      <p>Capital: ${item.capital}</p>
      <p class="regionName">Region: ${item.region}</p>
      <button class="favorite-btn">&#10084; </button>
    </div>
  `;

  // Add event listener for the favorite button to make it active.
  const favoriteBtn = country.querySelector('.favorite-btn');
  favoriteBtn.addEventListener('click', () => {
    if (!favoriteCountries.includes(item)) {
      favoriteCountries.push(item);
      showFavoriteCountries();
    }
  });
// Add the country to the list of countries.
  countries.appendChild(country);
}

// Function to display the list of favorite countries
function showFavoriteCountries() {

// Clear the list of favorite countries
  favoriteList.innerHTML = '';

// Loop through the favoriteCountries array and create a new HTML element for each country.
  favoriteCountries.forEach(item => {
    const favoriteCountry = document.createElement('div');
    favoriteCountry.classList.add('favorite-country');

    favoriteCountry.innerHTML = `
      <div class="favorite-imageCountainer">
        <img src="${item.flag}">
      </div>
      <div class="favorite-mainCountainer">
        <p class="favorite-countryName">${item.name}</p>
        <p>Population: ${item.population}</p>
        <p>Capital: ${item.capital}</p>
        <p class="favorite-regionName">Region: ${item.region}</p>
        <button class="remove-btn"> &#10084;</button>
      </div>
    `;

    // Add an event listener to the "remove" button for each favorite country.
    const removeBtn = favoriteCountry.querySelector('.remove-btn');
    removeBtn.addEventListener('click', () => {
      // Filter the favorite countries array to remove the
      //  country that was clicked on, and update the favorite countries list.
      favoriteCountries = favoriteCountries.filter(country => country !== item);
      showFavoriteCountries();
    });
// Add the favorite country to the list of favorite countries
    favoriteList.appendChild(favoriteCountry);
  });

  // Update favorite country count
  const favoriteCount = document.querySelector('.favorite-count');
  favoriteCount.innerText = favoriteCountries.length;
}
// Calling the function to get all countries from the API.
getCountries();

// ...................Searching By Country Name.........................

// Get all elements with class 'countryName' (will be used for searching).
let countryNames = document.getElementsByClassName('countryName');

// Add event listener to the search input.
search.addEventListener('input', e => {

  // Loop through each country name element
  Array.from(countryNames).forEach(country => {

    // Check if the country name includes the search value.
    if (country.innerText.toLowerCase().includes(search.value.toLowerCase())) {

      country.parentElement.parentElement.style.display = "grid";
    } else {
      country.parentElement.parentElement.style.display = "none";
    }
  });
});

// .....................Filtering By Regions.........................

// Get all elements with class 'regionName' (will be used for filtering).
const regionNames = document.getElementsByClassName('regionName');
// Loop through each region select element
regions.forEach(region => {
  // Add event listener to the region select element
  region.addEventListener('click', e => {
    // Loop through each region name element
    Array.from(regionNames).forEach(element => {
      // Check if the region name includes the selected region or the selected region is 'All'
      if (element.innerText.includes(region.value) || region.value === 'All') {
        // Display the country element by changing its display to 'grid'
        element.parentElement.parentElement.style.display = 'grid';
      } else {
        // Hide the country element by display to 'none'
        element.parentElement.parentElement.style.display = 'none';
      }
    });
  });
});

