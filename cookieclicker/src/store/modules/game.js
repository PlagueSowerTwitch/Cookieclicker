const state = {
  cookies: 0, // Nombre actuel de Vodka
  totalCookies: 0, // Total de Vodka depuis le début
  cookiesPerSecond: 0, // Production automatique par seconde
  upgradesPurchased: 0, // Nombre d'améliorations achetées
  autoClickInterval: 1000, // Intervalle de génération automatique
  upgrades: [
    {
      name: 'Potato farm',
      description: 'With potato farm, increase vodka production by 1 (stackable). Cost: ',
      price: 50, // Prix initial de l'amélioration
      multiplier: 1.1, // Le prix de l'amélioration augmente de 10% après chaque achat
      productionIncrease: 1, // Production automatique augmentée par achat
      purchasedCount: 0, // Compteur d'achats de cette amélioration
    },
    {
      name: 'Double Clicks',
      description: 'Each click counts as 2 clicks!',
      price: 100, // Prix initial de l'amélioration
      multiplier: 1.2, // Le prix de l'amélioration augmente de 20% après chaque achat
      productionIncrease: 0, // Pas de production automatique pour cette amélioration
      purchasedCount: 0, // Compteur d'achats de cette amélioration
      effect: 'doubleClicks', // Effet spécial de cette amélioration
      clickMultiplier: 2, // Multiplicateur de clics initial (2 pour le premier achat)
    },
    {
      name: 'Cookie Rain',
      description: 'Gain 100 cookies every 10 seconds!',
      price: 150, // Prix initial de l'amélioration
      multiplier: 1.15, // Le prix de l'amélioration augmente de 15% après chaque achat
      productionIncrease: 0, // Pas de production automatique pour cette amélioration
      purchasedCount: 0, // Compteur d'achats de cette amélioration
      effect: 'cookieRain', // Effet spécial de cette amélioration
      bonusCookies: 100, // Nombre de cookies gagnés toutes les 10 secondes
    },
  ],
  isDoubleClicksActive: false, // Nouvelle propriété pour gérer l'effet
  cookieRainIntervalId: null,
  startTime: Date.now(),
};

const mutations = {
  incrementCookies(state) {
    if (state.isDoubleClicksActive) {
      const doubleClicksUpgrade = state.upgrades.find(upgrade => upgrade.effect === 'doubleClicks');
      if (doubleClicksUpgrade) {
        state.cookies += doubleClicksUpgrade.clickMultiplier;
        state.totalCookies += doubleClicksUpgrade.clickMultiplier;
      }
    } else {
      state.cookies += 1;
      state.totalCookies += 1;
    }
    console.log(`Cookies après incrémentation : ${state.cookies}`);
  },

  setCookiesPerSecond(state, value) {
    state.cookiesPerSecond = value;
    console.log(`Cookies par seconde après mise à jour : ${state.cookiesPerSecond}`);
  },

  buyUpgrade(state, index) {
    const upgrade = state.upgrades[index];
    console.log(`Tentative d'achat de l'amélioration : ${upgrade.name}`);
  
    if (state.cookies >= upgrade.price) {
      state.cookies -= upgrade.price; // Déduire les cookies
      upgrade.purchasedCount++; // Compter l'achat de l'amélioration
  
      // Appliquer l'effet de l'amélioration
      if (upgrade.effect === 'doubleClicks') {
        state.isDoubleClicksActive = true; // Activer l'effet "Double Clicks"
        upgrade.clickMultiplier += 1; // Augmenter le multiplicateur de clics de 1
      } else if (upgrade.effect === 'cookieRain') {
        // Pour l'amélioration "Cookie Rain", augmenter le nombre de cookies gagnés de 25
        upgrade.bonusCookies += 25;
        console.log(`Nouveau bonus de cookies : ${upgrade.bonusCookies}`);
      } else {
        // Pour l'amélioration "Potato farm", augmenter la production et réduire l'intervalle
        state.cookiesPerSecond += upgrade.productionIncrease; // Augmenter la production automatique
        upgrade.productionIncrease += 1; // Augmenter l'amélioration de 1 à chaque achat
  
        // Réduire l'intervalle de génération automatique de 10% à chaque achat
        state.autoClickInterval = Math.max(100, state.autoClickInterval * 0.9); // Ne pas descendre en dessous de 100 ms
        console.log(`Nouvel intervalle de génération automatique : ${state.autoClickInterval} ms`);
      }
  
      // Augmenter le prix de l'amélioration pour le prochain achat
      upgrade.price = Math.floor(upgrade.price * upgrade.multiplier);
      console.log(`Amélioration achetée : ${upgrade.name}, bonus de cookies : ${upgrade.bonusCookies}`);
      console.log(`Nouveau prix de l'amélioration : ${upgrade.price}`);
    } else {
      console.log('Pas assez de cookies pour acheter', upgrade.name);
    }
  },
  setCookieRainIntervalId(state, intervalId) {
    state.cookieRainIntervalId = intervalId;
  },
};

const actions = {
  incrementCookies({ commit }) {
    commit('incrementCookies');
  },

  buyUpgrade({ commit }, index) {
    commit('buyUpgrade', index); // Appeler la mutation pour acheter l'amélioration
  },

  startAutoCookieGeneration({ commit, state }) {
    setInterval(() => {
      if (state.cookiesPerSecond > 0) {
        commit('incrementCookies'); // Générer des cookies à l'intervalle défini
        console.log(`Cookies par seconde : ${state.cookiesPerSecond}, cookies : ${state.cookies}`);
      }
    }, state.autoClickInterval); // Utiliser l'intervalle dynamique
  },

  startCookieRain({ state, commit }) {
    // Si un intervalle est déjà en cours, ne pas en créer un nouveau
    if (state.cookieRainIntervalId !== null) {
      console.log('Un intervalle est déjà en cours.');
      return;
    }

    // Créer un nouvel intervalle
    const intervalId = setInterval(() => {
      // Trouver l'amélioration "Cookie Rain"
      const cookieRainUpgrade = state.upgrades.find(upgrade => upgrade.effect === 'cookieRain');
      if (cookieRainUpgrade && cookieRainUpgrade.purchasedCount > 0) {
        // Ajouter le bonus de cookies
        state.cookies += cookieRainUpgrade.bonusCookies;
        console.log(`Bonus de cookies ajouté : ${cookieRainUpgrade.bonusCookies}`);
      } else {
        console.log('Aucun bonus de cookies à ajouter.');
      }
    }, 10000); // Toutes les 10 secondes

    // Stocker l'identifiant de l'intervalle dans le state
    commit('setCookieRainIntervalId', intervalId);
    console.log('Intervalle de Cookie Rain démarré.');
  },

  stopCookieRain({ state, commit }) {
    // Arrêter l'intervalle si il existe
    if (state.cookieRainIntervalId !== null) {
      clearInterval(state.cookieRainIntervalId);
      commit('setCookieRainIntervalId', null);
      console.log('Intervalle de Cookie Rain arrêté.');
    }
  },
};

const getters = {
  cookies: (state) => state.cookies,
  cookiesPerSecond: (state) => state.cookiesPerSecond,
  upgrades: (state) => state.upgrades,
  isDoubleClicksActive: (state) => state.isDoubleClicksActive, // Nouveau getter
};

export default {
  state,
  mutations,
  actions,
  getters,
};
