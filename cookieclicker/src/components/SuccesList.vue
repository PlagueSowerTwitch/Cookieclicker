<template>
  <div>
    <div v-if="showPopup" class="success-popup">
      <img :src="popupImage" alt="Succès débloqué" class="popup-image" />
      <p>Succès débloqué : {{ popupMessage }}</p>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex';

export default {
  name: 'SuccesList',
  data() {
    return {
      showPopup: false,
      popupImage: '',
      popupMessage: '',
      unlockedAchievements: new Set(),
    };
  },
  computed: {
    ...mapState({
      totalCookies: (state) => state.game.totalCookies,
      totalUpgradesPurchased: (state) => state.game.upgrades.reduce((total, upgrade) => total + upgrade.purchasedCount, 0),
    }),
  },
  watch: {
    // nb total vodka
    totalCookies(newValue) {
      this.checkAchievements(newValue, 'totalCookies');
    },
    // nb total amelioration achete
    totalUpgradesPurchased(newValue) {
      this.checkAchievements(newValue, 'totalUpgradesPurchased');
    },
  },
  methods: {
    // verif succes avec leurs type
    checkAchievements(value, type) {
      if (type === 'totalCookies') {
        if (value >= 1000 && !this.unlockedAchievements.has('1000_cookies')) {
          this.unlockAchievement('1000_cookies', '1000 Vodka collectés !', require('@/assets/image5.jpg'));
        }
        if (value >= 10000 && !this.unlockedAchievements.has('10000_cookies')) {
          this.unlockAchievement('10000_cookies', '10 000 Vodka collectés !', require('@/assets/image3.jpg'));
        }
        if (value > 0 && !this.unlockedAchievements.has('1_cookies')) {
          this.unlockAchievement('1_cookies', '1 Vodka collectés !', require('@/assets/image1.jpg'));
        }
      } else if (type === 'totalUpgradesPurchased') {
        if (value >= 1 && !this.unlockedAchievements.has('1_upgrade')) {
          this.unlockAchievement('1_upgrade', '1 amélioration achetée !', require('@/assets/image2.jpg'));
        }
        if (value >= 10 && !this.unlockedAchievements.has('10_upgrades')) {
          this.unlockAchievement('10_upgrades', '10 améliorations achetées !', require('@/assets/image4.jpg'));
        }
      }
    },
    // Débloquer un succès et set ces informations
    unlockAchievement(id, message, image) {
      this.unlockedAchievements.add(id);
      this.popupMessage = message;
      this.popupImage = image;
      this.showPopup = true;

      setTimeout(() => {
        this.showPopup = false;
      }, 3000); // popup despawn apres 3s
    },
  },
};
</script>

<style scoped>
.success-popup {
  position: fixed;
  bottom: 20px;
  left: 50%;
  transform: translateX(-50%);
  background-color: #d32f2f;
  padding: 15px;
  border: 3px solid #ffeb3b;
  border-radius: 10px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.3);
  text-align: center;
  z-index: 1000;
  font-family: 'Roboto', sans-serif;
  color: #fff;
}

.popup-image {
  width: 50px;
  height: 50px;
  margin-bottom: 10px;
  border-radius: 5px;
}

.success-popup p {
  margin: 0;
  font-size: 16px;
  color: #ffeb3b;
  font-weight: bold;
  text-transform: uppercase;
  letter-spacing: 2px;
}
</style>
