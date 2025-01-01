<style scoped>
.img {
  width: 100%;
  height: 200px;
  object-fit: scale-down;
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
        <img src="../assets/default.png" class="img" />
        <ion-card-header>
          <!--           <ion-card-subtitle>Account Information</ion-card-subtitle> -->
          <ion-card-title v-if="loading">
            <p>{{ $t("unableAccountData") }}</p>
          </ion-card-title>
          <ion-card-title v-else
            >{{ $t("greetingsAcc") }}, {{ fname }}</ion-card-title
          >
        </ion-card-header>
        <ion-card-content>
          <div class="account-info">
            <ion-card-title v-if="loading">
              <p>{{ $t("unableAccountEmail") }}</p>
            </ion-card-title>
            <div v-else>
              <p>E-mail: {{ email }}</p>
            </div>
          </div>
        </ion-card-content>
        <ion-card-content>
          <div class="account-info">
            <ion-card-title v-if="loading">
              <p>{{ $t("unableAccountDate") }}</p>
            </ion-card-title>
            <div v-else>
              <p>{{ $t("dateJoined") }}: {{ formattedDateJoined }}</p>
            </div>
          </div>
        </ion-card-content>
      </ion-card>
    </ion-content>

    <ion-content>
      <ion-card>
        <ion-card-header>
          <ion-card-title>{{ $t("returnToLogin") }}</ion-card-title>
        </ion-card-header>
        <ion-card-content>
          <ion-button expand="block" @click="logout">{{
            $t("logOut")
          }}</ion-button>
        </ion-card-content>
      </ion-card>
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
        router.push("/login");
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
