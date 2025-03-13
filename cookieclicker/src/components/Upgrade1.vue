<template>
    <div class="upgrade-panel">
      <h2>Améliorations</h2>
      <div v-for="(upgrade, index) in upgrades" :key="index" class="upgrade-item">
        <div class="upgrade-details">
          <span>{{ upgrade.name }}</span>
          <span>{{ upgrade.description }}</span>
          <span>{{ upgrade.price }} cookies</span>
        </div>
        <button :disabled="cookies < upgrade.price" @click="buyUpgrade(index)">
          Acheter
        </button>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    name: 'UpgradePanel',
    props: {
      cookies: Number, // Nombre de cookies actuel
      upgrades: Array, // Liste des améliorations
    },
    methods: {
      buyUpgrade(index) {
        this.$emit('buy-upgrade', index);
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
  