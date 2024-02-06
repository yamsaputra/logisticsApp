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
        <ion-title>Glad to see you here!</ion-title>
      </ion-toolbar>
    </ion-header>

    <ion-content>
      <ion-grid>
        <ion-row>
          <ion-col size="12">
            <ion-img src="/src/assets/logo/logoTt.png" alt="Logo"></ion-img>
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
                <ion-label class="inputLabel" position="floating">E-mail</ion-label>
                <ion-input aria-placeholder="Email" type="email" v-model="email"></ion-input>
              </ion-item>

              <ion-item>
                <ion-label class="inputLabel" position="floating">Password</ion-label>
                <ion-input aria-placeholder="Password" type="password" v-model="password"></ion-input>
              </ion-item>
              <ion-button expand="full" @click="login">Login</ion-button>
              <div v-if="errorMessage" class="error-message">{{ errorMessage }}</div>
            </ion-col>


            <ion-row>
              <ion-col size="12" class="ion-text-center">
                <p>New to TrustTrip?</p>
                <router-link to="/signup">
                  <ion-button expand="block">Sign-up!</ion-button>
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
  IonButton,
  IonGrid,
  IonHeader

} from '@ionic/vue';
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { loginUser } from '../services/postRequests.js';
import { useStore } from 'vuex';
import { computed } from 'vue';
import { watch } from 'vue';

export default {
  components: {
    IonButton,
    IonHeader,
    IonGrid
  },

  setup() {
    const email = ref('');
    const password = ref('');
    const errorMessage = ref(null);
    const isLoginSuccess = ref(false);
    const router = useRouter();
    const store = useStore();
    const userEmail = computed(() => store.state.user,email);

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

        const response = await loginUser(loginData);

        console.log(response);
        console.log(response.status);

        if (response.status === 200) {
          store.commit("setUserData", email.value)
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

    watch(userEmail, (newValue, oldValue) => {
        console.log('User changed:', newValue);
    });

    return { email, password, errorMessage, login };
  },
};
</script>
