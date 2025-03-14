<template>
  <div class="upgrade-panel">
    <img src="@/assets/image6.jpg" alt="Lénine comrad" class="soviet-icon" />
    <h2>Améliorations</h2>
    <div v-for="(upgrade, index) in upgrades" :key="index" class="upgrade-item">
      <div class="upgrade-details">
        <span class="upgrade-name">{{ upgrade.name }}</span>
        <span class="upgrade-description">{{ upgrade.description }}</span>
        <span class="upgrade-price">{{ upgrade.price }} Vodka</span>
        <span class="upgrade-purchased">Améliorations achetées : {{ upgrade.purchasedCount }}</span>
        <span v-if="upgrade.effect === 'doubleClicks'" class="upgrade-multiplier">
          Multiplicateur actuel : {{ upgrade.clickMultiplier }}x
        </span>
      </div>
      <button @click="buyUpgrade(index)">
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
    buyUpgrade(index) {
      console.log(`Demande d'achat de l'amélioration à l'index : ${index}`);
      this.$emit('buy-upgrade', index);// envoi event pour acheter l'amélioration
    },
  },
};
</script>

<style scoped>
.upgrade-panel {
  position: fixed;
  top: 1%;
  right: 10px;
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

.upgrade-item {
  margin-bottom: 15px;
  padding: 10px;
  background-color: #b71c1c;
  border: 2px solid #ffeb3b;
  border-radius: 5px;
}

.upgrade-details {
  font-size: 14px;
  margin-bottom: 5px;
}

.upgrade-name {
  font-weight: bold;
  color: #ffeb3b;
  display: block;
  margin-bottom: 5px;
  text-transform: uppercase;
  letter-spacing: 2px;
}

.upgrade-description {
  font-style: italic;
  color: #fff;
  display: block;
  margin-bottom: 5px;
}

.upgrade-price {
  color: #ffeb3b;
  font-weight: bold;
  display: block;
  margin-bottom: 5px;
}

.upgrade-purchased {
  color: #4caf50;
  display: block;
  margin-bottom: 5px;
}

button {
  background-color: #ffeb3b;
  border: none;
  padding: 10px;
  cursor: pointer;
  border-radius: 5px;
  color: #d32f2f;
  font-weight: bold;
  text-transform: uppercase;
}

button:disabled {
  background-color: #e0e0e0;
  cursor: not-allowed;
}

button:hover:not(:disabled) {
  background-color: #fbc02d;
  color: #fff;
}
</style>
