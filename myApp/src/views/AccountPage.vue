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
        <ion-title>{{ $t('myProfile') }}</ion-title>
      </ion-toolbar>
    </ion-header>

    <ion-fab slot="fixed" horizontal="end" :edge="true">
      <ion-fab-button>
        <ion-icon :icon="globe"></ion-icon>
      </ion-fab-button>
      <ion-fab-list side="bottom">
        <ion-fab-button @click="changeLocale('id')">
          ID
        </ion-fab-button>
        <ion-fab-button @click="changeLocale('en')">
          EN
        </ion-fab-button>
        <ion-fab-button @click="changeLocale('de')">
          DE
        </ion-fab-button>
      </ion-fab-list>
    </ion-fab>

    <ion-content>
      <ion-card>
        <img src="../assets/default.png" class="img" />
        <ion-card-header>
<!--           <ion-card-subtitle>Account Information</ion-card-subtitle> -->
          <ion-card-title v-if="loading">
            <p>{{ $t('unableAccountData') }}</p>
          </ion-card-title>
          <ion-card-title v-else>{{ $t('greetingsAcc') }}, {{ fname }}</ion-card-title>
        </ion-card-header>
        <ion-card-content>
          <div class="account-info">
            <ion-card-title v-if="loading">
            <p>{{ $t('unableAccountEmail') }}</p>
          </ion-card-title>
            <div v-else>
              <p>E-mail: {{ email }}</p>
            </div>
          </div>
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
} from '@ionic/vue';
import { globe } from 'ionicons/icons';
import { ref, onMounted } from 'vue';
import store from '../store.js';
import { getUserData } from '../services/getRequests.js'; // Replace with your account service

export default {
  components: {
    IonHeader, IonToolbar, IonTitle, IonContent, IonPage,
    IonCard, IonCardContent, IonCardHeader, IonCardSubtitle, IonCardTitle, IonTabBar,
    IonButton, IonButtons, IonIcon, IonFab, IonFabButton
  },
  setup() {
    let fname = ref();
    let email = ref();
    let lname = ref();
    let loading = ref(true);


    // Fetch account data on component mount
    onMounted(async () => {
      try {
        const userEmail = store.state.user.email;
        console.log("accountPageUser:", userEmail);
        const userID = store.state.user.ID;
        console.log("accountPageUser:", userID);

        let data = await getUserData(userEmail);

        fname.value = data.user.fname;
        lname.value = data.user.lname;
        email.value = data.user.email;

        loading.value = false;
      } catch (error) {
        console.error('Error fetching account data:', error);
      }
    });

    const changeLocale = (locale) => {
      store.commit('setLocale', locale);
    };

    return { fname, lname, email, loading, globe, changeLocale };
  }
};	
</script>