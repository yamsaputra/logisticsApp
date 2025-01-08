<style scoped>
.example-content {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 10%;
}

.centered-searchbar {
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 20px;
  color: black;
}

.description {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 150%;
  color: black;
}

ion-button {
  margin-top: 10px;
  --padding-top: 10px;
  --padding-bottom: 10px;
}
</style>

<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-title>TrustTrip</ion-title>
      </ion-toolbar>
    </ion-header>

    <ion-fab slot="fixed" horizontal="end" :edge="true">
      <ion-fab-button>
        <ion-icon :icon="globe"></ion-icon>
      </ion-fab-button>
      <ion-fab-list side="bottom">
        <ion-fab-button @click="changeLocale('id')"> ID </ion-fab-button>
        <ion-fab-button @click="changeLocale('en')"> EN </ion-fab-button>
        <ion-fab-button @click="changeLocale('de')"> DE </ion-fab-button>
      </ion-fab-list>
    </ion-fab>

    <ion-content>
      <div :class="descriptionClass">
        <ion-card color="light">
          <ion-card-header>
            <ion-card-title>{{ $t("homeTitle") }}</ion-card-title>
          </ion-card-header>
          <ion-card-content>
            <p>{{ $t("homeDesc") }}</p>
          </ion-card-content>
        </ion-card>
      </div>
    </ion-content>

    <ion-content class="example-content">
      
        <ion-searchbar
          animated="true"
          :placeholder="$t('searchBar')"
          class="centered-searchbar"
          v-model="searchQuery"
          @keyup.enter="search"
        ></ion-searchbar>

        <ion-card-content>
          <ion-button expand="block" @click="search">
            {{ $t("searchButton") }}
          </ion-button>
        </ion-card-content>

        <ion-alert
        :is-open="showAlert"
        :message="alertMessage"
        buttons="OK"
        @didDismiss="showAlert = false"
      ></ion-alert>

    </ion-content>
  </ion-page>
</template>

<script>
import {
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonPage,
  IonSearchbar,
  IonDatetime,
  IonDatetimeButton,
  IonFab,
  IonFabButton,
  IonAlert,
  IonButton,
  IonButtons,
} from "@ionic/vue";
import { globe } from "ionicons/icons";
import { onMounted, ref, computed, watch } from "vue";
import { useRouter } from "vue-router";
import { getRouteData } from "../services/getRequests.js";
import store from "../store.js";

export default {
  components: {
    IonHeader,
    IonToolbar,
    IonTitle,
    IonContent,
    IonPage,
    IonSearchbar,
    IonDatetime,
    IonDatetimeButton,
    IonFab,
    IonFabButton,
    IonAlert,
    IonButton,
    IonButtons,
  },

  setup() {
    const searchQuery = ref("");
    const router = useRouter();
    const descriptionClass = ref("description");
    const showAlert = ref(false);
    const alertMessage = ref("");
    
    /**
     * @description Searches for a route based on the search query.
     */
    const search = async () => {
      try {
        const encodedSearchQuery = encodeURIComponent(searchQuery.value);

        const response = await getRouteData(encodedSearchQuery);

        if (response.message) {
          router.push({
            name: "listPage",
            query: { searchQuery: encodedSearchQuery },
          });
        } else if (response.error) {
          alertMessage.value= `No results found for ${searchQuery.value}.`;
          showAlert.value = true;
          throw new Error("No results found");
        } else {
      alertMessage.value = "An unexpected error occurred.";
      showAlert.value = true;
      throw new Error("An unexpected error occurred");
    }
      } catch (error) {
        console.error("search() Internal Server Error 500", error.stack);
      }
    };

    const changeLocale = (locale) => {
      store.commit("setLocale", locale);
    };

    return { searchQuery, search, globe, changeLocale, descriptionClass, IonButton, alertMessage, showAlert };
  },
};
</script>
