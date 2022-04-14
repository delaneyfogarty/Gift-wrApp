import { getMonths, logout, checkAuth, birthdayPerson } from '../fetch-utils.js';

const birthMonthDiv = document.querySelector('.birthday-month-divs');
const addABirthdayButton = document.querySelector('.add-birthday-button');
const logoutButton = document.querySelector('.logout-button');
const currenDateEl= document.querySelector('.current-date');

checkAuth();




window.addEventListener('load', async () => {
    //const 

    const months = await getMonths();
  //const zodiacSigns = await zodiacSign();

    for (let eachMonth of months) {
        const monthEl = document.createElement('div');
        const birthdayEl = document.createElement('div');
        monthEl.textContent = eachMonth.month;
        monthEl.append(birthdayEl);
        monthEl.classList.add('month');
        birthMonthDiv.append(monthEl);

        for (let birthday of eachMonth.birthday_person) {
            const balloon = await birthdayPerson(birthday.id);
            const birthdayDiv = document.createElement('div');
            const birthdayLink = document.createElement('a');
            const birthdayDate = document.createElement('p');
            const birthdayYear = document.createElement('p');
            const birthdaySign = document.createElement('p');
        
            birthdayDate.textContent = birthday.month + '/' + birthday.day;
            birthdayLink.textContent = birthday.name;
            birthdayYear.textContent = birthday.year;
            birthdaySign.textContent = balloon.zodiac_sign.zodiac;
            birthdayLink.href = `../detail/?id=${birthday.id}`;
            birthdayDiv.classList.add('birthday');
            birthdayDiv.append(birthdayLink, birthdayDate, birthdayYear, birthdaySign);
            monthEl.append(birthdayDiv);

            //birthday.day

        }
    }

});

addABirthdayButton.addEventListener('click', () => {
    window.location.href = '../create';
});



logoutButton.addEventListener('click', () => {
    logout();
});