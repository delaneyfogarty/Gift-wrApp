// you can destruccture here in the parameters to keep from having to repeat `item` over and over
export function renderGiftItem({ gift, is_complete }) {
    const giftItemEl = document.createElement('div');
    const itemText = document.createElement('p');

    // maybe a nice spot for a ternery
    giftItemEl.classList.add(`${is_complete ? 'is' : 'not'}-complete`);

    giftItemEl.classList.add('gift');

    itemText.textContent = gift;

    giftItemEl.append(itemText);

    return giftItemEl;
}