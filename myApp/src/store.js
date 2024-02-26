import { createStore } from 'vuex';

const store = createStore({
  state: {
    user: JSON.parse(localStorage.getItem('user')) || {}, // Initialize user state to null
    locale: 'en'
  },
  mutations: {
    setUserData(state, userData) {
      state.user.ID = userData.ID; // Set the user ID in the state
      state.user.email = userData.email; // Set the user data in the state
      console.log("Newly stated user:", state.user, state);
    },
    setLocale(state, locale) {
      state.locale = locale;
    }
  },
});

export default store;
