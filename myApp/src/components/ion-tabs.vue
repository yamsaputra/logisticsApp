<template>
    <ion-page>
        <ion-tabs>
            <ion-router-outlet></ion-router-outlet>

            <ion-tab-bar slot="bottom">

                <ion-tab-button tab="search" href="/home">
                    <ion-icon :icon="search" />
                    <ion-label>Search</ion-label>
                </ion-tab-button>

                <ion-tab-button tab="search" href="/home">
                    <ion-icon :icon="search" />
                    <ion-label>My Consigns</ion-label>
                </ion-tab-button>

                <ion-tab-button tab="home" href="/fly">
                    <ion-icon :icon="paperPlaneOutline" />
                    <ion-label>Be a Flyer</ion-label>
                </ion-tab-button>

                <ion-tab-button tab="Contact us" href="/messages">
                    <ion-icon :icon="chatbox" />
                    <ion-label>Nachrichten</ion-label>
                </ion-tab-button>

                <ion-tab-button tab="Contact us" href="/account">
                    <ion-icon :icon="personOutline" />
                    <ion-label>Account</ion-label>
                </ion-tab-button>

            </ion-tab-bar>
        </ion-tabs>
    </ion-page>
</template>
  
<script>
import { IonPage, IonTabs, IonRouterOutlet, IonTabBar, IonTabButton, IonLabel, IonIcon } from '@ionic/vue';

import { paperPlaneOutline, radio, personOutline, search, mail, chatbox } from 'ionicons/icons';

export default {
    components: { IonPage, IonTabs, IonRouterOutlet, IonTabBar, IonTabButton, IonLabel, IonIcon },
    data() {
        return {
            paperPlaneOutline,
            radio,
            personOutline,
            search,
        };
    },
};
</script>