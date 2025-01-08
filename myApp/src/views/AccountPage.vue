<style scoped>
.img {
  width: 50%;
  height: 150px;
  object-fit: scale-down;
  display: block;
  margin-top: 10px;
  margin-left: auto;
  margin-right: auto;
}
ion-card {
  margin-top: 50px;
  margin-left: 10px;
  margin-right: 10px;

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
        <ion-title>{{ $t("myProfile") }}</ion-title>
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
      <ion-card>
        <img src="@/assets/default.png" class="img" alt="Default Profile Picture"></img>
        <ion-card-header>
          <ion-card-title v-if="loading">
            <ion-text>{{ $t("unableAccountData") }}</ion-text>
          </ion-card-title>
          <ion-card-title v-else>
            <ion-text>{{ $t("greetingsAcc") }}, {{ fname }}</ion-text>
          </ion-card-title>
        </ion-card-header>
        <ion-card-content>
          <ion-item>
            <ion-label>
              <ion-list v-if="loading">
                <ion-text>{{ $t("unableAccountEmail") }}</ion-text>
              </ion-list>
              <ion-text v-else>
                E-mail: {{ email }}
              </ion-text>
            </ion-label>
          </ion-item>
        </ion-card-content>
        <ion-card-content>
          <ion-item>
            <ion-label>
              <ion-list v-if="loading">
                <ion-text>{{ $t("unableAccountDate") }}</ion-text>
              </ion-list>
              <ion-text v-else>
                {{ $t("dateJoined") }}: {{ formattedDateJoined }}
              </ion-text>
            </ion-label>
          </ion-item>
        </ion-card-content>
      </ion-card>
    




        <ion-card-content>
          <ion-button expand="block" @click="logout">
            {{ $t("logOut") }}
          </ion-button>
        </ion-card-content>

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
  IonCard,
  IonCardContent,
  IonCardHeader,
  IonCardSubtitle,
  IonCardTitle,
  IonTabBar,
  IonButton,
  IonButtons,
  IonIcon,
  IonFab,
  IonFabButton,
  IonFabList,
  IonImg,
  IonText,
  IonItem,
  IonLabel,
  onIonViewWillEnter,
} from "@ionic/vue";
import { globe } from "ionicons/icons";
import { ref, onMounted, computed, watch } from "vue";
import { useRouter } from "vue-router";
import store from "../store.js";

import { getUserData } from "../services/getRequests.js";

export default {
  components: {
    IonHeader,
    IonToolbar,
    IonTitle,
    IonContent,
    IonPage,
    IonCard,
    IonCardContent,
    IonCardHeader,
    IonCardSubtitle,
    IonCardTitle,
    IonTabBar,
    IonButton,
    IonButtons,
    IonIcon,
    IonFab,
    IonFabButton,
    IonFabList,
    IonImg,
    IonText,
    IonItem,
    IonLabel,
  },

  setup() {
    let fname = ref("");
    let email = ref("");
    let lname = ref("");
    const userEmail = computed(() => store.state.user.email);
    const userID = computed(() => store.state.user.ID);
    const router = useRouter();
    let dateJoined = ref("");
    let loading = ref(true);

    /**
     * @description Fetches the user's account data.
     */
    const fetchAccountData = async () => {
      loading.value = true;

      try {
        console.log("fetchAccountData() userEmail:", userEmail.value);
        const { response, data } = await getUserData(userEmail.value);
        console.log("fetchAccountData() data:", data);

        console.log("fetchAccountData() data.user.fname:", data.user.fname);

        fname.value = data.user.fname;
        lname.value = data.user.lname;
        email.value = data.user.email;
        dateJoined.value = data.user.dateJoined;

        loading.value = false;
      } catch (error) {
        console.error("fetchAccountData() Internal Server Error 500:", error);
      }
    };

    // Computed property to format the date
    /**
     * @description Formats the date the user joined the platform.
     */
    const formattedDateJoined = computed(() => {
      if (!dateJoined.value) return "";
      const date = new Date(dateJoined.value);
      const day = String(date.getDate()).padStart(2, "0");
      const month = String(date.getMonth() + 1).padStart(2, "0"); // Months are zero-based
      const year = date.getFullYear();
      return `${day}.${month}.${year}`;
    });

    /**
     * @description Logs the user out. Clears the user data from the store and redirects to the login page.
     */
    const logout = () => {
      try {
        store.commit("clearUserData");
        console.log("logout() User logged out, stored data cleared.");
        router.push("/login").then(() => {
          console.log("logout() Page redirected and refreshed to the login page.");
          router.go(0);
        });
      } catch (error) {
        console.error("logout() Internal Server Error 500:", error);
      }
    };

    /**
     *
     * @param locale
     */
    const changeLocale = (locale) => {
      store.commit("setLocale", locale);
    };

    /**
     * @description Watches for changes in the user's E-Mail and ID.
     */
    watch([userEmail, userID], ([newEmail, newID]) => {
      console.log("watch() User E-Mail changed:", newEmail);
      console.log("watch() User ID changed:", newID);
    });

    // Fetch account data on component mount.
    onMounted(fetchAccountData);

    return {
      fname,
      lname,
      email,
      loading,
      globe,
      formattedDateJoined,
      changeLocale,
      logout,
    };
  },
};
</script>
