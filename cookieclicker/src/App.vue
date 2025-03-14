<template>
  <div class="homes">
    <!-- Statistiques sur le côté gauche -->
    <StatistiqueList />

    <!-- Succès -->
    <SuccesList />

    <header>
      <h1>Vodka Clicker</h1>
      <p>Добро пожаловать comrad, Добро пожаловать dans le jeux du Vodka Clicker</p>
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
  color: #fff; /* Texte en blanc */
  text-align: center;
  font-family: 'Roboto', sans-serif;
  padding: 30px;
}

header {
  margin-bottom: 30px;
}

h1 {
  font-size: 36px;
  margin-bottom: 15px;
  color: #ffeb3b; /* Jaune vif pour le titre */
  text-transform: uppercase; /* Majuscules pour un effet soviétique */
  letter-spacing: 3px;
}

p {
  color: #fff;
  font-size: 18px;
  font-weight: bold;
  letter-spacing: 1px;
}

.cookie-count {
  margin-top: 30px;
  font-size: 28px;
  color: #ffeb3b; /* Jaune vif pour la quantité de Vodka */
  font-weight: bold;
}

.game-info {
  margin-top: 30px;
  font-size: 20px;
  color: #fff;
}

strong {
  color: #ffeb3b; /* Jaune vif pour les valeurs importantes */
}

button {
  background-color: #ffeb3b; /* Jaune vif */
  border: none;
  padding: 15px;
  cursor: pointer;
  border-radius: 5px;
  color: #d32f2f; /* Rouge foncé pour le texte */
  font-weight: bold;
  text-transform: uppercase;
  font-size: 16px;
  width: 200px;
  margin-top: 20px;
}

button:hover {
  background-color: #fbc02d;
  color: #fff; /* Texte blanc quand le bouton est survolé */
}
</style>
