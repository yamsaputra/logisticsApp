<style scoped>
.example-content {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
}

.centered-searchbar {
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 20px;
}
</style>

<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-title>MitFlyer</ion-title>
      </ion-toolbar>
    </ion-header>
    <ion-content>
      <div class="example-content">
        <IonSearchbar animated="true" placeholder="Search" class="centered-searchbar"></IonSearchbar>
      </div>
      <div class="example-content">
        <ion-datetime-button><ion-icon name="airplane-outline"></ion-icon></ion-datetime-button>
        <ion-datetime presentation="month-year" display-format="MMM DD, YYYY" placeholder="Select Date"></ion-datetime>
      </div>
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
  IonSearchbar,
  IonDatetime,
  IonDatetimeButton, // Add this line
} from '@ionic/vue';

import { ref, defineComponent } from 'vue';

export default {
  components: {
    IonHeader,
    IonToolbar,
    IonTitle,
    IonContent,
    IonPage,
    IonSearchbar,
    IonDatetime,
    IonDatetimeButton, // Add this line
  },
};
</script>
