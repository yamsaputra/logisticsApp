<style scoped>
.example-content {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 10%;
}

.centered-searchbar {
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 20px;
  color: black;
}

.description {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 150%;
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
      <div class="description">
        <ion-card color="light">
          <ion-card-header>
            <ion-card-title>Sending a package?</ion-card-title>
          </ion-card-header>
          <ion-card-content>
            <p>Search available routes based on origin & target location</p>
          </ion-card-content>
        </ion-card>
      </div>
    </ion-content>

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
import { onMounted, ref } from 'vue';
import { useRouter } from 'vue-router';
import { getRouteData } from '../services/getRequests.js';
import store from '../store.js';


export default {
  components: {
    IonHeader,
    IonToolbar,
    IonTitle,
    IonContent,
    IonPage,
    IonSearchbar,
    IonDatetime,
    IonDatetimeButton,
  },

  setup() {
    const searchQuery = ref('');
    const router = useRouter();

    onMounted(async () => {
      try {
        const userEmail = store.state.user.email;
        console.log("homePageUser:", userEmail);
        const userID = store.state.user.ID;
        console.log("homePageUserID:", userID);
      } catch (error) {
        console.log("Error:", error);
      }
    });

    const search = async () => {
      try {
        const encodedSearchQuery = encodeURIComponent(searchQuery.value);

        const response = await getRouteData(encodedSearchQuery);

        if (response.message === "Route found.") {
          // Proceed with navigation if routes are found
          router.push({
            name: 'listPage',
            query: { searchQuery: encodedSearchQuery }
          });
        } else {
          window.alert('No available routes. Please search another target.');
          throw new Error('No available routes. Please search another target.');
        }
      } catch (error) {
        console.error(error);
      }
    };

    return { searchQuery, search };
  },


};
</script>
