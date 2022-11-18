const pokemonList = document.getElementById("pokemonList");
const loadMoreButton = document.getElementById("loadMoreButton");
const pokemonLinks = document.getElementsByClassName("pokemonLink");
const loadCards = 10;
let startAtCard = 0;

function pokemonTypeToHtmlLi(pokemonTypes)
{
    return pokemonTypes.map((type) => { return `<li class="type ${type}">${type}</li>`})
}

function pokemonToHtmlLi(pokemon)
{
    return `
        <a id="${pokemon.number}" class="pokemonLink" onclick="chosenPokemon(this)">
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

function chosenPokemon(sender)
{
    sessionStorage.setItem('loadPokemon', sender.getAttribute("id"));
    open("assets/pages/pokemonDetails.html");
}

(function main()
{
    loadPokemonCards(startAtCard, loadCards);
})();