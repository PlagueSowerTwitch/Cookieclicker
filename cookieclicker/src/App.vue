<template>
  <div class="homes">
    <!-- Statistiques sur le côté gauche -->
    <StatistiqueList />

    <!-- Succès -->
    <SuccesList />

    <header>
      <h1>Cookie Clicker</h1>
      <p>Bienvenue dans le jeu Cookie Clicker ! Clique sur le bouton pour obtenir des Vodka.</p>
    </header>

    <!-- Bouton pour obtenir des Vodka -->
    <CookieButton @cookie-increment="incrementCookies" />

    <!-- Affichage du nombre de Vodka -->
    <div class="cookie-count">
      <p>Vous avez {{ cookies }} Vodka</p>
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
import StatistiqueList from './components/StatistiqueList.vue';
import SuccesList from './components/SuccesList.vue'; // Importer le nouveau composant
import { mapState, mapActions } from 'vuex';

export default {
  name: 'HomeS',
  components: {
    CookieButton,
    UpgradeList,
    StatistiqueList,
    SuccesList, // Ajouter le nouveau composant
  },
  computed: {
    ...mapState({
      cookies: (state) => state.game.cookies,
      cookiesPerSecond: (state) => state.game.cookiesPerSecond,
      upgradesPurchased: (state) => state.game.upgradesPurchased,
      upgrades: (state) => state.game.upgrades,
    }),
  },
  methods: {
    ...mapActions(['incrementCookies', 'buyUpgrade']),
    handleUpgradeBought(upgradeIndex) {
      console.log(`Réception de l'événement d'achat de l'amélioration avec index : ${upgradeIndex}`);
      this.buyUpgrade(upgradeIndex);
    },
  },
  created() {
    this.$store.dispatch('startAutoCookieGeneration');
    this.$store.dispatch('startCookieRain');
  },
  beforeUnmount() {
    this.$store.dispatch('stopCookieRain');
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
