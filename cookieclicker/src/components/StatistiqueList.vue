<template>
  <div class="statistique-list">
    <h2>Statistiques</h2>
    <div class="statistique-item">
      <p>Total de Vodka depuis le début : <strong>{{ totalCookies }}</strong></p>
    </div>
    <div class="statistique-item">
      <p>Vodka par seconde : <strong>{{ cookiesPerSecond }}</strong></p>
    </div>
    <div class="statistique-item">
      <p>Nombre total d'améliorations achetées : <strong>{{ totalUpgradesPurchased }}</strong></p>
    </div>
    <div class="statistique-item">
      <p>Temps moyen pour 100 Vodka : <strong>{{ averageTime100 }} secondes</strong></p>
    </div>
    <div class="statistique-item">
      <p>Temps moyen pour 1 000 Vodka : <strong>{{ averageTime1000 }} secondes</strong></p>
    </div>
    <div class="statistique-item">
      <p>Temps moyen pour 10 000 Vodka : <strong>{{ averageTime10000 }} secondes</strong></p>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex';

export default {
  name: 'StatistiqueList',
  computed: {
    ...mapState({
      totalCookies: (state) => state.game.totalCookies,
      cookiesPerSecond: (state) => state.game.cookiesPerSecond,
      upgrades: (state) => state.game.upgrades,
      startTime: (state) => state.game.startTime,
    }),
    totalUpgradesPurchased() {
      return this.upgrades.reduce((total, upgrade) => total + upgrade.purchasedCount, 0);
    },
    averageTime100() {
      return this.calculateAverageTime(100);
    },
    averageTime1000() {
      return this.calculateAverageTime(1000);
    },
    averageTime10000() {
      return this.calculateAverageTime(10000);
    },
  },
  methods: {
    calculateAverageTime(targetCookies) {
      if (this.cookiesPerSecond <= 0) return 'N/A';
      const timeInSeconds = targetCookies / this.cookiesPerSecond;
      return timeInSeconds.toFixed(2);
    },
  },
};
</script>

<style scoped>
.statistique-list {
  position: fixed;
  left: 10px;
  top: 50%; /* Positionne le composant au milieu de l'écran */
  transform: translateY(-50%); /* Centre verticalement */
  background-color: #f9f9f9;
  padding: 20px;
  border: 1px solid #ccc;
  border-radius: 10px;
  width: 250px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
}

h2 {
  margin-top: 0;
  font-size: 24px;
  color: #333;
}

.statistique-item {
  margin-bottom: 15px;
}

.statistique-item p {
  margin: 0;
  font-size: 14px;
  color: #555;
}

.statistique-item strong {
  color: #333;
}
</style>