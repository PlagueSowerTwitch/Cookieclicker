const state = {
  cookies: 0,
  totalCookies: 0,
  cookiesPerSecond: 0,
  upgradesPurchased: 0,
  upgrades: [
    {
      name: 'Potato farm', // propriété redondante
      description: 'With potato farm, increase vodka production by 1 (more potato more vodka) ',
      price: 50,
      multiplier: 1.1,
      productionIncrease: 1,
      purchasedCount: 0,
    },
    {
      name: 'AK 47',
      description: 'Each Bullet count more than the precedent',
      price: 100,
      multiplier: 1.2,
      productionIncrease: 0,
      purchasedCount: 0,
      effect: 'doubleClicks',
      clickMultiplier: 1,
    },
    {
      name: 'Big Red Button',
      description: 'Launch Nuke every 10s on American Pigs',
      price: 150,
      multiplier: 1.15,
      productionIncrease: 0,
      purchasedCount: 0,
      effect: 'cookieRain',
      bonusCookies: 100,
    },
  ],
  isDoubleClicksActive: false, // propriété spécifique
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
      state.cookies -= upgrade.price;
      upgrade.purchasedCount++;

      // double click augmente la valeur du click de 1 a chaque fois
      if (upgrade.effect === 'doubleClicks') {
        state.isDoubleClicksActive = true;
        upgrade.clickMultiplier += 1;
      } else if (upgrade.effect === 'cookieRain') {
        // cookie rain augmente de 25 le bonus
        upgrade.bonusCookies += 25;
        console.log(`Nouveau bonus de cookies : ${upgrade.bonusCookies}`);
      } else {
        // potato farm production +1 par seconde
        state.cookiesPerSecond += upgrade.productionIncrease;
        console.log(`Nouvelle production par seconde : ${state.cookiesPerSecond}`);
      }

      // Prix augmenter (inflation)
      upgrade.price = Math.floor(upgrade.price * upgrade.multiplier);
      console.log(`Amélioration achetée : ${upgrade.name}, production par seconde : ${state.cookiesPerSecond}`);
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
    commit('buyUpgrade', index);
  },

  startAutoCookieGeneration({ state }) {
    setInterval(() => {
      if (state.cookiesPerSecond > 0) {
        state.cookies += state.cookiesPerSecond;
        state.totalCookies += state.cookiesPerSecond;
        console.log(`Cookies par seconde : ${state.cookiesPerSecond}, cookies : ${state.cookies}`);
      }
    }, 1000);
  },

  startCookieRain({ state, commit }) { 
    if (state.cookieRainIntervalId !== null) {
      console.log('Un intervalle est déjà en cours.');
      return;
    }
  
    const intervalId = setInterval(() => {
      const cookieRainUpgrade = state.upgrades.find(upgrade => upgrade.effect === 'cookieRain');
      if (cookieRainUpgrade && cookieRainUpgrade.purchasedCount > 0) {
        state.cookies += cookieRainUpgrade.bonusCookies;
        state.totalCookies += cookieRainUpgrade.bonusCookies;
        console.log(`Bonus de cookies ajouté : ${cookieRainUpgrade.bonusCookies}`);
      } else {
        console.log('Aucun bonus de cookies à ajouter.');
      }
    }, 10000);
  
    commit('setCookieRainIntervalId', intervalId);
    console.log('Intervalle de Cookie Rain démarré.');
  },

  stopCookieRain({ state, commit }) {
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
  isDoubleClicksActive: (state) => state.isDoubleClicksActive,
};

export default {
  state,
  mutations,
  actions,
  getters,
};
