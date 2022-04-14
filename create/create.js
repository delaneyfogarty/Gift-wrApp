import { getMonths, zodiacSign, createBirthday, logout, checkAuth } from '../fetch-utils.js';

const form = document.querySelector('form');
const selectEl = document.querySelector('select');
const zodiacDropdown = document.getElementById('zodiac-sign');

const logoutButton = document.querySelector('.logout-button');

checkAuth();

logoutButton.addEventListener('click', () => {
    logout();
});

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

form.addEventListener('submit', async (e) => {
    e.preventDefault();

    const data = new FormData(form);

    const nameEl = data.get('name');
    const monthEl = data.get('chosen-month');
    const dayEl = data.get('day');
    const birthYearEl = data.get('year');
    const zodiacSignEl = data.get('zodiac-sign');
    

    await createBirthday(nameEl, monthEl, dayEl, birthYearEl, zodiacSignEl);
    

    form.reset();

    window.location.href = '../home';

});