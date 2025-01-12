<style scoped>
/* Add your custom styles here */
.inputLabel {
  font-size: 13px;
  /* Adjust the font size as needed */
}
</style>

<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-buttons class="backbutton" slot="start" fill="clear" @click="router.back()">
          <ion-back-button></ion-back-button>
        </ion-buttons>
        <ion-title v-if="!isSignUpSuccess">{{ $t('greeting') }}</ion-title>
        <ion-title v-else>{{ $t('welcome') }}</ion-title>
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

    <ion-content class="ion-padding">
      <form>
        <ion-card>
          <ion-list>
            <ion-item>
              <ion-input :label="$t('firstName')" labelPlacement="floating" v-model="firstName"
                @keydown.enter="signUp"></ion-input> <!-- placeholder="enter text" for adding disappearing text -->
            </ion-item>
            <ion-item>
              <ion-input :label="$t('lastName')" labelPlacement="floating" v-model="lastName"
                @keydown.enter="signUp"></ion-input>
            </ion-item>
            <ion-item>
              <ion-input :label="$t('age')" labelPlacement="floating" v-model="age" @keydown.enter="signUp"></ion-input>
            </ion-item>
            <ion-item>
              <ion-input :label="$t('email')" labelPlacement="floating" v-model="email"
                @keydown.enter="signUp"></ion-input>
            </ion-item>
            <ion-item>
              <ion-input :label="$t('password')" labelPlacement="floating" type="password" v-model="password"
                @keydown.enter="signUp"></ion-input>
            </ion-item>
            <ion-item>
              <ion-input :label="$t('confirmPassword')" labelPlacement="floating" type="password"
                v-model="reenterPassword" @keydown.enter="signUp"></ion-input>
            </ion-item>
          </ion-list>
          <ion-button v-if="!isSignUpSuccess" expand="full" @click="signUp">{{ $t('signUp') }}</ion-button>
          <router-link v-if="isSignUpSuccess" to="/login">
            <ion-button expand="full">{{ $t('login') }}</ion-button>
          </router-link>
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
  IonHeader,
  IonToolbar,
  IonButtons,
  IonPage,
  IonAlert,
} from '@ionic/vue';
import { useI18n } from 'vue-i18n';
import { useRouter } from 'vue-router';
import { globe } from 'ionicons/icons';
import { ref } from 'vue';

// Local service import statements.
import { registerUser } from '../services/postRequests.js';

export default {
  components: {
    IonButton,
    IonHeader,
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
    const router = useRouter();
    const { t, locale } = useI18n();
    const firstName = ref('');
    const lastName = ref('');
    const age = ref('');
    const email = ref('');
    const password = ref('');
    const reenterPassword = ref('');
    const isSignUpSuccess = ref(false);
    const errorMessage = ref(null);
    const showAlert = ref(false);
    const alertMessage = ref('');

    /**
     * @description
     * @returns {Promise<void>}
     */
    const signUp = async () => {
      try {
        const formData = {
          firstName: firstName.value,
          lastName: lastName.value,
          age: age.value,
          email: email.value,
          password: password.value,
          password: reenterPassword.value
        };

        if (firstName.value == null) {
          alertMessage.value = t('firstNameNull');
          showAlert.value = true;
          return;
        }

        if (lastName.value == null) {
          alertMessage.value = t('lastNameNull');
          showAlert.value = true;
          return;
        }

        if (age.value == null) {
          alertMessage.value = t('ageNull');
          showAlert.value = true;
          return;
        }

        if (age.value < 18) {
          alertMessage.value = t('underAge');
          showAlert.value = true;
          return;
        }

        if (email.value == null) {
          alertMessage.value = t('emailNull');
          showAlert.value = true;
          return;
        }

        if (password.value == null) {
          alertMessage.value = t('passwordNull');
          showAlert.value = true;
          return;
        }

        if (password.value.length < 7) {
          alertMessage.value = t('passwordLength');
          showAlert.value = true;
          return;
        }

        if (password.value !== reenterPassword.value) {
          alertMessage.value = t('passwordMatch');
          showAlert.value = true;
          return;
        }

        const response = await registerUser(formData);

        if (response.success) {
          console.log('User signed up:', response);
          isSignUpSuccess.value = true;
          alertMessage.value = t('signUpSuccess');
          showAlert.value = true;
        } else if (response.status === 400) {
          alertMessage.value = t('emailExists');
          showAlert.value = true;
          console.error('Existing e-mail found in database.', response);
        }

      } catch (error) {
        console.error('signUp() Internal Server Error 500:', error);
      }
    };

    const login = () => {
      router.push('/login');
    };	

    // Change the locale (language) of the page.
    const changeLocale = (newLocale) => {
      locale.value = newLocale;
    };

    return {
      t,
      firstName,
      lastName,
      age,
      email,
      password,
      reenterPassword,
      isSignUpSuccess,
      errorMessage,
      signUp,
      login,
      changeLocale,
      globe,
      showAlert,
      alertMessage,
    };
  },
};
</script>