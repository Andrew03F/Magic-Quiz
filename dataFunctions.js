
async function getCardsInSet(setCode) {
  try {
    let page = 1;
    let allCards = [];

    while (true) {
      const response = await fetch(`https://api.scryfall.com/cards/search?q=set:${setCode}&page=${page}`);
      
      if (!response.ok) {
        throw new Error(`Error: ${response.status}`);
      }

      const data = await response.json();

      if (data.object === 'error') {
        throw new Error(`Error from Scryfall API: ${data.details}`);
      }

      const cards = data.data;

      allCards = allCards.concat(cards);

      if (cards.length === 0 || !data.has_more) {
        break; // No more cards or no more pages, exit the loop
      }
      
      page++;
    }

    return allCards;
  } catch (error) {
    console.error(error);
    return null;
  }
}

  async function getAllSets() {
    try {
      const response = await fetch("https://api.scryfall.com/sets");
  
      if (!response.ok) {
        throw new Error(`Error: ${response.status}`);
      }
  
      const data = await response.json();
      const sets = data.data;

      const formattedSets = sets.map(set => ({
        code: set.code,
        name: set.name,
        card_count: set.card_count,
        set_type: set.set_type,
        released_at: set.released_at,
      }));
  
      return formattedSets;
    } catch (error) {
      console.error(error);
      return null;
    }
  }

export{ getCardsInSet, getAllSets }