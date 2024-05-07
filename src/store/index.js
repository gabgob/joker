import { defineStore } from 'pinia'

export const usePlayersStore = defineStore('players', {
  state: () => {
    return { availablePlayers: [], selectedPlayers: [] }
  },
  actions: {
    setAvailablePlayers(val) {
      this.availablePlayers = val
    },
    setSelectedPlayers(val) {
      this.selectedPlayers = val
    }
  },
  getters: {
    getAvailablePlayers(state) {
      return state.availablePlayers
    },
    getSelectedPlayers(state) {
      return state.selectedPlayers
    }
  }
})
