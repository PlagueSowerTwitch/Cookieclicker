<template>
  <div class="upgrade-panel">
    <h2>Upgrades</h2>
    <div v-for="(upgrade, index) in upgrades" :key="index" class="upgrade-item">
      <div class="upgrade-details">
        <span>{{ upgrade.name }}</span>
        <span>{{ upgrade.description }}</span>
        <span>{{ upgrade.price }} Vodka </span>
        <span>Upgrades Purchased : {{ upgrade.purchasedCount }}</span>
        <span>Increase in Production : {{ upgrade.productionIncrease }}</span>
      </div>
      <button 
        @click="buyUpgrade(index)"
      >
        Acheter
      </button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'UpgradePanel',
  props: {
    cookies: Number,
    upgrades: Array,
  },
  methods: {
    // Méthode pour acheter une amélioration
    buyUpgrade(index) {
      console.log(`Demande d'achat de l'amélioration à l'index : ${index}`);
      this.$emit('buy-upgrade', index); // Émet l'événement pour acheter l'amélioration
    },
  },
};
</script>

<style scoped>
.upgrade-panel {
  position: fixed;
  top: 10%;
  right: 10px;
  background-color: #fff;
  padding: 20px;
  border: 2px solid #ccc;
  border-radius: 10px;
  width: 200px;
}

.upgrade-item {
  margin-bottom: 20px;
}

.upgrade-details {
  font-size: 14px;
  margin-bottom: 5px;
}

button {
  background-color: #ffeb3b;
  border: none;
  padding: 10px;
  cursor: pointer;
  border-radius: 5px;
}

button:disabled {
  background-color: #e0e0e0;
  cursor: not-allowed;
}

button:hover:not(:disabled) {
  background-color: #fbc02d;
}
</style>
