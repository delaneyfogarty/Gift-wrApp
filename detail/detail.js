import { createGiftIdea, birthdayPerson } from '../fetch-utils.js';

const form = document.querySelector('form');
const birthdayPersonProfile = document.querySelector('.top');

const params = new URLSearchParams(window.location.search);
const id = params.get('id'); // THIS ID IS FROM THE URL AKA THE BIRTHDAY PERSONS ID



window.addEventListener('load', async () => {
    await fetchAndDisplayProfileInfo();
});



form.addEventListener('submit', async (e) => {
    e.preventDefault();

    const data = new FormData(form);
    const gift = data.get('gift-input');

    await createGiftIdea({
        gift: gift
    });

    form.reset();

});

// Gift table is correctly linked in fetch-utils;
// Birthday_profile ID and user_id are appearing NULL in the rows; are they linked properly?
// Build out the page more (fetchAndDisplayProfileInfo fxn);



async function fetchAndDisplayProfileInfo() {

//we want to fetch the birthday person's profile info and display it on the page

// for 


    const person = await birthdayPerson(id);  

    const profileDiv = document.createElement('div');
    const profilePersonName = document.createElement('p');
    const zodiacSign = document.createElement('p');
    const monthEl = document.createElement('p');
    const dayEl = document.createElement('p');
    const yearEl = document.createElement('p');

    profilePersonName.textContent = person.name;
    zodiacSign.textContent = person.zodiac_sign;
    monthEl.textContent = person.month;
    dayEl.textContent = person.day;
    yearEl.textContent = person.year;

    profileDiv.append(profilePersonName, monthEl, dayEl, yearEl, zodiacSign);
    birthdayPersonProfile.append(profileDiv);
   
    return birthdayPersonProfile;



}

