<style scoped>
.example-content {
  display: flex;
    align-items: center;
    justify-content: center;
    height: 100%;
    color:black;
  }

</style>

<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-title>Packages</ion-title>
      </ion-toolbar>
    </ion-header>
    
    <div v-if="!routesAvailable" class="example-content">
      <ion-card>
        <ion-card-header>
          <ion-card-title>No routes available.</ion-card-title>
        </ion-card-header>
        <ion-card-content>
          <p>There are no routes available for your account.</p>
        </ion-card-content>
      </ion-card>
    </div>

    <div v-else>
      <ion-card v-for="(route, index) in userRoutesArray" :key="index">
        <ion-card-header>
          <ion-card-title>{{ route.origin }} to {{ route.destination }}</ion-card-title>
          <ion-card-subtitle>{{ route.date }}</ion-card-subtitle>
        </ion-card-header>

        <ion-card-content>
          <p>€ {{ route.price }} pro KG</p>
          <p> {{ route.description }}</p>
          <p>{{ route.time }}</p>
          <p v-if="route.is_sender == 1">Sender</p>
          <p v-else>Receiver</p>
        </ion-card-content>

        <ion-button v-if="route.is_sender == 1" color="danger" @click="deleteButton(route)">Delete</ion-button>
      </ion-card>
    </div>

  </ion-page>
</template>

<script>
import {
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonPage,
  IonTabs,
IonCardContent
} from '@ionic/vue';
import { onMounted, ref } from 'vue';
import { useRouter } from 'vue-router';
import store from '../store.js';
import { getUserRoutes } from '../services/getRequests.js';
import { deleteRoute } from '../services/deleteRequests.js';

export default {
  components: {
    IonHeader,
    IonToolbar,
    IonTitle,
    IonContent,
    IonPage,
    IonTabs,
    IonCardContent
},

setup() {
    const router = useRouter();
    const userRoutesArray = ref([]);
    const routesAvailable = ref(false);

    onMounted(async () => {
      try {
        const userID = store.state.user.ID;
        const response = await getUserRoutes(userID);

        if (Array.isArray(response.userRoutes) && response.userRoutes.length > 0) {
          userRoutesArray.value = response.userRoutes.map((userRoute) => ({
            is_sender: userRoute.is_sender,
            date: userRoute.ride.date,
            origin: userRoute.ride.origin,
            destination: userRoute.ride.destination,
            price: userRoute.ride.price,
            time: userRoute.ride.time,
            description: userRoute.ride.description,
            rideID: userRoute.ride.ride_id
          }));

          routesAvailable.value = true; // Set to true if routes are available
        } else {
          console.log("No routes available.");
        }
      } catch (error) {
        console.error(error);
      }
    });

    const deleteButton = async (route) => {
      try {
        const rideID = route.rideID;
        const userID = store.state.user.ID;

        console.log('Deleting ride ID:', rideID);

        const response = await deleteRoute(rideID, userID);

        if (response) {
          const refreshRoutes = await getUserRoutes(userID);
          console.log('Refreshed routes:', refreshRoutes);
        }

        console.log('Delete route response:', response);

      } catch (error) {
        console.error('Error deleting route:', error);
      }
    };

    return { userRoutesArray, deleteButton, routesAvailable };
  }
};
</script>