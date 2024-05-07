<template>
  <v-app>
    <v-main>
      <div>
        <v-app-bar color="red-lighten-1" prominent class="text-center" app elevation="7">
          <v-app-bar-nav-icon
            variant="text"
            @click.stop="drawer = !drawer"
            v-show="!isLargeScreen"
          ></v-app-bar-nav-icon>

          <v-toolbar-title :class="appBarClass">
            <div class="d-flex">
              <v-btn
                class="app-title text-uppercase"
                size="large"
                to="/"
                variant="text"
                text="Joker"
                :ripple="false"
                :active="false"
              />
              <Vue3Lottie
                :animationData="playingCardsAnimation"
                :height="45"
                :width="100"
                :scale="1.1"
                :speed="0.8"
                no-margin
                direction="alternate"
              />
            </div>
          </v-toolbar-title>
        </v-app-bar>
      </div>
      <v-navigation-drawer
        v-model="drawer"
        permanent
        width="300"
        elevation="10"
        :class="navigationClass"
        :scrim="false"
      >
        <v-list>
          <v-list-item height="60" link base-color="red-lighten-1">
            <v-btn
              block
              size="large"
              variant="outlined"
              text="Starta nytt spel"
              color="red-lighten-1"
              to="/"
              @click="drawer = false"
            />
          </v-list-item>
          <v-list-item height="60" link base-color="red-lighten-1">
            <v-btn
              block
              size="large"
              variant="outlined"
              text="Statistik"
              color="red-lighten-1"
              to="statistik"
              @click="drawer = false"
            />
          </v-list-item>
        </v-list>
      </v-navigation-drawer>
      <div :class="mainContentClass">
        <router-view></router-view>
      </div>
    </v-main>
  </v-app>
</template>

<script>
import { mapActions } from 'vuex'
import { Vue3Lottie } from 'vue3-lottie'
import playingCardsJSON from './assets/playing_cards.json'

export default {
  name: 'App',
  components: {
    Vue3Lottie
  },
  data: () => ({
    drawer: false,
    currentRoute: null,
    playingCardsAnimation: playingCardsJSON
  }),
  created() {
    this.currentRoute = this.$route.name

    if (this.isLargeScreen) {
      this.drawer = true
    } else {
      this.drawer = false
    }

    console.log('aa')
  },
  computed: {
    mainContentClass() {
      return {
        'main-content': true,
        'main-content--collapsed': !this.drawer,
        'pa-3': true
      }
    },
    navigationClass() {
      return {
        'text-center': true,
        'full-width': this.isMobile
      }
    },
    appBarClass() {
      return {
        'text-left': true
      }
    },
    isLargeScreen() {
      return this.$vuetify.display.mdAndUp
    },
    isMobile() {
      return this.$vuetify.display.smAndDown
    }
  },
  methods: {
    ...mapActions(['setGameState']),
    isActive(routeName) {
      return this.currentRoute === routeName
    },
    endGame() {
      this.setGameState(false)

      if (this.isMobile) {
        this.drawer = false
      }
    }
  },
  watch: {
    isLargeScreen(val) {
      if (val === true) {
        this.drawer = true
      } else {
        this.drawer = false
      }
    },
    $route(to) {
      this.currentRoute = to.name
    }
  }
}
</script>

<style lang="scss">
.v-navigation-drawer {
  background-color: #252422 !important;
  color: #fff !important;
}

.app-title {
  letter-spacing: 5px !important;
  font-size: 24px !important;
}

.v-toolbar-title__placeholder {
  font-family: pacifico;
}

.main-content {
  width: calc(100% - 300px);
  position: absolute;
  left: 300px;
  transition: all 0.3s ease;
  height: calc(100% - 64px);
}

.main-content--collapsed {
  width: 100%;
  left: 0;
}

.full-width {
  width: 100% !important;
}
</style>
