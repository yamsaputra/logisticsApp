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
        <ion-title>Sign-up for ConsignEase</ion-title>
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
import { ref, onMounted } from 'vue';
import { registerUser } from '../services/postRequests.js';
/* import { ref, onMounted } from 'vue'; */

export default {
  components: {
    IonButton,
    IonHeader
  },
  data() {
    return {
      firstName: '',
      lastName: '',
      age: '',
      email: '',
      password: '',
      reenterPassword: '',
      isSignUpSuccess: false,
    };
  },
  methods: {
    async signUp() {
      try {
        const formData = {
          firstName: this.firstName,
          lastName: this.lastName,
          age: this.age,
          email: this.email,
          password: this.password
        };

        if (this.password !== this.reenterPassword) {
          window.alert("Passwords do not match! Please re-enter.");
          return;
        }

        const response = await registerUser(formData);
        if (response.success) {
          console.log('User signed up:', response);
          this.confirmationMessage = 'User signed up successfully!';
          this.isSignUpSuccess = true;
          window.alert("User signed up successfully!");
        } else {
          console.error('Failed to sign up:', response);
          window.alert("E-Mail already exists!");
          this.errorMessage = 'Failed to sign up. Please try again later.';
        }
      } catch (error) {
        console.error('Error signing up:', error);
        this.errorMessage = 'Failed to sign up. Please try again later.';
      }
    },
  }
};
</script>