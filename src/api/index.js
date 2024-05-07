import axios from 'axios'

const baseApi = axios.create({
  baseURL: import.meta.env.VITE_API_URL || process.env.VITE_API_URL + '/api'
})

const api = {
  async getPlayers() {
    try {
      const resp = await baseApi.get('/players', {
        headers: { 'Content-Type': 'application/json' }
      })

      return { success: true, data: resp.data }
    } catch (error) {
      return { success: false, data: error }
    }
  },
  async createPlayer(name) {
    try {
      const resp = await baseApi.post('/new-player', {
        name: name
      })

      return { success: true, data: resp.data }
    } catch (error) {
      return { success: false, data: error }
    }
  },
  async updatePlayer(player) {
    try {
      const resp = await baseApi.put('/update-player', {
        name: player.name,
        wonamount: player.wonamount,
        lostamount: player.lostamount,
        wongames: player.wongames,
        lostgames: player.lostgames,
        totalgames: player.totalgames
      })

      return { success: true, player: resp.data }
    } catch (error) {
      return { success: false, data: error }
    }
  },
  async getGame(gameId) {
    try {
      const resp = await baseApi.get(`/game?gameId=${gameId}`)

      return { success: true, game: resp.data }
    } catch (error) {
      return { success: false, data: error }
    }
  },

  async createNewGame(params) {
    try {
      const resp = await baseApi.post('/create-game', {
        params
      })

      return { success: true, game: resp.data.game }
    } catch (error) {
      return { success: false, data: error }
    }
  },
  async addPlayersToCurrentGame(gameId, names) {
    try {
      const resp = await baseApi.put('/add-player-to-game', {
        gameId: gameId,
        names: names
      })

      return { success: true, player: resp.data }
    } catch (error) {
      return { success: false, data: error }
    }
  }
}

export default api
