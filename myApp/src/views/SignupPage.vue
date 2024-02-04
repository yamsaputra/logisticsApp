<style scoped>
/* Add your custom styles here */
.inputLabel {
  font-size: 13px; /* Adjust the font size as needed */
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
          <ion-button expand="full" @click="submitForm">Sign Up</ion-button>
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
      reenterPassword: ''
    };
  },
  setup() {
    const account = ref(null);
    
    onMounted(async () => {
      try {
        const data = await registerUser();
        account.value = data;
      } catch (error) {
        console.error('Error fetching account data:', error);
      }
    });
  }
};
</script>