<template>
    <div>
      <!-- Pop-up de succès -->
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
        showPopup: false, // Afficher ou masquer le pop-up
        popupImage: '', // Image du succès débloqué
        popupMessage: '', // Message du succès débloqué
        unlockedAchievements: new Set(), // Succès déjà débloqués
      };
    },
    computed: {
      ...mapState({
        totalCookies: (state) => state.game.totalCookies, // Total de Vodka depuis le début
        totalUpgradesPurchased: (state) => state.game.upgrades.reduce((total, upgrade) => total + upgrade.purchasedCount, 0), // Nombre total d'améliorations achetées
      }),
    },
    watch: {
      // Surveiller le total de Vodka
      totalCookies(newValue) {
        this.checkAchievements(newValue, 'totalCookies');
      },
      // Surveiller le nombre total d'améliorations achetées
      totalUpgradesPurchased(newValue) {
        this.checkAchievements(newValue, 'totalUpgradesPurchased');
      },
    },
    methods: {
      // Vérifier les succès
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
      // Débloquer un succès
      unlockAchievement(id, message, image) {
        this.unlockedAchievements.add(id); // Ajouter le succès à la liste des succès débloqués
        this.popupMessage = message; // Définir le message du pop-up
        this.popupImage = image; // Définir l'image du pop-up
        this.showPopup = true; // Afficher le pop-up
  
        // Masquer le pop-up après 3 secondes
        setTimeout(() => {
          this.showPopup = false;
        }, 3000);
      },
    },
    /*mounted() {
      // Débloquer le succès "Premier clic" dès que le composant est monté
      this.unlockAchievement('first_click', 'Premier clic !', require('@/assets/image1.jpg'));
    },*/
  };
  </script>
  
  <style scoped>
  .success-popup {
    position: fixed;
    bottom: 20px;
    left: 50%;
    transform: translateX(-50%);
    background-color: #fff;
    padding: 15px;
    border: 2px solid #4caf50;
    border-radius: 10px;
    box-shadow: 0 4px 10px rgba(0, 0, 0, 0.2);
    text-align: center;
    z-index: 1000;
  }
  
  .popup-image {
    width: 50px;
    height: 50px;
    margin-bottom: 10px;
  }
  
  .success-popup p {
    margin: 0;
    font-size: 16px;
    color: #333;
  }
  </style>