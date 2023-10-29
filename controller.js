

import{ getCardsInSet } from './dataFunctions.js'

const setCode = 'lea';
let setCards;
let hideInfo = true;
let currectCard;

window.onload = async function() {
    await initSet();

    document.getElementById('reInitButton').addEventListener('click', handleClick);
};

async function initSet() {
    setCards = await getCardsInSet(setCode);
    console.log(setCards);
}

function handleClick() {
    if (hideInfo) {
        currectCard = getNextCard();
        displayCardArt();
        hideInfo = !hideInfo;
    }
    else {
        displayFullCard();
        hideInfo = !hideInfo;
    }
}

function displayCardArt() {
    console.log(currectCard);
    let imageUrl = currectCard['image_uris']['art_crop'];
    let imageId = 'currentCard';
    setImageSource(imageId, imageUrl) ;
}

function displayFullCard() {
    let imageUrl = currectCard['image_uris']['normal'];
    let imageId = 'currentCard';
    setImageSource(imageId, imageUrl) ;
}

function getNextCard() {
    return getRandomElementFromArray(setCards);
}

function getRandomElementFromArray(array) {
    if (!Array.isArray(array) || array.length === 0) {
      return null; // Return null for empty arrays or non-array inputs
    }
  
    const randomIndex = Math.floor(Math.random() * array.length);
    return array[randomIndex];
}

function setImageSource(imageId, imageUrl) {
    const imgElement = document.getElementById(imageId);
  
    if (imgElement) {
      imgElement.src = imageUrl;
    } else {
      console.error(`Image element with ID "${imageId}" not found.`);
    }
  }
