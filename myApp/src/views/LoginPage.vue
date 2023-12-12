<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-title>MitFlyer</ion-title>
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
          <ion-col size="12" class="ion-text-center">
            <form @submit.prevent="submitForm">
              <ion-item>
                <ion-label position="floating">E-mail
                  <ion-input type="email" aria-label="Email" v-model="email"></ion-input>
                </ion-label>
              </ion-item>

              <ion-item>
                <ion-label position="floating">Password</ion-label>
                <ion-input type="password" aria-label="Password" v-model="password"></ion-input>
              </ion-item>
              <router-link to="/home">
              <ion-button href="" expand="block" @click="login">Login</ion-button>
            </router-link>
            </form>
          </ion-col>
        </ion-row>

        <ion-row>
          <ion-col size="12" class="ion-text-center">
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
import {
  IonButton,
  IonTitle,
  IonContent,
  IonHeader,
  IonToolbar,
  IonItem,
  IonLabel,
  IonInput,
  IonGrid,
  IonRow,
  IonCol,
  IonImg
} from '@ionic/vue';

export default {
  components: {
    IonButton,
    IonTitle,
    IonContent,
    IonHeader,
    IonToolbar,
    IonItem,
    IonLabel,
    IonInput,
    IonGrid,
    IonRow,
    IonCol,
    IonImg
  },
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
