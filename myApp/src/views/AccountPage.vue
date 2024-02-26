<style scoped>
.img {
  width: 100%;
  height: 200px;
  object-fit: scale-down;
}
</style>

<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-title>My Profile</ion-title>
      </ion-toolbar>
    </ion-header>

    <ion-content>
      <ion-card>
        <img src="../assets/default.png" class="img" />
        <ion-card-header>
<!--           <ion-card-subtitle>Account Information</ion-card-subtitle> -->
          <ion-card-title v-if="loading">
            <p>Unable to acquire account data.</p>
          </ion-card-title>
          <ion-card-title v-else>Greetings, {{ fname }}</ion-card-title>
        </ion-card-header>
        <ion-card-content>
          <div class="account-info">
            <ion-card-title v-if="loading">
            <p>Unable to acquire e-mail.</p>
          </ion-card-title>
            <div v-else>
              <p>Email: {{ email }}</p>
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
  IonCardTitle,
  IonTabBar
} from '@ionic/vue';
import { ref, onMounted } from 'vue';
import store from '../store.js';
import { getUserData } from '../services/getRequests.js'; // Replace with your account service

export default {
  components: {
    IonHeader, IonToolbar, IonTitle, IonContent, IonPage,
    IonCard, IonCardContent, IonCardHeader, IonCardSubtitle, IonCardTitle, IonTabBar
  },
  setup() {
    let fname = ref();
    let email = ref();
    let lname = ref();
    let loading = ref(true);


    // Fetch account data on component mount
    onMounted(async () => {
      try {
        const userEmail = store.state.user.email;
        console.log("accountPageUser:", userEmail);
        const userID = store.state.user.ID;
        console.log("accountPageUser:", userID);

        let data = await getUserData(userEmail);

        fname.value = data.user.fname;
        lname.value = data.user.lname;
        email.value = data.user.email;

        loading.value = false;
      } catch (error) {
        console.error('Error fetching account data:', error);
      }
    });

    return { fname, lname, email, loading };
  }
};	
</script>