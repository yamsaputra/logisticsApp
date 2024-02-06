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
  color:black;
}
</style>

<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-title>TrustTrip</ion-title>
      </ion-toolbar>
    </ion-header>
    <ion-content>
      <div class="example-content">
        <IonSearchbar animated="true" placeholder="Search for a destination" v-model="searchTerm" class="centered-searchbar"></IonSearchbar>
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
