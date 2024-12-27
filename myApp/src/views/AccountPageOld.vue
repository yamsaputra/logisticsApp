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
        <ion-card-content>
          <div class="account-info">
            <ion-card-title v-if="loading">
              <p>{{ $t('unableAccountDate') }}</p>
            </ion-card-title>
            <div v-else>
              <p>{{ $t('dateJoined') }}: {{ formattedDateJoined }}</p>
            </div>
          </div>
        </ion-card-content>
      </ion-card>
    </ion-content>

    <ion-content>
      <ion-card>
        <ion-card-header>
          <ion-card-title>{{ $t('returnToLogin') }}</ion-card-title>
        </ion-card-header>
        <ion-card-content>
          <ion-button expand="block" @click="logout">{{ $t('logOut') }}</ion-button>
          <ion-button expand="block" @click="triggerIonViewWillEnter">Trigger IonViewWillEnter</ion-button>
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
} from '@ionic/vue';
import { globe } from 'ionicons/icons';
import { ref, onMounted, computed } from 'vue';
/* import store from '../store.js'; */
import { useStore } from 'vuex';
import { useRouter } from 'vue-router';
import { getUserData } from '../services/getRequests.js'; // Replace with your account service

export default {
  components: {
    IonHeader, IonToolbar, IonTitle, IonContent, IonPage,
    IonCard, IonCardContent, IonCardHeader, IonCardSubtitle, IonCardTitle, IonTabBar,
    IonButton, IonButtons, IonIcon, IonFab, IonFabButton
  },
  setup() {
    let fname = ref('');
    let email = ref('');
    let lname = ref('');
    const router = useRouter();
    const store = useStore();
    let dateJoined = ref('');
    let loading = ref(true);


    // Fetch account data on component mount
    onMounted(async () => {
      // Reset properties to ensure previous data is cleared
      fname.value = '';
      lname.value = '';
      email.value = '';
      dateJoined.value = '';
      loading.value = true;

      try {
        const userEmail = store.state.user.email;
        console.log("accountPageUser:", userEmail);
        const userID = store.state.user.ID;
        console.log("accountPageUser:", userID);

        let data = await getUserData(userEmail);

        fname.value = data.user.fname;
        lname.value = data.user.lname;
        email.value = data.user.email;
        dateJoined.value = data.user.dateJoined;

        console.log(dateJoined.value);

        loading.value = false;
      } catch (error) {
        console.error('Error fetching account data:', error);
      }
    });

    // Computed property to format the date
    const formattedDateJoined = computed(() => {
      if (!dateJoined.value) return '';
      const date = new Date(dateJoined.value);
      const day = String(date.getDate()).padStart(2, '0');
      const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are zero-based
      const year = date.getFullYear();
      return `${day}.${month}.${year}`;
    });

    const changeLocale = (locale) => {
      store.commit('setLocale', locale);
    };

    const 

    const logout = () => {
      try {
        // Clear user data from the store
        store.commit('clearUserData');

        // Redirect to login page
        router.push('/login');
      } catch (error) {
        console.error('Error during logout:', error);
      }
    };

    return { fname, lname, email, loading, globe, formattedDateJoined, changeLocale, logout };
  },
}
</script>