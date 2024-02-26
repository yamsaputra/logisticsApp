  
<style scoped>
#map {
    height: 400px;
    width: 100%;
}

.ion-padding {
    padding: 10px;
    background-color: #252020;
}
</style>

<template>
    <ion-page>
        <ion-header>
            <ion-toolbar>
                <ion-title>Google Maps Directions</ion-title>
            </ion-toolbar>
        </ion-header>
        <ion-content>
            <div id="floating-panel" class="ion-padding">
                <strong>Start:</strong>
                <ion-select v-model="start" placeholder="Select start location">
                    <ion-select-option value="chicago, il">Chicago</ion-select-option>
                    <ion-select-option value="st louis, mo">St Louis</ion-select-option>
                    <ion-select-option value="joplin, mo">Joplin, MO</ion-select-option>
                    <!-- Add more options as needed -->
                </ion-select>
                <br>
                <strong>End:</strong>
                <ion-select v-model="end" placeholder="Select end location">
                    <ion-select-option value="chicago, il">Chicago</ion-select-option>
                    <ion-select-option value="st louis, mo">St Louis</ion-select-option>
                    <ion-select-option value="joplin, mo">Joplin, MO</ion-select-option>
                    <!-- Add more options as needed -->
                </ion-select>
                <br>
                <strong>Mode of Travel:</strong>
                <ion-select v-model="mode" placeholder="Select mode of travel">
                    <ion-select-option value="DRIVING">Driving</ion-select-option>
                    <ion-select-option value="WALKING">Walking</ion-select-option>
                    <ion-select-option value="BICYCLING">Bicycling</ion-select-option>
                    <ion-select-option value="TRANSIT">Transit</ion-select-option>
                </ion-select>
            </div>
            <div id="map" class="ion-padding"></div>
        </ion-content>
    </ion-page>
</template>
  
<script>
import {
    IonPage,
    IonHeader,
    IonToolbar,
    IonTitle,
    IonContent,
    IonSelect,
    IonSelectOption,
} from '@ionic/vue';
export default {
    components: {
        IonPage,
        IonHeader,
        IonToolbar,
        IonTitle,
        IonContent,
        IonSelect,
        IonSelectOption,
    },
    data() {
        return {
            start: '',
            end: '',
            mode: '',
        };
    },
    mounted() {
        let map;

        async function initMap() {
            const { Map } = await google.maps.importLibrary("maps");

            map = new Map(document.getElementById("map"), {
                center: { lat: -34.397, lng: 150.644 },
                zoom: 8,
            });
        }

        initMap();

    },
};
</script>
  