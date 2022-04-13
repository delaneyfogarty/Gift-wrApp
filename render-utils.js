export function renderGiftItem(item) {
    const giftItemEl = document.createElement('div');
    const itemText = document.createElement('p');

    if (item.is_complete) {
        giftItemEl.classList.add('is-complete');
    } else {
        giftItemEl.classList.add('not-complete');
    }

    giftItemEl.classList.add('gift');

    itemText.textContent = `${item.gift}`;

    giftItemEl.append(itemText);

    return giftItemEl;
}