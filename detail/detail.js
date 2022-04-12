import { createGiftIdea } from '../fetch-utils.js';

const form = document.querySelector('form');
// const params = new URLSearchParams(window.location.search);
// const id = params.get('id'); // THIS ID IS FROM THE URL AKA THE BIRTHDAY PERSONS ID


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