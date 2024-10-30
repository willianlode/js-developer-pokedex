

const pokeApi={};

function convertPokeApiDetailsToPokemon(pokeDetail){
    const pokemon=new Pokemon();
    pokemon.name=pokeDetail.name;
    pokemon.number=pokeDetail.id;
    const types=pokeDetail.types.map((typeSlot)=>typeSlot.type.name);
    const [type]=types;
    pokemon.type=type;
    pokemon.types=types;
    pokemon.abilities=pokeDetail.abilities.map((abilitySlot)=>abilitySlot.ability.name);
    pokemon.height=pokeDetail.height/10;
    pokemon.weight=pokeDetail.weight/10;
    pokemon.stats=pokeDetail.stats.map((statSlot)=>[statSlot.stat.name, statSlot.base_stat]);

    if(parseInt(pokeDetail.id)<650){
        pokemon.photo=pokeDetail.sprites.other.dream_world.front_default;
    }else{
        pokemon.photo=pokeDetail.sprites.front_default;
    }
     
    return pokemon
}

pokeApi.getPokemonDetails= (pokemonUrl) =>{
    return fetch(pokemonUrl)
        .then((response)=>response.json())
        .then(convertPokeApiDetailsToPokemon)
}

pokeApi.getPokemons= (offset=0,limit=8)=>{
    
    return fetch(`https://pokeapi.co/api/v2/pokemon?offset=${offset}&limit=${limit}`)
        .then((response)=> response.json())
        .then((jsonBody)=> {
            pokeApi.count=1025;
            return jsonBody.results
        })
        .then((pokemons)=> pokemons.map((pokemon)=>pokeApi.getPokemonDetails(pokemon.url)))
        .then((detailRequests)=> Promise.all(detailRequests))
        .then((pokemonsDetails)=> pokemonsDetails)       
}

