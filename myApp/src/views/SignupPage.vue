<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-title>Sign Up</ion-title>
      </ion-toolbar>
    </ion-header>

    <ion-content>
      <ion-card>
      <ion-list>
        <ion-item>
          <ion-label position="floating">Name</ion-label>
          <ion-input aria-label="Name" type="text" v-model="name"></ion-input>
        </ion-item>
        <ion-item>
          <ion-label position="floating">Email</ion-label>
          <ion-input aria-label="Email" type="email" v-model="email"></ion-input>
        </ion-item>
        <ion-item>
          <ion-label position="floating">Password</ion-label>
          <ion-input aria-label="Password" type="password" v-model="password"></ion-input>
        </ion-item>
      </ion-list>
      <ion-button expand="full" @click="signUp">Sign Up</ion-button>
      </ion-card>
    </ion-content>
  </ion-page>
</template>

<script>
import { IonButton, IonHeader } from '@ionic/vue';
import { ref, onMounted } from 'vue';

export default {
  components: {
    IonButton,
    IonHeader
  },
  data() {
    return {
      name: '',
      email: '',
      password: ''
    };
  },
  methods: {
    signUp() {
      // Add your sign up logic here
    }
  }
};
</script>

<style scoped>
/* Add your custom styles here */
</style>
