<style scoped>
/* Add your custom styles here */
</style>

<template>
    <ion-page>
        <ion-header>
            <ion-toolbar>
                <ion-buttons class="backbutton" slot="start" fill="clear" @click="router.back()">
                    <ion-back-button></ion-back-button>
                </ion-buttons>
                <ion-title>{{ $t('titleList') }}</ion-title>
            </ion-toolbar>
        </ion-header>

        <ion-content>
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
import { 
    IonContent, 
    IonCard, 
    IonCardHeader, 
    IonCardTitle, 
    IonCardSubtitle, 
    IonCardContent, 
    IonButton,
    IonButtons, 
    IonBackButton 
} from '@ionic/vue';
import { ref, onMounted } from 'vue';
import { useRouter, useRoute } from 'vue-router';
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
        IonBackButton
    },

    setup() {
    const router = useRouter();
    const route = useRoute();
    const searchQuery = route.query.searchQuery;
    const routeArray = ref([]);

    onMounted(() => {
        console.log('searchQuery:', searchQuery);

        getRouteArray(searchQuery)
            .then((response) => {
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
            })
            .catch((error) => {
                console.error(error);
            });
    });

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

    const changeLocale = (locale) => {
      store.commit('setLocale', locale);
    };

    return { searchQuery, routeArray, bookButton, router, IonBackButton, changeLocale };
},
};
</script>