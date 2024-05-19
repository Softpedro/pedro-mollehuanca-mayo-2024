import { defineStore } from 'pinia'
import { PokemonDetail } from '../interfaces'

export const useTeamStore = defineStore('team', {
  state: () => ({
    team: [] as PokemonDetail[]
  }),
  actions: {
    addPokemon(pokemon: PokemonDetail) {
      if (this.team.length < 6 && !this.team.find((p) => p.name === pokemon.name)) {
        this.team.push(pokemon)
      }
    },
    removePokemon(pokemonId: number) {
      this.team = this.team.filter((pokemon) => pokemon.id !== pokemonId)
    },
    setTeam(team: PokemonDetail[]) {
      this.team = team
    }
  }
})
