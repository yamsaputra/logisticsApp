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
      <div class="description">
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

    <ion-content>
      <div class="example-content">
        <ion-searchbar
          animated="true"
          :placeholder="$t('searchBar')"
          class="centered-searchbar"
          v-model="searchQuery"
          @keyup.enter="search"
        ></ion-searchbar>
      </div>
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
  },

  setup() {
    const searchQuery = ref("");
    const router = useRouter();
    const userEmail = computed(() => store.state.user.email);
    const userID = computed(() => store.state.user.ID);

    const search = async () => {
      try {
        const encodedSearchQuery = encodeURIComponent(searchQuery.value);

        const response = await getRouteData(encodedSearchQuery);

        console.log("response:", response);

        if (response.message.includes("successfully fetched")) {
          router.push({
            name: "listPage",
            query: { searchQuery: encodedSearchQuery },
          });
        } else {
          throw new Error("No results found");
        }
      } catch (error) {
        window.alert(`No results found for ${searchQuery.value}.`);
        console.error("unable to transition to listPage");
        console.error(error);
      }
    };

    /**
     *
     * @param locale
     */
    fetchAccountData = async () => {
      try {
        console.log("homePageUser:", userEmail);
        console.log("homePageUserID:", userID);
      } catch (error) {
        console.log("Error:", error);
      }
    };

    const changeLocale = (locale) => {
      store.commit("setLocale", locale);
    };

    watch(userEmail, (newValue) => {
      console.log("homePage: userEmail:", newValue);
    });

    // Fetch account data on component mount.
    onMounted(fetchAccountData);

    return { searchQuery, search, globe, changeLocale };
  },
};
</script>
