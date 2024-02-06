// store.js
import { createStore } from 'vuex';

const store = createStore({
  state: {
    user: null, // Initialize user state to null
  },
  mutations: {
    setUserData(state, userData) {
      state.user = userData; // Set the user data in the state
      console.log("state user:", state.user);
    },
  },
});

export default store;
