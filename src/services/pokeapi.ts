import axios from 'axios'

const API_URL = 'https://pokeapi.co/api/v2/'

export const getPokemonList = async (limit: number, offset: number) => {
  const response = await axios.get(`${API_URL}pokemon?limit=${limit}&offset=${offset}`)
  return response.data
}

export const getPokemonDetails = async (id: number | string) => {
  const response = await axios.get(`${API_URL}pokemon/${id}`)
  return response.data
}

export const getPokemonSpecies = async (id: number | string) => {
  const response = await axios.get(`${API_URL}pokemon-species/${id}`)
  return response.data
}

export const getEvolutionChain = async (url: string) => {
  const response = await axios.get(url)
  return response.data
}
