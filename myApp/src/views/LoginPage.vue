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
               <ion-img src="/src/assets/logo/TrustTrip.png" alt="Logo" class="logo"></ion-img>
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
              <div v-if="errorMessage" class="error-message">{{ errorMessage }}</div>
            </ion-col>


            <ion-row>
              <ion-col size="12" class="ion-text-center">
                <p aria-label="newHere">{{ $t('newHere') }}</p>
                <router-link to="/signup">
                  <ion-button expand="block">{{ $t('signUp') }}</ion-button>
                </router-link>
              </ion-col>
            </ion-row>
          </ion-grid>
        </ion-card>
      </form>
    </ion-content>
  </ion-page>
</template>


<script>
import {
  IonContent,
  IonFab,
  IonFabButton,
  IonButton,
  IonFabList,
  IonGrid,
  IonHeader,
  IonToolbar,
} from '@ionic/vue';
import { globe } from 'ionicons/icons';
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { loginUser } from '../services/postRequests.js';
import { computed } from 'vue';
import { watch } from 'vue';
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
  },

  setup() {
    const email = ref('');
    const password = ref('');
    const errorMessage = ref(null);
    const isLoginSuccess = ref(false);
    const router = useRouter();
    const userEmail = computed(() => store.state.user.email);
    const userID = computed(() => store.state.user.ID);

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

        const userData = await loginUser(loginData);

        const response = userData[0];
        const data = userData[1];


        console.log("loginPage response:", response);
        console.log("loginPage data:", data)

        if (response.status === 200) {
          store.commit("setUserData", { email: email.value, ID: data.user.user_id });
          isLoginSuccess.value = true;
          router.push('/home');
        } else {
          console.error('Failed to log in:', response);
          window.alert('Incorrect email or password. Please try again.');
        }
      } catch (error) {
        console.error('Error logging in:', error);
      }
    };

    watch(userEmail, (newValue) => {
      console.log('User changed:', newValue);
    });

    watch(userID, (newValue) => {
      console.log('User ID changed:', newValue);
    });

    const changeLocale = (locale) => {
      store.commit('setLocale', locale);
    };

    return {
      email,
      password,
      errorMessage,
      login,
      changeLocale,
      globe
    };
  },
};
</script>
