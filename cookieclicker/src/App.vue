<template>
  <div class="homes">
    <header>
      <h1>Cookie Clicker</h1>
      <p>Bienvenue dans le jeu Cookie Clicker ! Clique sur le bouton pour obtenir des cookies.</p>
    </header>

    <!-- Bouton pour obtenir des cookies -->
    <CookieButton @cookie-increment="incrementCookies" />

    <!-- Affichage du nombre de cookies -->
    <div class="cookie-count">
      <p>Vous avez {{ cookies }} cookies</p>
    </div>

    <!-- Liste des améliorations -->
    <UpgradeList
      :cookies="cookies"
      :upgrades="upgrades"
      @buy-upgrade="handleUpgradeBought" 
    />
  </div>
</template>

<script>
import CookieButton from './components/CookieButton.vue';
import UpgradeList from './components/UpgradeList.vue';
import { mapState, mapActions } from 'vuex';

export default {
  name: 'HomeS',
  components: {
    CookieButton,
    UpgradeList,
  },
  computed: {
    ...mapState({
      cookies: (state) => state.game.cookies,
      cookiesPerSecond: (state) => state.game.cookiesPerSecond,
      upgradesPurchased: (state) => state.game.upgradesPurchased,
      upgrades: (state) => state.game.upgrades, // Liste des améliorations
    }),
  },
  methods: {
    ...mapActions(['incrementCookies', 'buyUpgrade']),  // Appel des actions Vuex

    // Quand l'événement buy-upgrade est capturé, acheter l'amélioration via Vuex
    handleUpgradeBought(upgradeIndex) {
      console.log(`Réception de l'événement d'achat de l'amélioration avec index : ${upgradeIndex}`);
      this.buyUpgrade(upgradeIndex);  // Appel de l'action buyUpgrade avec l'index de l'amélioration
    },
  },
  created() {
    // Démarre la génération automatique de cookies
    console.log('Démarrage de la génération automatique de cookies');
    this.$store.dispatch('startAutoCookieGeneration');
  },
};
</script>

<style scoped>
.homes {
  text-align: center;
  font-family: Arial, sans-serif;
  padding: 20px;
}

header {
  margin-bottom: 20px;
}

h1 {
  font-size: 32px;
  margin-bottom: 10px;
  color: #333;
}

.game-info {
  margin-top: 30px;
  font-size: 18px;
}

p {
  color: #555;
}

strong {
  color: #333;
}

.cookie-count {
  margin-top: 20px;
  font-size: 24px;
  color: #333;
}
</style>
