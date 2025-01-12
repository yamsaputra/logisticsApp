<style scoped>
.example-content {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
}
ion-refresher-content {
  margin-top: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
}
ion-spinner {
    --color: #0000009f;
    width: 100px;
  height: 1000px;
  }
</style>

<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-title>{{ $t('myPackages') }}</ion-title>
      </ion-toolbar>
    </ion-header>

    <ion-fab slot="fixed" horizontal="end" :edge="true">
      <ion-fab-button>
        <ion-icon :icon="globe"></ion-icon>
      </ion-fab-button>
      <ion-fab-list side="bottom">
        <ion-fab-button @click="changeLocale('id')">
          ID
        </ion-fab-button>
        <ion-fab-button @click="changeLocale('en')">
          EN
        </ion-fab-button>
        <ion-fab-button @click="changeLocale('de')">
          DE
        </ion-fab-button>
      </ion-fab-list>
    </ion-fab>

    <ion-content class="ion-padding">
      <ion-refresher slot="fixed" @ionRefresh="handleRefresh">
        <ion-refresher-content>
          <ion-spinner name="circular"></ion-spinner>
        </ion-refresher-content>
      </ion-refresher>

    <div v-if="!routesAvailable" class="example-content">
      <ion-card>
        <ion-card-header>
          <ion-card-title>{{ $t('noRoutes') }}</ion-card-title>
        </ion-card-header>
        <ion-card-content>
          <p>{{ $t('noRoutesDesc') }}</p>
        </ion-card-content>
      </ion-card>
    </div>

    <div v-else class="content">
      <ion-card v-for="(route, index) in userRoutesArray" :key="index">
        <ion-card-header>
          <ion-card-title>{{ route.origin }} {{ $t('toPackage') }} {{ route.destination }}</ion-card-title>
          <ion-card-subtitle>{{ $t('datePackage') }} : {{ route.date }} {{ $t('atPackage') }} {{ route.time
          }}</ion-card-subtitle>
        </ion-card-header>

        <ion-card-content>
          <p>€ {{ route.price }} {{ $t('packageKG') }}</p>
          <p>{{ $t('descPackage') }} : {{ route.description }}</p>
          <p></p>
          <p v-if="route.is_sender == 1">{{ $t('packageSender') }} : {{ route.email }}</p>
          <div v-else>
            <p>{{ $t('packageReceiver') }} : {{ route.email }}</p>
          </div>
        </ion-card-content>

        <ion-button v-if="route.is_sender == 1" color="danger" @click="deleteButton(route)">{{
          $t('deletePackage') }}</ion-button>
      </ion-card>
    </div>
  </ion-content>
  </ion-page>

</template>

<script>
// Framework import statements.
import {
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonRefresher,
  IonPage,
  IonTabs,
  IonFab,
  IonFabButton,
  IonIcon,
  IonButton,
  IonCard,
  IonCardHeader,
  IonCardTitle,
  IonCardSubtitle,
  IonCardContent,
  IonRefresherContent,
  IonSpinner,
} from '@ionic/vue';
import { globe } from 'ionicons/icons';
import { onMounted, ref } from 'vue';
import { useRouter } from 'vue-router';
import { useI18n } from 'vue-i18n';

// Import local service and store statements.
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
    IonFab,
    IonFabButton,
    IonIcon,
    IonButton,
    IonCard,
    IonCardHeader,
    IonCardTitle,
    IonCardSubtitle,
    IonCardContent,
    IonRefresher,
    IonRefresherContent,
    IonSpinner,
  },

  setup() {
    const { t, locale } = useI18n();
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
            rideID: userRoute.ride.ride_id,
            email: userRoute.ride.email
          }));

          routesAvailable.value = true;
        } else {
          console.log("No routes available.");
        }
      } catch (error) {
        console.error(error);
      }
    });

    const handleRefresh = (event) => {
      console.log('Refreshing...');
        // Simulate a delay for the animation to play
    // Delay the page refresh to allow the animation to play
    setTimeout(() => {
      event.target.complete(); // Complete the refresh animation
      router.go(0); // Refresh the page
    }, 2000); // Adjust the delay as needed
};

    const deleteButton = async (route) => {
      try {
        const rideID = route.rideID;
        const userID = store.state.user.ID;

        console.log('Deleting ride ID:', rideID);

        const response = await deleteRoute(rideID, userID);

        if (response) {
          const refreshRoutes = await getUserRoutes(userID);
          console.log('Refreshed routes:', refreshRoutes);
          router.go(0);
        }

        console.log('Delete route response:', response);

      } catch (error) {
        console.error('Error deleting route:', error);
      }
    };

    // Change the locale (language) of the page.
    const changeLocale = (newLocale) => {
      locale.value = newLocale;
    };

    return {
      t,
      userRoutesArray,
      deleteButton,
      routesAvailable,
      globe,
      changeLocale,
      handleRefresh,
      router,
    };
  }
};
</script>