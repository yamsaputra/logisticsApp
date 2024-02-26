<style scoped>
/* Add your custom styles here */
</style>

<template>
    <ion-page>
        <ion-header>
            <ion-toolbar>
                <ion-title>List Page</ion-title>
            </ion-toolbar>
        </ion-header>

        <ion-content>
            <ion-card v-for="(route, index) in routeArray" :key="index">
                <ion-card-header>
                    <ion-card-title>{{ route.origin }} to {{ route.destination }}</ion-card-title>
                    <ion-card-subtitle>{{ route.date }}</ion-card-subtitle>
                </ion-card-header>

                <ion-card-content>
                    <!-- Here you can add additional information about the item if needed -->
                    <p>Price per KG: €{{ route.price }}</p>
                    <p>Description: {{ route.description }}</p>
                    <p>Time: {{ route.time }}</p>
                </ion-card-content>

                <ion-button fill="clear">Book</ion-button>
            </ion-card>
        </ion-content>
    </ion-page>
</template>

<script>
import { ref, onMounted } from 'vue';
import { useRoute } from 'vue-router';
import { getRouteArray } from '../services/getRequests.js'; // Replace with your API service
import { IonContent, IonCard, IonCardHeader, IonCardTitle, IonCardSubtitle, IonCardContent, IonButton } from '@ionic/vue';

export default {
    components: {
        IonContent,
        IonCard,
        IonCardHeader,
        IonCardTitle,
        IonCardSubtitle,
        IonCardContent,
        IonButton,
    },

    setup() {
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
                        }));

                        routeArray.value.forEach((route, index) => {
                            console.log(`Route ${index + 1}:`);
                            console.log(`Date: ${route.date}`);
                            console.log(`Origin: ${route.origin}`);
                            console.log(`Destination: ${route.destination}`);
                            console.log(`Price: ${route.price}`);
                            console.log(`Description: ${route.description}`);
                            console.log(`Time: ${route.time}`);
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

        return { searchQuery, routeArray };
    },
};
</script>