import { createStore } from 'vuex';

const store = createStore({
  state: {
    user: null, // Initialize user state to null
    locale: 'en'
  },
  mutations: {
    setUserData(state, userData) {
      state.user = userData; // Set the user data in the state
      console.log("Newly stated user:", state.user);
    },
    setLocale(state, locale) {
      state.locale = locale;
    }
  },
});

export default store;
