import { createStore } from 'vuex';

const store = createStore({
  state () {
    return {
      user: JSON.parse(localStorage.getItem('user')) || {}, // Initialize user state to an empty object
      locale: 'en'
    };
  },
  mutations: {
    setUserData(state, userData) {
      state.user = {}; // Initialize user as an empty object
      state.user.ID = userData.ID; // Set the user ID in the state
      state.user.email = userData.email; // Set the user data in the state
      console.log("Newly stated user:", state.user, state);
      localStorage.setItem('user', JSON.stringify(userData)); // Save the user data in local storage
    },
    setLocale(state, locale) {
      state.locale = locale;
    },
    clearUserData(state) {
      state.user = {}; // Clear the user data in the state
      localStorage.removeItem('user'); // Remove the user data from local storage
    }
  },
});

export default store;
