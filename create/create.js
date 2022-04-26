import { getMonths, getZodiacSigns, createBirthday, logout, checkAuth } from '../fetch-utils.js';

const form = document.querySelector('form');
const selectEl = document.querySelector('select');
const zodiacDropdown = document.getElementById('zodiac-sign');

const logoutButton = document.querySelector('.logout-button');

checkAuth();

logoutButton.addEventListener('click', () => {
    logout();
});

window.addEventListener('load', async () => {

    // here is how you can do multiple fetches at once
    const [months, zodiacSigns] = await Promise.all([
        getMonths(), 
        getZodiacSigns()
    ]);
    
    // weirdly, this might be a rare case where a traditional i++ loop might be better, since you'd only have to do 12 iterations in a single loop, rather than 24 over two loops like above
    for (let i = 0; i < 12; i++) {
        const optionEl = document.createElement('option');
        const zodiacOption = document.createElement('option');

        const month = months[i];
        optionEl.textContent = month.month;
        optionEl.value = month.id;
        selectEl.append(optionEl);

        const zodiac = zodiacSigns[i];
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
    const getZodiacSignsEl = data.get('zodiac-sign');
    

    await createBirthday(nameEl, monthEl, dayEl, birthYearEl, getZodiacSignsEl);
    

    form.reset();

    window.location.href = '../home';

});