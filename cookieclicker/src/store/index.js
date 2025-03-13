import { createStore } from 'vuex';
import game from './modules/game.js';

export default createStore({
  modules: {
    game,
  },
});
