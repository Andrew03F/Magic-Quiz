
async function getCardsInSet(setCode) {
    try {
      const response = await fetch(`https://api.scryfall.com/cards/search?q=set:${setCode}`);
      
      if (!response.ok) {
        throw new Error(`Error: ${response.status}`);
      }
  
      const data = await response.json();
      const cards = data.data;
  
      return cards;
    } catch (error) {
      console.error(error);
      return null;
    }
  }

export{ getCardsInSet }