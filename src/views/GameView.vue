<script setup>
import { computed, onMounted, ref, watch } from 'vue'
import { useRoute } from 'vue-router'
import { usePlayersStore } from '@/store'
import api from '../api/index'

const playersStore = usePlayersStore()

const route = useRoute()
const gameDetails = ref({})
const players = ref([])
const gameEnded = ref(false)
const gameResult = ref([])
const showResult = ref(false)
const balances = ref({})
const addPlayersModal = ref(false)
const selectedPlayers = ref([])

onMounted(async () => {
  await getGameDetails()
})

function round(player, amount) {
  if (amount === 0) {
    player.consecutiveWins++

    players.value.forEach((pl) => {
      if (pl.name !== player.name) {
        if (pl.consecutiveWins > 0) {
          pl.consecutiveWins = 0
        }
      }
    })

    players.value.forEach((play) => {
      if (play.name !== player.name) {
        play.disableWinOption = true
      }
    })
  } else {
    player.consecutiveWins = 0
    player.lostAmountCurrentGame += amount
  }

  if (amount === 0) {
    player.previousAction = 'won'
  } else if (amount === 10) {
    player.previousAction = 10
  } else if (amount === 20) {
    player.previousAction = 20
  }

  player.registered = true
}

function revert(player) {
  player.registered = false

  if (player.previousAction !== 'won') {
    player.lostAmountCurrentGame -= player.previousAction
  } else {
    player.consecutiveWins--

    players.value.forEach((play) => {
      if (play.name !== player.name) {
        play.disableWinOption = false
      }
    })
  }
}

function finishGame() {
  balances.value = {}

  let winnerSum = 0

  gameResult.value.forEach((game) => {
    const winner = game.winner

    game.from.forEach((player) => {
      const loser = player.name
      const amountLost = player.amount

      if (!balances.value[winner]) {
        balances.value[winner] = {}
      }

      if (!balances.value[winner][loser]) {
        balances.value[winner][loser] = 0
      }

      if (!balances.value[loser]) {
        balances.value[loser] = {}
      }

      if (!balances.value[loser][winner]) {
        balances.value[loser][winner] = 0
      }

      balances.value[winner][loser] += amountLost
      balances.value[loser][winner] -= amountLost
    })

    for (const lostPlayerAmount in balances.value[winner]) {
      if (Object.hasOwnProperty.call(balances.value[winner], lostPlayerAmount)) {
        winnerSum += balances.value[winner][lostPlayerAmount]
      }
    }
  })

  const playerStats = {}

  for (const playerName in balances.value) {
    if (Object.hasOwnProperty.call(balances.value, playerName)) {
      const playerData = balances.value[playerName]
      let totalWon = 0
      let totalLoss = 0

      for (const opponentName in playerData) {
        if (Object.hasOwnProperty.call(playerData, opponentName)) {
          const amount = playerData[opponentName]
          if (amount > 0) {
            totalWon += amount
          } else {
            totalLoss -= amount
          }
        }
      }

      playerStats[playerName] = {
        totalWon: totalWon,
        totalLoss: totalLoss
      }
    }
  }

  players.value.forEach((player) => {
    for (const playerName in playerStats) {
      if (player.name === playerName) {
        const playerData = playerStats[playerName]

        player.totalWon = playerData.totalWon
        player.totalLoss = playerData.totalLoss
      }
    }
  })

  showResult.value = true

  gameResult.value.forEach((game) => {
    const winner = game.winner

    players.value.forEach((player) => {
      if (player.name === winner) {
        player.wonamount += winnerSum
        player.wongames++
      } else {
        player.lostamount += player.totalLoss
        player.lostgames++
      }

      player.totalgames++
    })
  })

  players.value.forEach(async (player) => {
    await api.updatePlayer(player)
  })
}

async function newGame() {
  await getGameDetails()
}

async function getGameDetails() {
  resetGame()

  const resp = await api.getGame(route.params.gameId)

  if (resp.success) {
    gameDetails.value = resp.game[0]

    gameDetails.value.playerstats.forEach((stat) => {
      let player = {
        ...stat.player,
        lostAmountCurrentGame: 0,
        consecutiveWins: 0,
        registered: false,
        disableWinOption: false,
        wonGame: false,
        previousAction: null
      }

      players.value.push(player)
    })
  }
}

function resetGame() {
  gameDetails.value = {}
  players.value = []
  gameEnded.value = false
}

async function addPlayersToGame() {
  selectedPlayers.value.forEach((player) => {
    players.value.push({
      ...player,
      lostAmountCurrentGame: 0,
      consecutiveWins: 0,
      registered: false,
      disableWinOption: false,
      wonGame: false,
      previousAction: null
    })
  })

  const names = players.value.map((player) => player.name)

  await api.addPlayersToCurrentGame(route.params.gameId, names)

  selectedPlayers.value = []
}

function selectPlayer(player) {
  const existsAlready = selectedPlayers.value.some((sp) => sp.name === player.name)

  if (!existsAlready) {
    selectedPlayers.value.push(player)
  } else {
    selectedPlayers.value = selectedPlayers.value.filter((sp) => sp.name !== player.name)
  }
}

watch(
  players,
  (players) => {
    const allRegistered = players.every((player) => player.registered)

    if (allRegistered) {
      players.forEach((player) => {
        player.registered = false
        player.disableWinOption = false

        if (player.consecutiveWins === 2) {
          player.wonGame = true
          gameEnded.value = true
        }
      })
    }
  },
  { deep: true }
)

