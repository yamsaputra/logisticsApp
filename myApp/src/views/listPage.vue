<style scoped>
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
  .backbutton {
    margin-left: 10px;
  }
</style>

<template>
    <ion-page>
        <ion-header>
            <ion-toolbar>
                <ion-buttons class="backbutton" slot="start" fill="clear" @click="router.push('/home')">
                    <ion-back-button></ion-back-button>
                </ion-buttons>
                <ion-title>{{ $t('titleList') }}</ion-title>
            </ion-toolbar>
        </ion-header>

        <ion-content>
            <ion-refresher slot="fixed" @ionRefresh="handleRefresh">
        <ion-refresher-content>
          <ion-spinner name="circular"></ion-spinner>
        </ion-refresher-content>
      </ion-refresher>

            <ion-card v-for="(route, index) in routeArray" :key="index">
                <ion-card-header>
                    <ion-card-title>{{ route.origin }} {{ $t('toList') }} {{ route.destination }}</ion-card-title>
                    <ion-card-subtitle>{{ $t('departList') }} : {{ route.date }} {{ $t('atList') }} {{ route.time }}</ion-card-subtitle>
                </ion-card-header>

                <ion-card-content>
                    <!-- Here you can add additional information about the item if needed -->
                    <p>{{ $t('kgPricePerList') }}: €{{ route.price }}</p>
                    <p>{{ $t('descList') }}: {{ route.description }}</p>
                    <p>{{ $t('senderList') }}: {{ route.email }}</p>
                </ion-card-content>

                <ion-button fill="clear" @click="bookButton(route)">{{ $t('bookList') }}</ion-button>
            </ion-card>
        </ion-content>
    </ion-page>
</template>

<script>
// Framework import statements.
import { 
    IonContent, 
    IonCard, 
    IonCardHeader, 
    IonCardTitle, 
    IonCardSubtitle, 
    IonCardContent, 
    IonButton,
    IonButtons, 
    IonBackButton, 
    IonSpinner,
    IonRefresher,
    IonRefresherContent,
} from '@ionic/vue';
import { ref, onMounted } from 'vue';
import { useRouter, useRoute } from 'vue-router';
import { useI18n } from 'vue-i18n'; 

// Local service and store import statements.
import { getRouteArray } from '../services/getRequests.js'; // Replace with your API service
import { bookRoute } from '../services/postRequests.js'; // Replace with your API service
import store from '../store.js';

export default {
    components: {
        IonContent,
        IonCard,
        IonCardHeader,
        IonCardTitle,
        IonCardSubtitle,
        IonCardContent,
        IonButton,
        IonButtons,
        IonBackButton,
        IonSpinner,
        IonRefresher,
        IonRefresherContent,
    },

    setup() {
      const { locale } = useI18n();
    const router = useRouter();
    const route = useRoute();
    const searchQuery = route.query.searchQuery;
    const routeArray = ref([]);

    const fetchRoutes = async () => {
      try {
        console.log('searchQuery:', searchQuery);

        const response = await getRouteArray(searchQuery);
        console.log("listPageResponse:", response);

        if (Array.isArray(response.routes)) {
          routeArray.value = response.routes.map((route) => ({
            date: route.date,
            origin: route.origin,
            destination: route.destination,
            price: route.price,
            description: route.description,
            time: route.time,
            ride_id: route.ride_id,
            email: route.email
          }));

          routeArray.value.forEach((route, index) => {
            console.log(`Route ${index + 1}:`);
            console.log(`Date: ${route.date}`);
            console.log(`Origin: ${route.origin}`);
            console.log(`Destination: ${route.destination}`);
            console.log(`Price: ${route.price}`);
            console.log(`Description: ${route.description}`);
            console.log(`Time: ${route.time}`);
            console.log(`Ride ID: ${route.ride_id}`);
            console.log(`Email: ${route.email}`);
            console.log("----------------------------------");
          });

        } else {
          console.log("No routes found.");
        }
      } catch (error) {
        console.error(error);
      }
    };

    onMounted(() => {
      fetchRoutes();
    });

/**
 * 
 * @param route 
 */
    const bookButton = async (route) => {
        try {
            const userID = store.state.user.ID; 
            const rideID = route.ride_id;

            console.log('Booking ride ID:', rideID);
            console.log('Booking user ID:', userID);

            const response = await bookRoute(rideID, userID); 

        } catch (error) {
            console.error('Error booking route:', error);
        }
    };

    /**
     * 
     * @param event 
     */
    const handleRefresh = (event) => {
  console.log('Refreshing...');
  fetchRoutes().then(() => {
    setTimeout(() => {
      event.target.complete(); // Complete the refresh animation
    }, 2000); // Adjust the delay as needed
  });
};

   // Change the locale (language) of the page.
   const changeLocale = (newLocale) => {
      locale.value = newLocale;
    };

    return { searchQuery, routeArray, bookButton, router, IonBackButton, changeLocale, handleRefresh };
},
};
</script>