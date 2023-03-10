import './css/styles.css';
import { fetchCountries } from "./fetchCountries";
import debounce from 'lodash.debounce';
import Notiflix from 'notiflix';

const DEBOUNCE_DELAY = 300;

const searchCountry= document.querySelector("#search-box");
const countryList = document.querySelector(".country-list");
const countryInfo = document.querySelector(".country-info");
// console.log(countryInfo);

searchCountry.addEventListener("input", debounce(onSearchCountryInput, DEBOUNCE_DELAY));

function onSearchCountryInput(e) {
    // console.log("onSearchCountryInput");

    const input = e.target;
    // console.log(input);
    const countryName = input.value.trim();
    // console.log(countryName);

    if (countryName === "") {
        countryInfo.innerHTML = "";
        countryList.innerHTML = "";
    } else {
        fetchCountries(countryName)
        .then((countries) => {
            // console.log(countries.length)
            if (countries.length > 10) {
                // console.log ("забагато країн")
                countryList.innerHTML = "";
                Notiflix.Notify.info('Too many matches found. Please enter a more specific name.');
            } else if (countries.length === 1) {
                // console.log("опис країни");
                countryList.innerHTML = "";
                renderCountryInfo(countries);
            } else {
                countryInfo.innerHTML = "";
                renderCountryList(countries);
            }
        } )
        // .catch((error) => { console.log(error) })
        .catch(onError)
    }  
}

function renderCountryInfo(countries) {
    const markup = countries
        .map((country) => {
            return ` <img class ="flag" src="${country.flags.svg}" alt="${country.flags.alt}" width="30px">
      <h1 class="country-name-title">${country.name.official}</h1>
      <p class="capital"><b>Capital:</b> ${country.capital}</p>
      <p class="population"><b>Population:</b> ${country.population}</p>
      <p class="languages"><b>Languages:</b> ${Object.values(country.languages).join(", ")}</p>`
        })
        .join("");
    
    countryInfo.innerHTML = markup;
};

function renderCountryList(countries) {
    const markup = countries
        .map((country) => {
            return ` 
            <li class="country-item">
        <img class ="flag" src="${country.flags.svg}" alt="${country.flags.alt}" width="25px" height="20px">
        <p class="country-name">${country.name.official}</p>
            </li>
        `
        })
        .join("");
    
    countryList.innerHTML = markup;
}

function onError(error) {
    console.log(error);
    countryInfo.innerHTML = "";
    countryList.innerHTML = "";
}