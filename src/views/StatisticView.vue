<script setup>
import { usePlayersStore } from '@/store'
import { computed, onMounted, ref } from 'vue'
import api from '../api/index'

const playersStore = usePlayersStore()

const selectedPlayers = ref([])
const availablePlayers = ref([])

onMounted(async () => {
  await getPlayers()
})

const sortedAvailablePlayers = computed(() => {
  return availablePlayers.value.slice().sort((a, b) => a.id - b.id)
})

async function getPlayers() {
  const resp = await api.getPlayers()

  if (resp.success) {
    playersStore.setAvailablePlayers(resp.data)
    availablePlayers.value = resp.data
  }
}

function selectPlayer(player) {
  const alreadySelected = selectedPlayers.value.findIndex(
    (selectedPlayer) => selectedPlayer.name === player.name
  )

  if (alreadySelected === -1) {
    selectedPlayers.value.push(player)
  } else {
    selectedPlayers.value.splice(alreadySelected, 1)
  }

  selectedPlayers.value = selectedPlayers.value.sort((a, b) => a.id - b.id)
}
</script>

<template>
  <div>
    <h1>Statistik</h1>
    <v-row>
      <v-col>
        <v-chip
          v-for="(player, index) in sortedAvailablePlayers"
          :key="index"
          :class="{
            'mr-2': true,
            'mt-2': true,
            'selected-player': selectedPlayers.some((sp) => sp.name === player.name)
          }"
          :ripple="false"
          variant="elevated"
          size="large"
          label
          @click="selectPlayer(player)"
        >
          {{ player.name }}
        </v-chip>
      </v-col>
    </v-row>
    <v-row v-if="selectedPlayers?.length">
      <v-col
        v-for="(player, index) in selectedPlayers"
        :key="index"
        :cols="selectedPlayers.length < 2 ? '12' : '6'"
      >
        <v-row>
          <v-col cols="12">
            <h3 class="pb-2">
              {{ player.name }}
            </h3>
            <v-divider></v-divider>
          </v-col>
          <v-col cols="12" class="pt-0">
            <ul style="list-style-type: none">
              <li>Vunnit {{ player.wonamount }} kr</li>
              <li>Förlorat {{ player.lostamount }} kr</li>
              <li>Plus minus noll? {{ player.wonamount - player.lostamount }} kr</li>
            </ul>
          </v-col>
          <v-col cols="12">
            <ul style="list-style-type: none">
              <li>Spelat totalt {{ player.totalgames }} matcher</li>
              <li>Vunnit matcher {{ player.wongames }}</li>
              <li>Förlorat match {{ player.lostgames }}</li>
              <li>Vinstchans {{ ((player.wongames / player.totalgames) * 100).toFixed(1) }}%</li>
            </ul>
          </v-col>
        </v-row>
      </v-col>
    </v-row>
  </div>
</template>

<style scoped>
.selected-player {
  background-color: #42a5f5 !important;
  color: #fff;
}
</style>
