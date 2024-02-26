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
  color: black;
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
        <IonSearchbar animated="true" placeholder="Search for a destination" class="centered-searchbar"
          v-model="searchQuery" @keyup.enter="search"></IonSearchbar> <!-- @input=fetchRecommendations -->
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
import { getRouteData } from '../services/getRequests.js';


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

  data() {
    return {
      searchQuery: '',
    };
  },

  methods: {
    async search() {
      try {
        const response = await getRouteData(this.searchQuery);
        console.log(this.searchQuery)

        const searchQuery = encodeURIComponent(this.searchQuery);

        if (response.message === "Route found.") {
          // Proceed with navigation if routes are found
          this.$router.push({
            name: 'listPage',
            query: { searchQuery }
          });
        } else {
          throw new Error('No available routes. Please search another target.');
        }
      } catch (error) {
        console.error(error);
      }
    },
  },
};
</script>
