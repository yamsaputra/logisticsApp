<style scoped>
/* Add your custom styles here */



.inputLabel {
  font-size: 18px;
  /* Adjust the font size as needed */
}

.no-scroll {
  --overflow: hidden;
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
            <ion-img src="/src/assets/logo/logoLabeled.png" alt="Logo"></ion-img>
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
                <p>New to ConsignEase?</p>
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
import { ref, onMounted } from 'vue';
import { loginUser } from '../services/postRequests.js';

export default {
  components: {
    IonButton,
    IonHeader,
    IonGrid
  },
  data() {
    return {
      email: '',
      password: ''
    };
  },
  methods: {
    async login() {
      try {
        const response = await loginUser(this.email, this.password);
        if (response.success) {
          this.$router.push('/home');
        } else {
          console.error('Failed to log in:', response.message);
        }
      } catch (error) {
        console.error('Error logging in:', error);
        this.errorMessage = 'Failed to log in. Please try again later.';
      }
    },
  },
  };
</script>
