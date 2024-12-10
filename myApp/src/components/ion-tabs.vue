<style scoped>
.active {
    font-weight: bold;
    color: rgb(255, 255, 255);
}
</style>

<template>
    <ion-page>
        <ion-tabs>
            <ion-router-outlet></ion-router-outlet>
            <ion-tab-bar slot="bottom">

                <ion-tab-button tab="home" href="/home">
                    <ion-icon :icon="searchIcon" :class="{ active: $route.path === '/home' }" />
                    <ion-label :class="{ active: $route.path === '/home' }">{{ $t('searchTab') }}</ion-label>
                </ion-tab-button>

                <ion-tab-button tab="package" href="/package">
                    <ion-icon :icon="cubeIcon" :class="{ active: $route.path === '/package'}" />
                    <ion-label :class="{ active: $route.path === '/package'}">{{ $t('myPackagesTab') }}</ion-label>
                </ion-tab-button>

                <ion-tab-button tab="trust" href="/trust">
                    <ion-icon :icon="paperPlaneIcon" :class="{ active: $route.path === '/trust'}" />
                    <ion-label :class="{ active: $route.path === '/trust'}">{{ $t('senderTab') }}</ion-label>
                </ion-tab-button>

               <!--  <ion-tab-button tab="message" href="/message">
                    <ion-icon :icon="chatbubblesIcon" :class="{ active: $route.path === '/message'}" />
                    <ion-label :class="{ active: $route.path === '/message'}">{{ $t('messagesTab') }}</ion-label>
                </ion-tab-button> -->

                <ion-tab-button tab="account" href="/account">
                    <ion-icon :icon="personIcon" :class="{ active: $route.path === '/account'}" />
                    <ion-label :class="{ active: $route.path === '/account'}">{{ $t('accountTab') }}</ion-label>
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
    setup() {
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
