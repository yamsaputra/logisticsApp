<style scoped>
/* Add your custom styles here */

.inputLabel {
  font-size: 18px;
  /* Adjust the font size as needed */
}

.no-scroll {
  --overflow: hidden;
}

.error-message {
  text-align: center;
}

.logoBox {
  margin-left: 30px;
  margin-top: 30px;
}

ion-content {
  --offset-bottom: auto !important;
  --overflow: auto;
  --background: #FAFAFF;
  overflow: auto;
}

ion-content::part(background) {
  bottom: 0;
}

ion-content::-webkit-scrollbar {
  display: none;
}

ion-content {
  scrollbar-width: none;
}
</style>

<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-title>{{ $t('loginTitle') }}</ion-title>
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
      <ion-grid>
        <ion-row>
          <ion-col size="10" class="logoBox">
            <ion-img src="/assets/logo/TrustTrip.png" alt="Logo" class="logo"></ion-img>
          </ion-col>
        </ion-row>

      </ion-grid>
    </ion-content>

    <ion-content class="no-scroll">
      <form>
        <ion-card>
          <ion-grid>

            <ion-col>

              <ion-item>
                <ion-input :label="$t('email')" labelPlacement="floating" v-model="email"></ion-input>
              </ion-item>

              <ion-item>
                <ion-input :label="$t('password')" labelPlacement="floating" type="password" v-model="password"
                  @keydown.enter="login"></ion-input>
              </ion-item>

              <ion-button expand="full" @click="login">Login</ion-button>
              <div v-if="errorMessage" class="error-message">{{ $t('errorMessage') }}</div>
            </ion-col>

            <ion-row>
              <ion-col size="12" class="ion-text-center">
                <p aria-label="newHere">{{ $t('newHere') }}</p>
                <ion-button expand="block" @click="signUp">{{ $t('signUp') }}</ion-button>
              </ion-col>
            </ion-row>
          </ion-grid>
        </ion-card>
      </form>

      <ion-alert
        :is-open="showAlert"
        :message="alertMessage"
        :buttons="['OK']"
        @didDismiss="showAlert = false"
      ></ion-alert>

    </ion-content>
  </ion-page>
</template>

<script>
// Framework import statements.
import {
  IonContent,
  IonFab,
  IonFabButton,
  IonButton,
  IonFabList,
  IonGrid,
  IonHeader,
  IonToolbar,
  IonButtons,
  IonPage,
  IonAlert,
} from '@ionic/vue';
import { globe } from 'ionicons/icons';
import { useRouter } from 'vue-router';
import { ref, computed, watch } from 'vue';
import { useI18n } from 'vue-i18n';

// Local service import statements.
import { loginUser } from '../services/postRequests.js';
import store from '../store.js';

export default {
  components: {
    IonButton,
    IonHeader,
    IonGrid,
    IonFab,
    IonFabButton,
    IonFabList,
    IonToolbar,
    IonContent,
    IonButtons,
    IonPage,
    IonAlert,
    IonButtons,
  },

  setup() {
    const { t, locale } = useI18n();
    const email = ref('');
    const password = ref('');
    const errorMessage = ref(null);
    const router = useRouter();
    const userEmail = computed(() => store.state.user.email);
    const userID = computed(() => store.state.user.ID);
    const showAlert = ref(false);
    const alertMessage = ref("");

    /**
     * @description Logs the user in.
     * @returns {Promise<void>}
     */
    const login = async () => {
      try {
        const loginData = {
          email: email.value,
          password: password.value
        };

        if (!loginData.email || !loginData.password) {
          errorMessage.value = 'Please fill in all fields.';
          return;
        }

        const { status, data, message } = await loginUser(loginData);

        console.log('login() status:', status);
        console.log('login() data:', data);
        console.log('login() message:', message);

        if (status === 200) {
          console.log("login() response data Email:", data.user.email);
          console.log("login() response data user_id:", data.user.user_id);
          store.commit("setUserData", { email: data.user.email, ID: data.user.user_id });
          router.push('/home');
        } else if (status === 401 || status === 404) {
          alertMessage.value = t('incorrectLogin');
          showAlert.value = true;
        } else {
          alertMessage.value = t('unexpectedErrorLogin');
          showAlert.value = true;
        }
      } catch (error) {
        console.error('login() Internal Server Error 500: Error logging in:', error);
        alertMessage.value = 'An unexpected error occurred. Please try again later.';
        showAlert.value = true;
      }
    };

    /**
     * 
     */
    const signUp = () => {
      router.push('/signup');
    };

    watch(userEmail, (newValue) => {
      console.log('User changed:', newValue);
    });

    watch(userID, (newValue) => {
      console.log('User ID changed:', newValue);
    });

        // Change the locale (language) of the page.
    const changeLocale = (newLocale) => {
      locale.value = newLocale;
    };

    return {
      t,
      email,
      password,
      errorMessage,
      login,
      changeLocale,
      globe,
      signUp,
      showAlert,
      alertMessage,
    };
  },
};
</script>
