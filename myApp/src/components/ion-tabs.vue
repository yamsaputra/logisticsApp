<template>
    <ion-page>
        <ion-tabs>
            <ion-router-outlet></ion-router-outlet>

            <ion-tab-bar slot="bottom">

                <router-link to="/home">
                <ion-tab-button tab="home" >
                    <ion-icon :icon="search" />
                    <ion-label>Search</ion-label>
                </ion-tab-button>
            </router-link>

            <router-link to="/package">
                <ion-tab-button tab="package" >
                    <ion-icon :icon="cubeOutline" />
                    <ion-label>My Packages</ion-label>
                </ion-tab-button>
            </router-link>

                <ion-tab-button tab="trust" >
                    <ion-icon :icon="paperPlaneOutline" />
                    <ion-label>Be a Trustee</ion-label>
                </ion-tab-button>

                <ion-tab-button tab="message" >
                    <ion-icon :icon="chatbubblesOutline" />
                    <ion-label>Messages</ion-label>
                </ion-tab-button>

                <ion-tab-button tab="account" >
                    <ion-icon :icon="personOutline" />
                    <ion-label>Account</ion-label>
                </ion-tab-button>

            </ion-tab-bar>
        </ion-tabs>
    </ion-page>
</template>
  
<script>
import { IonPage, IonTabs, IonRouterOutlet, IonTabBar, IonTabButton, IonLabel, IonIcon } from '@ionic/vue';

import { paperPlaneOutline, radio, personOutline, search, chatbubblesOutline, cubeOutline } from 'ionicons/icons';

export default {
    components: { IonPage, IonTabs, IonRouterOutlet, IonTabBar, IonTabButton, IonLabel, IonIcon },
    data() {
        return {
            paperPlaneOutline,
            radio,
            personOutline,
            search,
            chatbubblesOutline,
            cubeOutline
        };
    },
};
</script>