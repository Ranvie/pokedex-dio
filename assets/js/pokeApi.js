const pokeApi = {};

function apiDetailToPokemonModel(pokeDetails)
{
    const pokemon = new Pokemon();
    const types = pokeDetails.types.map((typeSlot) => { return typeSlot.type.name });
    const attacks = pokeDetails.abilities.map((abilitySlot) => { return abilitySlot.ability.name });

    pokemon.name = pokeDetails.name;
    pokemon.number = pokeDetails.id;
    pokemon.types = types;
    pokemon.type = types[0];
    pokemon.sprite = pokeDetails.sprites.other.dream_world.front_default;
    pokemon.weight = pokeDetails.weight;
    pokemon.height = pokeDetails.height;
    pokemon.stats = pokeDetails.stats.map((stat) => { return { "name": stat.stat.name, "value": stat.base_stat } })
    pokemon.attacks = attacks;
    
    return pokemon;
}

pokeApi.getPokemonDetail = (pokemon) => {
    return fetch(pokemon.url)
        .then((response) => { return response.json() })
        .then(apiDetailToPokemonModel)
}

pokeApi.getPokemons = (offset=0, limit=10) => {
    const url = `https://pokeapi.co/api/v2/pokemon?offset=${offset}&limit=${limit}`;

    return fetch(url)
        .then((response) => { return response.json(); })
        .then((jsonBody) => { return jsonBody.results; })
        .then((pokemons) => { return pokemons.map(pokeApi.getPokemonDetail) })
        .then((detailRequests) => { return Promise.all(detailRequests) })
        .then((pokemonsDetails) => { return pokemonsDetails; })
        .catch((error) => { console.error(error);})
}

pokeApi.getPokemon = (id=1) => {
    const url = `https://pokeapi.co/api/v2/pokemon/${id}`;

    return fetch(url)
        .then((response) => { return response.json(); })
        .then(apiDetailToPokemonModel)
        .catch((error) => { console.log(error); })
}