

import{ getCardsInSet, getAllSets } from './dataFunctions.js'

let setCode = '';
let setCards;
let hideInfo = true;
let currentCard;
let allSetNames;
let currentSet;
let sessionSeen = 0;

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
        currentCard = getNextCard();
        incrementCounter();
        clearPreviousValues();
        displayCardArt();
        hideInfo = !hideInfo;
    }
    else {
        displayCardInfo();
        hideInfo = !hideInfo;
    }
}

function displayCardArt() {
    console.log(currentCard);
    if(currentCard['image_uris']) {
        let imageUrl = currentCard['image_uris']['art_crop'];
        let imageId = 'currentCardFront';
        setImageSource(imageId, imageUrl) ;
    }
    else if (currentCard['card_faces']){
        console.log("multiple images");
        let imageUrl = currentCard['card_faces'][0]['image_uris']['art_crop'];
        let imageId = 'currentCardFront';
        let imageUrlBack = currentCard['card_faces'][1]['image_uris']['art_crop'];
        let imageIdBack = 'currentCardBack';
        setImageSource(imageId, imageUrl);
        setImageSource(imageIdBack, imageUrlBack);
    }
}

function displayCardInfo() {
    // display prices
    document.getElementById('priceEUR').textContent = currentCard['prices']['eur'];
    document.getElementById('priceFoilEUR').textContent = currentCard['prices']['eur_foil'];
    document.getElementById('priceUSD').textContent = currentCard['prices']['usd'];
    document.getElementById('priceFoilUSD').textContent = currentCard['prices']['usd_foil'];
    document.getElementById('priceEtchedUSD').textContent = currentCard['prices']['usd_Etched'];
    console.log(currentCard['prices']);

    if(currentCard['image_uris']) {
        let imageUrl = currentCard['image_uris']['normal'];
        let imageId = 'currentCardFront';
        setImageSource(imageId, imageUrl) ;
    }
    else if (currentCard['card_faces']){
        console.log("multiple images");
        let imageUrl = currentCard['card_faces'][0]['image_uris']['normal'];
        let imageId = 'currentCardFront';
        let imageUrlBack = currentCard['card_faces'][1]['image_uris']['normal'];
        let imageIdBack = 'currentCardBack';
        setImageSource(imageId, imageUrl);
        setImageSource(imageIdBack, imageUrlBack);
    }
}

function clearPreviousValues() {
    document.getElementById('priceEUR').textContent = '';
    document.getElementById('priceUSD').textContent = '';
    document.getElementById('priceFoilUSD').textContent = '';
    document.getElementById('priceEtchedUSD').textContent = '';
    document.getElementById('priceFoilEUR').textContent = '';

    setImageSource('currentCardBack', '');
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
function incrementCounter() {
    sessionSeen += 1;
    console.log(sessionSeen);
    document.getElementById('counter').textContent = sessionSeen;
}
