import './css/styles.css';

const DEBOUNCE_DELAY = 300;

import { createCountriesMarkup, createFlagMarkup } from './js/markup';
import API  from './fetchCountries';
import debounce from 'lodash.debounce';
import Notiflix from 'notiflix';



const inputSearch = document.querySelector('#search-box');
const countryInfo = document.querySelector('.country-info');
const countryList = document.querySelector('.country-list');

inputSearch.addEventListener(
    'input',
    debounce(handleInputSearch, DEBOUNCE_DELAY)
);

function handleInputSearch(event) {
    event.preventDefault();
    const searchQuery = inputSearch.value.trim();
    if (searchQuery === '') {
        countryInfo.innerHTML = '';
        countryList.innerHTML = '';
        return;
    }

    API.fetchCountries(searchQuery)
        .then(renderCountryCard)
        .catch(onFetchError);
}

function renderCountryCard(countries) {
    countryList.innerHTML = '';
    countryInfo.innerHTML = '';
    if (countries.length === 1) {
        countryList.insertAdjacentHTML('beforeend', createFlagMarkup(countries));
    countryInfo.insertAdjacentHTML(
        'beforeend',
        createCountriesMarkup(countries)
        );
    } else if (countries.length >= 10) {
    onManyMatches();
    } else {
    countryList.insertAdjacentHTML('beforeend', createFlagMarkup(countries));
    }
}

function onFetchError() {
  Notiflix.Notify.warning(`Oops, there is no country with that name`);
}