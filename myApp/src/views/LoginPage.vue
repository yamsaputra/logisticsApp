<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-title>Login to MitFlyer</ion-title>
      </ion-toolbar>
    </ion-header>

    <ion-content class="ion-padding">
      <ion-grid>
        <ion-row>
          <ion-col size="12" class="ion-text-center">
            <ion-img src="../assets/logo.png" alt="Logo"></ion-img>
          </ion-col>
        </ion-row>

        <ion-row>
          <ion-col size="12">
            <ion-item>
              <ion-label position="floating">E-mail</ion-label>
              <ion-input type="email" v-model="email"></ion-input>
            </ion-item>
          </ion-col>
        </ion-row>

        <ion-row>
          <ion-col size="12">
            <ion-item>
              <ion-label position="floating">Password</ion-label>
              <ion-input type="password" v-model="password"></ion-input>
            </ion-item>
          </ion-col>
        </ion-row>

        <ion-row>
          <ion-col size="12" class="ion-text-center">
            <ion-button expand="block" @click="login">Login</ion-button>
            <p>New to MitFlyer?</p>
            <router-link to="/signup">
                <ion-button expand="block">Sign-up!</ion-button>
            </router-link>
          </ion-col>
        </ion-row>
      </ion-grid>
    </ion-content>
  </ion-page>
</template>

<script>
import { IonButton } from '@ionic/vue';
export default {
  data() {
    return {
      email: '',
      password: ''
    };
  },
  methods: {
    login() {
      // Add your login logic here
    }
  }
};
</script>

<style scoped>
/* Add your custom styles here */
</style>
