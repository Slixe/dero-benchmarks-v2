<template>
<v-app id="app">
  <notifications group="notifications" position="bottom right" animation-type="velocity" :speed="500" />
  <div class="parallax" data-horizontal-threshold="35" data-vertical-threshold="15" ref="background"></div>
  <div id="nav">
    <v-btn class="btn" @click="toggle" text>
        <v-icon>mdi-menu</v-icon>
    </v-btn>
    <h1 class="mobile">DERO Benchmarks</h1>
    <v-btn class="btn mobile" href="https://discord.gg/H95TJDp" target="_blank">Discord</v-btn>
  </div>
  <div id="center">
    <div v-if="menu" id="left-menu">
      <div class="buttons">
        <v-btn class="btn" v-for="item in navigations" :key="item.text" :to="item.to" elevation="1" @click="toggle" text>{{ item.text }}</v-btn>
      </div>
      <span>Slixe - {{ new Date().getFullYear() }}</span>
    </div>
    <div :class="{ 'mobile': menu }" id="content">
      <div class="content">
        <router-view />
      </div>
    </div>
  </div>
</v-app>
</template>

<script>
//import BackgroundParallax from './plugins/parallax/parallax.js'

export default {
  data() {
    return {
      //parallax: {},
      menu: true,
      navigations: [
        {
          text: "Benchmarks",
          to: "/"
        },
        {
          text: "Submit",
          to: "/submit"
        },
        {
          text: "Calculator",
          to: "/calculator"
        },
        {
          text: "Admin Panel",
          to: "/admin/login"
        },
      ]
    }
  },
  mounted() {
    //this.parallax = new BackgroundParallax(this.$refs.background);
    //this.parallax.apply();
  },
  updated() {
    //this.parallax.resize();
  },
  methods: {
    toggle() {
      this.menu = !this.menu;
    }
  }
}
</script>

<style>
@import url('https://fonts.googleapis.com/css2?family=Questrial&family=Roboto&display=swap');

#app {
  font-family: 'Questrial', sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: white;
  background-image: url('/background-dero.jpeg');
  background-size: cover;
}

* { 
  box-sizing: border-box;
}

html, body {
  padding: 0;
  margin: 0;
}

html {
  overflow-y: auto !important;
}

#center {
  display: flex;
  flex: 1;
}

#content {
  width: 100%;
  position: relative;
}

.content {
  padding: 2%;
}

.parallax {
  position: absolute;
  min-width: 100%;
  min-height: 100%;
}

.parallax canvas {
  display: block;
}

#left-menu {
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  width: 250px;
  padding: 6px;
  border-right: 2px solid #20222552;
  background-color: #1d1e2059;
}

.btn {
  margin-bottom: 5px;
  border-radius: 4px;
  background-color: #2938c98f !important;
  border-color: #0a0a338f !important;
  color: white !important;
}

#left-menu .btn {
  width: 100%;
}

#nav {
  position: relative;
  height: 64px;
  width: 100vw;
  padding-left: 1%;
  padding-right: 1%;
  justify-content: space-between;
  display: flex;
  align-items: center;
  background-color: #1d1e2173;
}

.nav {
  display: flex;
  justify-content: space-between;
}

.top {
  display: flex;
  margin-bottom: 32px;
}

.top .btn {
  margin-right: 16px;
  width: auto !important;
}

@media (max-width: 600px) {
  .left-nav button {
    margin: auto;
  }

  .mobile {
    display: none;
  }

  #left-menu {
    width: 100vw;
  }
}

.theme--dark.v-card {
  background-color: #15141ba6 !important;
}

.theme--dark.v-data-table {
  background-color: #0d0c181c !important;
}

.theme--dark.v-data-table > .v-data-table__wrapper > table > tbody > tr:hover:not(.v-data-table__expanded__content):not(.v-data-table__empty-wrapper) {
  background-color: #2e3baf44 !important;
}



.v-list-item--link:before {
  background-color: #2938c98f !important;
}

.theme--light.v-sheet {
  background-color: #1e1e1ed6 !important;
}
</style>
