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
<!--      <ion-tab tab="home">
    </ion-tab>
    <ion-tab tab="trust">
    </ion-tab>
    <ion-tab tab="account">
    </ion-tab> -->
    
      <ion-tab-bar slot="bottom">
        <ion-tab-button tab="home" @click="navigateTo('home')">
          <ion-icon :icon="searchIcon" :class="{ active: $route.path === '/home' }" />
          <ion-label :class="{ active: $route.path === '/home' }">{{$t("searchTab")}}</ion-label>
        </ion-tab-button>

        <ion-tab-button tab="package" @click="navigateTo('package')">
          <ion-icon :icon="cubeIcon" :class="{ active: $route.path === '/package' }" />
          <ion-label :class="{ active: $route.path === '/package' }">{{ $t("myPackagesTab")}}</ion-label>
        </ion-tab-button>

        <ion-tab-button tab="trust" @click="navigateTo('trust')">
          <ion-icon :icon="paperPlaneIcon" :class="{ active: $route.path === '/trust' }"/>
          <ion-label :class="{ active: $route.path === '/trust' }">{{ $t("senderTab") }}</ion-label>
        </ion-tab-button>

        <ion-tab-button tab="account" @click="navigateTo('account')">
          <ion-icon :icon="personIcon" :class="{ active: $route.path === '/account' }"/>
          <ion-label :class="{ active: $route.path === '/account' }">{{$t("accountTab") }}</ion-label>
        </ion-tab-button>

      </ion-tab-bar>
    </ion-tabs>
  </ion-page>
</template>

<script>
import {
  IonPage,
  IonTabs,
  IonRouterOutlet,
  IonTabBar,
  IonTabButton,
  IonLabel,
  IonIcon,
} from "@ionic/vue";
import {
  paperPlaneOutline,
  radio,
  personOutline,
  search,
  chatbubblesOutline,
  cubeOutline,
} from "ionicons/icons";
import { useRouter } from "vue-router";

export default {
  components: {
    IonPage,
    IonTabs,
    IonRouterOutlet,
    IonTabBar,
    IonTabButton,
    IonLabel,
    IonIcon,
  },
  setup() {
    // Defining & returning icons for the tabs.
    const paperPlaneIcon = paperPlaneOutline;
    const radioIcon = radio;
    const personIcon = personOutline;
    const searchIcon = search;
    const chatbubblesIcon = chatbubblesOutline;
    const cubeIcon = cubeOutline;
    const router = useRouter();

    // Vue Router function to navigate with the ionic tab.
    const navigateTo = (path) => {
      router.push(`/${path}`);
    };

    return {
      paperPlaneIcon,
      radioIcon,
      personIcon,
      searchIcon,
      chatbubblesIcon,
      cubeIcon,
      navigateTo,
    };
  },
};
</script>
