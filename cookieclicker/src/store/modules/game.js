const state = {
  cookies: 0, // Nombre de cookies
  cookiesPerSecond: 0, // Production automatique par seconde
  upgradesPurchased: 0, // Nombre d'améliorations achetées
  upgrades: [
    {
      name: 'Potato farm ',
      description: 'with potato farm increase vodka production of 1 (stackable) cost ',
      price: 50, // Prix initial de l'amélioration
      multiplier: 1.1, // Le prix de l'amélioration augmente de 10% après chaque achat
      productionIncrease: 1, // Production automatique augmentée par achat
      purchasedCount: 0, // Compteur d'achats de cette amélioration
    },
  ],
};

const mutations = {
  incrementCookies(state) {
    state.cookies++;
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
      state.cookiesPerSecond += upgrade.productionIncrease; // Augmenter la production automatique
      upgrade.productionIncrease += 1 //augmente l'amélioration de 1 a chaque achat
      console.log(upgrade.productionIncrease)

      // Augmenter le prix de l'amélioration de 10% pour le prochain achat
      upgrade.price = Math.floor(upgrade.price * upgrade.multiplier);
      console.log(`Amélioration achetée : ${upgrade.name}, production augmentée de ${upgrade.productionIncrease}`);
      console.log(`Nouveau prix de l'amélioration : ${upgrade.price}`);
    } else {
      console.log('Pas assez de cookies pour acheter', upgrade.name);
    }
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
        commit('incrementCookies'); // Générer des cookies chaque seconde
        console.log(`Cookies par seconde : ${state.cookiesPerSecond}, cookies : ${state.cookies}`);
      }
    }, 1000);
  },
};

const getters = {
  cookies: (state) => state.cookies,
  cookiesPerSecond: (state) => state.cookiesPerSecond,
  upgrades: (state) => state.upgrades,
};

export default {
  state,
  mutations,
  actions,
  getters,
};
