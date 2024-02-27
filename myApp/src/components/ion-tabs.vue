<template>
    <ion-page>
        <ion-tabs>
            <ion-router-outlet></ion-router-outlet>
            <ion-tab-bar slot="bottom">

                <ion-tab-button tab="home" href="/home">
                    <ion-icon :icon="searchIcon" />
                    <ion-label>{{ $t('searchTab') }}</ion-label>
                </ion-tab-button>

                <ion-tab-button tab="package" href="/package">
                    <ion-icon :icon="cubeIcon" />
                    <ion-label>{{ $t('myPackagesTab') }}</ion-label>
                </ion-tab-button>

                <ion-tab-button tab="trust" href="/trust" >
                    <ion-icon :icon="paperPlaneIcon" />
                    <ion-label>{{ $t('senderTab') }}</ion-label>
                </ion-tab-button>

                <ion-tab-button tab="message" href="/message">
                    <ion-icon :icon="chatbubblesIcon" />
                    <ion-label>{{ $t('messagesTab') }}</ion-label>
                </ion-tab-button>

                <ion-tab-button tab="account" href="/account">
                    <ion-icon :icon="personIcon" />
                    <ion-label>{{ $t('accountTab') }}</ion-label>
                </ion-tab-button>

            </ion-tab-bar>
        </ion-tabs>
    </ion-page>
</template>
  
<script>
import { IonPage, IonTabs, IonRouterOutlet, IonTabBar, IonTabButton, IonLabel, IonIcon } from '@ionic/vue';
import { ref } from 'vue';
import { paperPlaneOutline, radio, personOutline, search, chatbubblesOutline, cubeOutline } from 'ionicons/icons';

export default {
    components: { IonPage, IonTabs, IonRouterOutlet, IonTabBar, IonTabButton, IonLabel, IonIcon },
    setup () {
        // Defining & returning icons for the tabs.
        const paperPlaneIcon = paperPlaneOutline;
        const radioIcon = radio;
        const personIcon = personOutline;
        const searchIcon = search;
        const chatbubblesIcon = chatbubblesOutline;
        const cubeIcon = cubeOutline;

        return { paperPlaneIcon, radioIcon, personIcon, searchIcon, chatbubblesIcon, cubeIcon };
    }
};
</script>
