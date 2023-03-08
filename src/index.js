import './css/styles.css';
import { fetchCountries } from "./fetchCountries";
import debounce from 'lodash.debounce';
import Notiflix from 'notiflix';

const DEBOUNCE_DELAY = 3000;

const searchCountry= document.querySelector("#search-box");
const countryList = document.querySelector(".country-list");
const countryInfo = document.querySelector(".country-info");
// console.log(countryInfo);

searchCountry.addEventListener("input", debounce(onSearchCountryInput, DEBOUNCE_DELAY));

function onSearchCountryInput(e) {
    // e.preventDefault();
    console.log("onSearchCountryInput");

    const input = e.target;
    console.log(input);
    const countryName = input.value.trim();
    console.log(countryName);

    fetchCountries(countryName)
        .then((data) => {
            if (data.length > 10) {
                // console.log ("забагато країн")
                Notiflix.Notify.info('Too many matches found. Please enter a more specific name.');
            }
            console.log(data)
        } )
        .catch((error) => {console.log(error)})
}
