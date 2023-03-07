import './css/styles.css';
import {fetchCountries} from "./fetchCountries"

const DEBOUNCE_DELAY = 300;

const searchCountry= document.querySelector("#search-box");
const countryList = document.querySelector(".country-list");
const countryInfo = document.querySelector(".country-info");
console.log(countryInfo);

searchCountry.addEventListener("input", onSearchCountryInput);

function onSearchCountryInput(e) {
    e.preventDefault();
    console.log("onSearchCountryInput");

    const input = e.currentTarget;
    console.log(input);
    const countryName = input.value.trim();
    console.log(countryName);

    fetchCountries(countryName)
        // .then((response) => response.json())
        // .then((data) => console.log(data))
}
