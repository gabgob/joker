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

export const useGameStore = defineStore('game', {
  state: () => {
    return {
      game: {
        id: null,
        players: []
      }
    }
  },
  actions: {
    setGame(val) {
      this.game.id = val.id
      this.game.players = val.players
    }
  },
  getters: {
    getGameDetails(state) {
      return state.game
    }
  }
})
