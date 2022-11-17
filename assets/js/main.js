const pokemonList = document.getElementById("pokemonList");
const loadMoreButton = document.getElementById("loadMoreButton");
const loadCards = 10;
let startAtCard = 0;

function pokemonTypeToHtmlLi(pokemonTypes)
{
    return pokemonTypes.map((type) => { return `<li class="type ${type}">${type}</li>`})
}

function pokemonToHtmlLi(pokemon)
{
    return `
        <a href="#" class="pokemonLink">
            <li class="pokemon ${pokemon.type}">
                <span class="number">#${pokemon.number}</span> 
                <span class="name">${pokemon.name}</span>

                <div class="details">
                    <ol class="types">
                        ${pokemonTypeToHtmlLi(pokemon.types).join('')}
                    </ol>

                    <img src="${pokemon.sprite}" alt="${pokemon.name}">
                </div>
            </li>
        </a>
    `
}

const registLimit=151;
loadMoreButton.addEventListener('click', () => {
    startAtCard += loadCards;

    if(startAtCard+loadCards <= registLimit)
    {
        loadPokemonCards(startAtCard, loadCards);
    }
    else
    {
        loadPokemonCards(startAtCard, registLimit-startAtCard);
        loadMoreButton.remove();
    }
})

function loadPokemonCards(offset, limit)
{
    pokeApi.getPokemons(offset, limit).then((pokemons = []) => {
        pokemonList.innerHTML += pokemons.map(pokemonToHtmlLi).join('');
    })
}

(function main()
{
    loadPokemonCards(startAtCard, loadCards);
})();