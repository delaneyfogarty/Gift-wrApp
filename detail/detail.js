import {
    createGiftIdea,
    getBirthdayPerson,
    getGift,
    deleteProfile,
    deleteGiftList,
    updateGift,
    logout,
    checkAuth,
} from '../fetch-utils.js';
import { renderGiftItem } from '../render-utils.js';

const form = document.querySelector('form');
const getBirthdayPersonProfileEl = document.querySelector('.top');
const giftListContainer = document.querySelector('.gift-list');
const deleteProfileButton = document.querySelector('.delete-profile');
const logoutButton = document.querySelector('.logout-button');
const params = new URLSearchParams(window.location.search);
const id = params.get('id'); // THIS ID IS FROM THE URL AKA THE BIRTHDAY PERSONS ID

checkAuth();

window.addEventListener('load', async () => {
    await Promise.all([fetchAndDisplayProfileInfo(), fetchAndDisplayGiftList()]);

});

logoutButton.addEventListener('click', () => {
    logout();
});


form.addEventListener('submit', async (e) => {
    e.preventDefault();

    const data = new FormData(form);
    const gift = data.get('gift-input');

    await createGiftIdea({
        gift, // if the key and the name of the variable are the same, you can do the shorthand like this
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

  // here is how you can "destrcructure" the properties of the person so you don't have to write `person` over and over
    const {
        name,
        zodiac_sign,
        month,
        year,
        day,
    } = await getBirthdayPerson(id);
    const profileDiv = document.createElement('div');
    const profilePersonName = document.createElement('p');
    const zodiacSign = document.createElement('p');
    const monthEl = document.createElement('p');
    const dayEl = document.createElement('p');
    const yearEl = document.createElement('p');
    const fullBirthdayDiv = document.createElement('p');

    profilePersonName.textContent = `Name: ${name}`;
    zodiacSign.textContent = `Zodiac: ${zodiac_sign.zodiac}`;
    monthEl.textContent = month;
    dayEl.textContent = day;
    fullBirthdayDiv.textContent = `Birthdate: ${month}/${day}/${year}`;
    yearEl.textContent = `Year: ${year}`;

    profileDiv.append(profilePersonName, fullBirthdayDiv, zodiacSign);
    getBirthdayPersonProfileEl.append(profileDiv);

    profileDiv.classList.add('detail-profile-div');

    return getBirthdayPersonProfileEl;
}

async function fetchAndDisplayGiftList() {
    giftListContainer.textContent = '';


    const giftList = await getGift(id);


    for (let item of giftList) {
        const giftItemDiv = renderGiftItem(item);


        if (!item.is_complete) {
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
