<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-title>My Profile</ion-title>
      </ion-toolbar>
    </ion-header>

    <ion-content>
      <ion-card>
        <img v-if="account" alt="Silhouette of mountains" src="https://ionicframework.com/docs/img/demos/card-media.png"
          class="img" />
        <ion-card-header>
          <ion-card-subtitle>Account Information</ion-card-subtitle>
          <ion-card-title v-if="account">{{ account.name }}</ion-card-title>
          <ion-card-title v-else>
            <p>Unable to acquire account data.</p>
          </ion-card-title>
        </ion-card-header>
        <ion-card-content>
          <div class="account-info">
            <div v-if="account">
              <p>Gender: {{ account.gender }}</p>
              <p>Age: {{ account.age }}</p>
              <p>Email: {{ account.email }}</p>
              <p>Location: {{ account.location }}</p>
            </div>
          </div>
        </ion-card-content>
      </ion-card>
    </ion-content>
  </ion-page>
</template>

<script>
import {
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonPage,
  IonCard,
  IonCardContent,
  IonCardHeader,
  IonCardSubtitle,
  IonCardTitle
} from '@ionic/vue';
import { ref, onMounted } from 'vue';
import { getAccountData } from '../services/getRequests.js'; // Replace with your account service

export default {
  components: {
    IonHeader, IonToolbar, IonTitle, IonContent, IonPage,
    IonCard, IonCardContent, IonCardHeader, IonCardSubtitle, IonCardTitle
  },
  setup() {
    const account = ref(null);

    // Fetch account data on component mount
    onMounted(async () => {
      try {
        // Simulate fetching account data from the backend
        const data = await getAccountData(); // Replace with your backend URL

        // Assign the fetched data to the account ref
        account.value = data;
      } catch (error) {
        console.error('Error fetching account data:', error);
      }
    });

    return { account };
  },
};
</script>

<style scoped>
.img {
  width: 100%;
  height: 200px;
  object-fit: scale-down;
}

/* Your existing styles */
</style>
