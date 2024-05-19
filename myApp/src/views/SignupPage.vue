<style scoped>
/* Add your custom styles here */
.inputLabel {
  font-size: 13px;
  /* Adjust the font size as needed */
}
</style>

<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-buttons class="backbutton" slot="start" fill="clear" @click="router.back()">
          <ion-back-button></ion-back-button>
        </ion-buttons>
        <ion-title v-if="!isSignUpSuccess">{{ $t('greeting') }}</ion-title>
        <ion-title v-else>{{ $t('welcome') }}</ion-title>
      </ion-toolbar>
    </ion-header>
    <ion-fab slot="fixed" horizontal="end" :edge="true">
      <ion-fab-button>
        <ion-icon :icon="globe"></ion-icon>
      </ion-fab-button>
      <ion-fab-list side="bottom">
        <ion-fab-button @click="changeLocale('id')">
          ID
        </ion-fab-button>
        <ion-fab-button @click="changeLocale('en')">
          EN
        </ion-fab-button>
        <ion-fab-button @click="changeLocale('de')">
          DE
        </ion-fab-button>
      </ion-fab-list>
    </ion-fab>

    <ion-content class="ion-padding">
      <form>
        <ion-card>
          <ion-list>
            <ion-item>
              <ion-input :label="$t('firstName')" labelPlacement="floating" v-model="firstName"
                @keydown.enter="signUp"></ion-input> <!-- placeholder="enter text" for adding disappearing text -->
            </ion-item>
            <ion-item>
              <ion-input :label="$t('lastName')" labelPlacement="floating" v-model="lastName"
                @keydown.enter="signUp"></ion-input>
            </ion-item>
            <ion-item>
              <ion-input :label="$t('age')" labelPlacement="floating" v-model="age" @keydown.enter="signUp"></ion-input>
            </ion-item>
            <ion-item>
              <ion-input :label="$t('email')" labelPlacement="floating" v-model="email"
                @keydown.enter="signUp"></ion-input>
            </ion-item>
            <ion-item>
              <ion-input :label="$t('password')" labelPlacement="floating" type="password" v-model="password"
                @keydown.enter="signUp"></ion-input>
            </ion-item>
            <ion-item>
              <ion-input :label="$t('confirmPassword')" labelPlacement="floating" type="password"
                v-model="reenterPassword" @keydown.enter="signUp"></ion-input>
            </ion-item>
          </ion-list>
          <ion-button v-if="!isSignUpSuccess" expand="full" @click="signUp">{{ $t('signUp') }}</ion-button>
          <router-link v-if="isSignUpSuccess" to="/login">
            <ion-button expand="full">{{ $t('login') }}</ion-button>
          </router-link>
        </ion-card>
      </form>
    </ion-content>
  </ion-page>
</template>

<script>
import {
  IonButton
} from '@ionic/vue';
import { globe } from 'ionicons/icons';
import { ref } from 'vue';
import { registerUser } from '../services/postRequests.js';
import store from '../store.js';

export default {
  components: {
    IonButton
  },

  setup() {
    const firstName = ref('');
    const lastName = ref('');
    const age = ref('');
    const email = ref('');
    const password = ref('');
    const reenterPassword = ref('');
    const isSignUpSuccess = ref(false);
    const errorMessage = ref(null);

    const signUp = async () => {
      try {
        const formData = {
          firstName: firstName.value,
          lastName: lastName.value,
          age: age.value,
          email: email.value,
          password: password.value,
          password: reenterPassword.value
        };

        if (firstName.value == null) {
          window.alert("Please enter your first name.");
          return;
        }

        if (lastName.value == null) {
          window.alert("Please enter your last name.");
          return;
        }

        if (age.value == null) {
          window.alert("Please enter your age.");
          return;
        }

        if (age.value < 18) {
          window.alert("You must be at least 18 years old to sign up.");
          return;
        }

        if (email.value == null) {
          window.alert("Please enter your e-mail.");
          return;
        }

        if (password.value == null) {
          window.alert("Please enter a password.");
          return;
        }

        if (password.value.length < 7) {
          window.alert("Password must be at least 8 characters long.");
          return;
        }

        if (password.value !== reenterPassword.value) {
          window.alert("Passwords do not match! Please re-enter.");
          return;
        }

        const response = await registerUser(formData);

        if (response.success) {
          console.log('User signed up:', response);
          isSignUpSuccess.value = true;
          window.alert("User signed up successfully!");
        } else if (response.status === 400) {
          window.alert('Email already exists.');
          console.error('Existing e-mail found in database.', response);
        }

      } catch (error) {
        console.error('Error signing up:', error);
      }
    };

    const changeLocale = (locale) => {
      store.commit('setLocale', locale);
    };

    return {
      firstName,
      lastName,
      age,
      email,
      password,
      reenterPassword,
      isSignUpSuccess,
      errorMessage,
      signUp,
      changeLocale,
      globe
    };
  },
};
</script>