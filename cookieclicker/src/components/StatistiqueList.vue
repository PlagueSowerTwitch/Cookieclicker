<template>
  <div class="statistique-list">
    <img src="@/assets/image1.png" alt="Faucille et marteau" class="soviet-icon" />
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
  top: 50%;
  transform: translateY(-50%);
  background-color: #d32f2f;
  padding: 20px;
  border: 3px solid #ffeb3b;
  border-radius: 10px;
  width: 250px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.5);
  font-family: 'Roboto', sans-serif;
  color: #fff;
}

.soviet-icon {
  width: 50px;
  height: 50px;
  display: block;
  margin: 0 auto 10px auto;
}

h2 {
  margin-top: 0;
  font-size: 24px;
  color: #ffeb3b;
  text-align: center;
  text-transform: uppercase;
  letter-spacing: 2px;
}

.statistique-item {
  margin-bottom: 15px;
  padding: 10px;
  background-color: #b71c1c;
  border: 2px solid #ffeb3b;
  border-radius: 5px;
}

.statistique-item p {
  margin: 0;
  font-size: 14px;
  color: #fff;
}

.statistique-item strong {
  color: #ffeb3b;
}
</style>