watch(gameEnded, async (val) => {
  if (val) {
    let winner = ''
    let totalAmount = 0
    let from = []

    players.value.forEach((player) => {
      if (!player.wonGame) {
        totalAmount += player.lostAmountCurrentGame
        from.push({ name: player.name, amount: player.lostAmountCurrentGame })
      } else {
        winner = player.name
      }
    })

    let game = {
      winner: winner,
      wonAmount: totalAmount,
      from: from
    }

    gameResult.value.push(game)
  }
})

const availablePlayers = computed(() => {
  const allPlayers = playersStore.getAvailablePlayers.slice().sort((a, b) => a.id - b.id)

  const filteredPlayers = allPlayers.filter((player) => {
    return !players.value.some((otherPlayer) => otherPlayer.name === player.name)
  })

  return filteredPlayers
})
</script>

<template>
  <div v-if="players?.length">
    <v-row>
      <v-col v-for="(player, index) in players" :key="index" cols="6">
        <div
          :class="{
            'player-container': true,
            'player-container-won': player.consecutiveWins === 2,
            'player-container-won-prev': player.consecutiveWins === 1
          }"
        >
          <v-row no-gutters>
            <v-col class="pl-4 pt-4">
              <h3>
                {{ player.name }}
                <v-icon
                  size="small"
                  style="float: right; padding-right: 15px"
                  @click="revert(player)"
                  :disabled="!player.registered"
                >
                  mdi-undo
                </v-icon>
              </h3>
            </v-col>
          </v-row>
          <v-row class="ma-0">
            <v-col class="text-center pl-4">
              <span>{{ player.lostAmountCurrentGame }} kr </span>
            </v-col>
          </v-row>
          <div class="button-container d-flex flex-column align-center justify-center">
            <v-btn
              variant="elevated"
              color="info"
              @click="round(player, 10)"
              :disabled="player.registered || gameEnded"
              class="ml-2 mb-2 mt-1"
            >
              10 kr
            </v-btn>
            <v-btn
              variant="elevated"
              color="info"
              @click="round(player, 20)"
              :disabled="player.registered || gameEnded"
              class="ml-2 mb-2 mt-1"
            >
              20 kr
            </v-btn>
            <v-btn
              variant="elevated"
              color="info"
              @click="round(player, 0)"
              :disabled="player.registered || player.disableWinOption || gameEnded"
              class="ml-2 mb-2 mt-1"
            >
              Vinst
            </v-btn>
          </div>
        </div>
      </v-col>
    </v-row>
    <v-row v-if="!showResult">
      <v-col>
        <v-btn v-show="gameEnded" block color="red-lighten-1" size="x-large" @click="finishGame">
          Avsluta
        </v-btn>
      </v-col>
      <v-col>
        <v-btn v-show="gameEnded" block color="blue-lighten-1" size="x-large" @click="newGame">
          Kör igen
        </v-btn>
      </v-col>
    </v-row>
    <v-row v-if="showResult">
      <v-col cols="12">
        <div v-for="(debts, debtor) in balances" :key="debtor" class="pb-4">
          <div v-for="(amount, creditor) in debts" :key="creditor">
            <div v-if="amount < 0" class="d-flex flex-row align-center">
              <span>
                <strong>{{ debtor }}</strong>
                ska ge
                <span>
                  {{ Math.abs(amount) }} kr till <strong>{{ creditor }} </strong>
                </span>
              </span>
            </div>
          </div>
        </div>
      </v-col>
      <v-divider></v-divider>
      <v-col>
        <div v-for="(player, index) in players" :key="index">
          <div v-if="player.wonGame">
            <span class="font-weight-bold">{{ player.name }} </span> har vunnit totalt
            {{ player.totalWon }} kr
          </div>
        </div>
      </v-col>
    </v-row>
    <v-row v-if="showResult">
      <v-col>
        <v-btn v-show="gameEnded" block color="red-lighten-1" size="x-large" to="/">
          Nytt spel
        </v-btn>
      </v-col>
    </v-row>
    <v-row v-else>
      <v-col cols="12">
        <v-btn variant="tonal" color="blue-lighten-1" block @click="addPlayersModal = true">
          <v-icon> mdi-account-plus-outline </v-icon>
        </v-btn>
      </v-col>
      <v-col cols="12">
        <v-btn block color="red-lighten-1" to="/"> Avsluta </v-btn>
      </v-col>
    </v-row>
    <v-dialog v-model="addPlayersModal">
      <v-card>
        <v-card-title> Lägg till spelare </v-card-title>

        <v-card-text class="pt-0">
          <v-chip
            v-for="(player, index) in availablePlayers"
            :key="index"
            :class="{
              'mr-2': true,
              'mt-2': true,
              'selected-player': selectedPlayers.some((sp) => sp.name === player.name)
            }"
            :ripple="false"
            :variant="
              selectedPlayers.some((sp) => sp.name === player.name) ? 'elevated' : 'outlined'
            "
            size="large"
            label
            @click="selectPlayer(player)"
          >
            {{ player.name }}
          </v-chip>
        </v-card-text>

        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="error" variant="tonal" @click="addPlayersModal = false"> Stäng </v-btn>
          <v-btn color="info" variant="tonal" @click="addPlayersToGame"> Lägg till </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<style scoped>
.player-container {
  background-color: #ffffff;
  color: black;
  height: 280px;
  box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;
}

.player-container-won {
  background-color: #61f064;
}

.player-container-won-prev {
  background-color: #fff176;
}

.button-container {
  padding: 10px 0;
}
</style>
