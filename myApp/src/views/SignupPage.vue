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
        <ion-title v-if="!isSignUpSuccess">Sign-up for TrustTrip</ion-title>
        <ion-title v-else>Thank you for trusting us!</ion-title>
      </ion-toolbar>
    </ion-header>

    <ion-content class="ion-padding">
      <form>
        <ion-card>
          <ion-list>
            <ion-item>
              <ion-label class="inputLabel" position="floating">First Name</ion-label>
              <ion-input aria-placeholder="Name" type="text" v-model="firstName"></ion-input>
            </ion-item>
            <ion-item>
              <ion-label class="inputLabel" position="floating">Last Name</ion-label>
              <ion-input aria-placeholder="lastName" type="text" v-model="lastName"></ion-input>
            </ion-item>
            <ion-item>
              <ion-label class="inputLabel" position="floating">Age</ion-label>
              <ion-input aria-placeholder="Age" type="number" v-model="age"></ion-input>
            </ion-item>
            <ion-item>
              <ion-label class="inputLabel" position="floating">E-mail</ion-label>
              <ion-input aria-placeholder="Email" type="email" v-model="email"></ion-input>
            </ion-item>
            <ion-item>
              <ion-label class="inputLabel" position="floating">Password</ion-label>
              <ion-input aria-placeholder="Password" type="password" v-model="password"></ion-input>
            </ion-item>
            <ion-item>
              <ion-label class="inputLabel" position="floating">Re-enter Password</ion-label>
              <ion-input aria-placeholder="Password" type="password" v-model="reenterPassword"></ion-input>
            </ion-item>
          </ion-list>
          <ion-button v-if="!isSignUpSuccess" expand="full" @click="signUp">Sign Up</ion-button>
          <router-link v-if="isSignUpSuccess" to="/login">
            <ion-button expand="full">Continue to Login</ion-button>
          </router-link>
        </ion-card>
      </form>
    </ion-content>
  </ion-page>
</template>

<script>
import { IonButton, IonHeader } from '@ionic/vue';
import { ref } from 'vue';
import { registerUser } from '../services/postRequests.js';

export default {
  components: {
    IonButton,
    IonHeader
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
        console.log(formData);

        if (firstName.value == null) {
          window.alert("Please enter your first name.");
          return;
        }

        if (lastName.value == null) {
          window.alert("Please enter your last name.");
          return;
        }

        if(age.value == null) {
          window.alert("Please enter your age.");
          return;
        }

        if(age.value < 18) {
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

    return {
      firstName,
      lastName,
      age,
      email,
      password,
      reenterPassword,
      isSignUpSuccess,
      errorMessage,
      signUp
    };
  },
};
</script>