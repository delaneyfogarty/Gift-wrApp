import {
    createGiftIdea,
    birthdayPerson,
    getGift,
    deleteProfile,
    deleteGiftList,
    updateGift,
    logout,
    checkAuth,
} from '../fetch-utils.js';
import { renderGiftItem } from '../render-utils.js';

const form = document.querySelector('form');
const birthdayPersonProfile = document.querySelector('.top');
const giftListContainer = document.querySelector('.gift-list');
const deleteProfileButton = document.querySelector('.delete-profile');
const logoutButton = document.querySelector('.logout-button');
const params = new URLSearchParams(window.location.search);
const id = params.get('id'); // THIS ID IS FROM THE URL AKA THE BIRTHDAY PERSONS ID

checkAuth();

window.addEventListener('load', async () => {
    await fetchAndDisplayProfileInfo();
    await fetchAndDisplayGiftList();

});

logoutButton.addEventListener('click', () => {
    logout();
});


form.addEventListener('submit', async (e) => {
    e.preventDefault();

    const data = new FormData(form);
    const gift = data.get('gift-input');

    await createGiftIdea({
        gift: gift,
        birthday_profile: id,
        user_id: gift.user_id
    });
    fetchAndDisplayGiftList();
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
    const fullBirthdayDiv = document.createElement('p');

    profilePersonName.textContent = 'Name: ' + person.name;
    zodiacSign.textContent = 'Zodiac: ' + person.zodiac_sign.zodiac;
    monthEl.textContent = person.month;
    dayEl.textContent = person.day;
    fullBirthdayDiv.textContent = 'Birthdate: ' + person.month + '/' + person.day + '/' + person.year;
    yearEl.textContent = 'Year: ' + person.year;

    profileDiv.append(profilePersonName, fullBirthdayDiv, zodiacSign);
    birthdayPersonProfile.append(profileDiv);

    profileDiv.classList.add('detail-profile-div');

    return birthdayPersonProfile;
}

async function fetchAndDisplayGiftList() {
    giftListContainer.textContent = '';


    const giftList = await getGift(id);


    for (let item of giftList) {
        const giftItemDiv = renderGiftItem(item);


        if (item.is_complete === false) {
            giftItemDiv.addEventListener('click', async () => {
                await updateGift(item.id);
                fetchAndDisplayGiftList();
            });
        }
        giftListContainer.append(giftItemDiv);
    }
}

deleteProfileButton.addEventListener('click', async () => {
    await deleteGiftList(id);
    await deleteProfile(id);
    window.location.href = '../home/';

});
