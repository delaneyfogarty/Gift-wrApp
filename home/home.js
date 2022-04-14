import { getMonths, logout, checkAuth } from '../fetch-utils.js';

const birthMonthDiv = document.querySelector('.birthday-month-divs');
const addABirthdayButton = document.querySelector('.create-person-button');
const logoutButton = document.querySelector('.logout-button');

checkAuth();

window.addEventListener('load', async () => {

    const months = await getMonths();
  //const zodiacSigns = await zodiacSign();

    for (let eachMonth of months) {
        const monthEl = document.createElement('div');
        const birthdayEl = document.createElement('div');
        monthEl.textContent = eachMonth.month;
        monthEl.append(birthdayEl);
        monthEl.classList.add('month');
        birthMonthDiv.append(monthEl);

        for (let birthdayPerson of eachMonth.birthday_person) {
            const birthdayDiv = document.createElement('div');
            const birthdayLink = document.createElement('a');
            const birthdayDate = document.createElement('p');
            const birthdaySign = document.createElement('p');

            birthdayDate.textContent = birthdayPerson.month + '/' + birthdayPerson.day;
            birthdayLink.textContent = birthdayPerson.name;
            birthdayLink.href = `../detail/?id=${birthdayPerson.id}`;
            birthdayDiv.classList.add('birthday');
            birthdayDiv.append(birthdayLink, birthdayDate, birthdaySign);
            monthEl.append(birthdayDiv);
        }
    }

});

addABirthdayButton.addEventListener('click', () => {
    window.location.href = '../create';
});



logoutButton.addEventListener('click', () => {
    logout();
});