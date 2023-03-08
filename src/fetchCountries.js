import Notiflix from 'notiflix';

export function fetchCountries(name) {
    return fetch(`https://restcountries.com/v3.1/name/${name}?fields=name.official,capital,population,flags.svg,languages`)
        .then((response) => {
            if (!response.ok) {
                throw new Error (Notiflix.Notify.failure('Oops, there is no country with that name'))
            }
            response.json()
        } );
};