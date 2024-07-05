const axios = require('axios')
const lodash = require('lodash')

const typeUrl = `https://pokeapi.co/api/v2/type`

function getTypes () {
  return axios.get(typeUrl)
  .then(res => {
    return res.data.results
  })
}

function sortTypesAlphabetically(data) {
  return lodash.sortBy(data, (e) => e.name)
}

function pickYourPokemon(url) {
  return axios.get(url)
  .then(res => {
    return res.data.pokemon
  }).then(pokemon => {
    return lodash.sortBy(pokemon, e => {
      const splitPokemonUrl = e.pokemon.url.split('/')
      const id = splitPokemonUrl[splitPokemonUrl.length - 2]
      return parseInt(id)
    })
  })
}

getTypes()
.then(types => {
  const sortedTypes = sortTypesAlphabetically(types)
  const sortedTypesCopy = [...sortedTypes]
  const thirdUrl = sortedTypes[2].url
  for (let i = 0; i < 2; i++) {
    sortedTypesCopy.pop()
  }
  const thirdToLast = sortedTypesCopy[sortedTypesCopy.length - 1].url
  return pickYourPokemon(thirdUrl)
  .then(sorted => {
    console.log(sorted[sorted.length - 1].pokemon.url)
  })
})
