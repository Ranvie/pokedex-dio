const contentHeader = document.getElementById("contentHeader");
const contentBody = document.getElementById("contentBody");

function pokemonHeaderHtml(pokemon)
{
    document.title = capitalize(`Pokemon details - ${pokemon.name}`);

    return `
        <section class="pokemon ${pokemon.type}">
            <section class="goBack">
                <a href="../../index.html"><img src="../img/arrow.png" alt="Go back"></a>
            </section>
            <section class="collum2">
                <span class="name">${pokemon.name}</span>
                <span class="number">#${pokemon.number}</span>
            </section>
            <ol class="types">
                ${pokemonTypeToHtmlLi(pokemon.types).join('')}
            </ol>
            <img src="${pokemon.sprite}" alt="${pokemon.name}">
        </section>
    `
}

function capitalize(string)
{
    const substrings = string.split(' ');

    for(let i in substrings)
    {
        substrings[i] = substrings[i].charAt(0).toUpperCase() + substrings[i].slice(1);
    }

    return substrings.join(' ');
}

function pokemonStatsToLi(pokemon)
{
    let html = [];
    let total=0;

    html = pokemon.stats.map((stat) => {
        total+= stat.value;
        return `<li class="itemTitle">${stat.name}</li><li class="itemValue">${stat.value}</li>`
    })

    html.push(`<li class="itemTitle">Total</li><li class="itemValue">${total}</li>`);
    return html;
}

function pokemonTypeToHtmlLi(pokemonTypes)
{
    return pokemonTypes.map((type) => { return `<li class="type ${type}">${type}</li>`})
}

function pokemonBodyHtml(pokemon)
{
    return `
        <h1>About</h1>
        <ol class="detailList">
            <li class="itemTitle">Height</li>
            <li class="itemValue">${pokemon.height*10} cm</li>
            <li class="itemTitle">Weight</li>
            <li class="itemValue">${pokemon.weight*100/1000} kg</li>
            <li class="itemTitle">Abilities</li>
            <li class="itemValue">${pokemon.attacks.map((ability) => { return ability }).join(', ')}</li>
        </ol>
        <h1>Base Stats</h1>
        <ol class="detailList">
            ${pokemonStatsToLi(pokemon).join('')}
        </ol>
    `
}

(function main()
{
    pokeApi.getPokemon(sessionStorage.getItem('loadPokemon')).then((pokemonDetails) => {
        contentHeader.innerHTML += pokemonHeaderHtml(pokemonDetails);
        contentBody.innerHTML += pokemonBodyHtml(pokemonDetails);
    })
})();