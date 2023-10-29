

import{ getCardsInSet, getAllSets } from './dataFunctions.js'

let setCode = '';
let setCards;
let hideInfo = true;
let currectCard;
let allSetNames;
let currentSet;

window.onload = async function() {
    await initSetOptions();
    await initSet();
    document.getElementById('submitbutton').addEventListener('click', handleTextSubmit);
    document.getElementById('next').addEventListener('click', handleClick);
};

async function initSet() {
    setCards = await getCardsInSet(setCode);
    for (let set of allSetNames) {
        if (set.code === setCode) {
            currentSet = set.name;
        }
    }
    console.log(currentSet)
    document.getElementById('currentSet').textContent = currentSet

}
async function initSetOptions() {
    allSetNames = await getAllSets();
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

function handleTextSubmit() {
    setCode = document.getElementById('myTextBox').value;
    initSet();
}
