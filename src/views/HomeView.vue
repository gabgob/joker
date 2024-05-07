<script setup>
import { computed, onMounted, ref } from 'vue'
import { usePlayersStore } from '@/store'
import { v4 as uuidv4 } from 'uuid'
import api from '../api/index'
import router from '../router/index'

const playersStore = usePlayersStore()

const selectedPlayers = ref([])
const newPlayerName = ref('')
const dialog = ref(false)

onMounted(async () => {
  await getPlayers()
})

const availablePlayers = computed(() => {
  return playersStore.getAvailablePlayers.slice().sort((a, b) => a.id - b.id)
})

async function getPlayers() {
  const resp = await api.getPlayers()

  if (resp.success) {
    playersStore.setAvailablePlayers(resp.data)
  }
}

function selectPlayer(player) {
  const existsAlready = selectedPlayers.value.some((sp) => sp.name === player.name)

  if (!existsAlready) {
    selectedPlayers.value.push(player)
  } else {
    selectedPlayers.value = selectedPlayers.value.filter((sp) => sp.name !== player.name)
  }

  playersStore.setSelectedPlayers(selectedPlayers)
}

async function createNewPlayer() {
  const resp = await api.createPlayer(newPlayerName.value)

  if (resp.success) {
    dialog.value = false
    newPlayerName.value

    await getPlayers()
  }
}

async function startGame() {
  const gameId = uuidv4()

  const resp = await api.createNewGame({
    gameId: gameId,
    players: selectedPlayers.value.map((player) => player.name)
  })

  if (resp.success) {
    setTimeout(() => {
      router.push({
        name: 'game',
        params: {
          gameId: gameId
        }
      })
    }, 200)
  }
}
</script>

<template>
  <v-container>
    <v-row>
      <v-col>
        <div class="d-flex justify-space-between align-center">
          <h2 class="font-weight-light">Välj spelare</h2>
        </div>
        <v-divider class="my-4"></v-divider>
        <v-chip
          v-for="(player, index) in availablePlayers"
          :key="index"
          :class="{
            'mr-2': true,
            'mt-2': true,
            'selected-player': selectedPlayers.some((sp) => sp.name === player.name)
          }"
          :ripple="false"
          :variant="selectedPlayers.some((sp) => sp.name === player.name) ? 'elevated' : 'outlined'"
          size="large"
          label
          @click="selectPlayer(player)"
        >
          {{ player.name }}
        </v-chip>
        <v-dialog v-model="dialog" max-width="500">
          <template v-slot:activator="{ props: activatorProps }">
            <v-btn v-bind="activatorProps" variant="text" color="blue-lighten-1" class="mt-2">
              <v-icon size="x-large"> mdi-account-plus-outline </v-icon>
            </v-btn>
          </template>

          <template v-slot:default="{ isActive }">
            <v-card title="Ny spelare">
              <v-card-text>
                <v-text-field
                  v-model="newPlayerName"
                  label="Namn"
                  variant="solo-filled"
                ></v-text-field>
              </v-card-text>

              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn text="Avbryt" @click="isActive.value = false"></v-btn>
                <v-btn text="Spara" @click="createNewPlayer"></v-btn>
              </v-card-actions>
            </v-card>
          </template>
        </v-dialog>
        <br />
        <v-btn
          class="mt-10"
          block
          color="red-lighten-1"
          @click="startGame"
          :disabled="selectedPlayers.length < 4"
        >
          Starta spel
        </v-btn>
      </v-col>
    </v-row>
  </v-container>
</template>

<style scoped>
.selected-player {
  background-color: #42a5f5 !important;
  color: #fff;
}
</style>
