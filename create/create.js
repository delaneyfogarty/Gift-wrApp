import { getMonths, zodiacSign, createBirthday } from '../fetch-utils.js';

const form = document.querySelector('form');
const selectEl = document.querySelector('select');
const zodiacDropdown = document.querySelector('#zodiac-sign');



window.addEventListener('load', async () => {

    const months = await getMonths();
    const zodiacSigns = await zodiacSign();

    for (let month of months) {

        const optionEl = document.createElement('option');
        optionEl.textContent = month.month;
        optionEl.value = month.id;
        selectEl.append(optionEl);
    }

    for (let zodiac of zodiacSigns) {
        const zodiacOption = document.createElement('option');
        zodiacOption.textContent = zodiac.zodiac;
        zodiacOption.value = zodiac.id;
        zodiacDropdown.append(zodiacOption);
    }

});